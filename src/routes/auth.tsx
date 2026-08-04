import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Вход в редакцию | Без-Дна" },
      { name: "description", content: "Служебный вход в панель управления статьями проекта «Без-Дна»." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Вход в редакцию | Без-Дна" },
      { property: "og:description", content: "Служебный вход в панель управления статьями." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin + "/admin" },
          });
    const { data, error: authError } = await fn;
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    if (!data.session) {
      setError("Проверьте почту и подтвердите адрес, затем войдите.");
      return;
    }
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-md flex-col px-4 py-24">
        <h1 className="font-display text-2xl uppercase text-primary text-glow-gold">
          Вход в редакцию
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Панель публикации статей раздела «Состояния».
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="h-[52px] w-full rounded-full border border-border/60 bg-card/60 px-6 text-sm outline-none focus:border-primary/60"
          />
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль (минимум 8 символов)"
            className="h-[52px] w-full rounded-full border border-border/60 bg-card/60 px-6 text-sm outline-none focus:border-primary/60"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="h-[52px] w-full rounded-full bg-primary font-mono text-[12px] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Подождите…" : mode === "signin" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
        >
          {mode === "signin" ? "Первый вход? Создать аккаунт" : "У меня уже есть аккаунт"}
        </button>
      </main>
      <SiteFooter />
    </div>
  );
}
