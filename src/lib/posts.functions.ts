import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const POST_COLUMNS =
  "id, slug, title, description, summary, type, protocol, image, body, published, published_at";

const postInput = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Только латиница в нижнем регистре, цифры и дефис"),
  title: z.string().trim().min(3).max(200),
  description: z.string().trim().max(400).default(""),
  summary: z.string().trim().max(600).default(""),
  type: z.string().trim().max(80).default("разбор состояния"),
  protocol: z.string().trim().max(120).default(""),
  image: z.string().trim().max(300).default(""),
  body: z.string().max(60000).default(""),
  published: z.boolean().default(true),
  published_at: z.string().trim().min(4).max(20),
});

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("posts")
    .select(POST_COLUMNS)
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) return [];
  return data ?? [];
});

export const listAdminPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Нет прав администратора");
    const { data, error } = await context.supabase
      .from("posts")
      .select(POST_COLUMNS)
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const savePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => postInput.parse(input))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    const query = id
      ? context.supabase.from("posts").update(values).eq("id", id).select("id").single()
      : context.supabase.from("posts").insert(values).select("id").single();
    const { data: row, error } = await query;
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Первый зарегистрированный пользователь становится администратором. */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) return { admin: false };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { admin: true };
  });

export const amIAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { admin: Boolean(data) };
  });
