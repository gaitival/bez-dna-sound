import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  amIAdmin,
  claimAdmin,
  deletePost,
  listAdminPosts,
  savePost,
} from "@/lib/posts.functions";
import type { DbPost } from "@/lib/posts";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Панель статей | Без-Дна" },
      { name: "description", content: "Публикация и редактирование статей раздела «Состояния»." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Панель статей | Без-Дна" },
      { property: "og:description", content: "Публикация и редактирование статей." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const EMPTY = {
  id: undefined as string | undefined,
  slug: "",
  title: "",
  description: "",
  summary: "",
  type: "разбор состояния",
  protocol: "",
  image: "/images/blog/strakh-ne-uhodit.jpg",
  body: "",
  published: true,
  published_at: new Date().toISOString().slice(0, 10),
};

function slugify(value: string) {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
    й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
    у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
    э: "e", ю: "yu", я: "ya", і: "i", ї: "yi", є: "e", ґ: "g",
  };
  return value
    .toLowerCase()
    .split("")
    .map((ch) => (ch in map ? map[ch] : ch))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);
}

const inputClass =
  "w-full rounded-2xl border border-border/60 bg-card/60 px-4 py-3 text-sm outline-none focus:border-primary/60";

function AdminPage() {
  const navigate = useNavigate();
  const load = useServerFn(listAdminPosts);
  const save = useServerFn(savePost);
  const remove = useServerFn(deletePost);
  const claim = useServerFn(claimAdmin);
  const check = useServerFn(amIAdmin);

  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [posts, setPosts] = useState<DbPost[]>([]);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    const rows = await load({});
    setPosts(rows as DbPost[]);
  }, [load]);

  useEffect(() => {
    (async () => {
      try {
        let { admin } = await check({});
        if (!admin) admin = (await claim({})).admin;
        setAllowed(admin);
        if (admin) await refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Ошибка доступа");
      } finally {
        setReady(true);
      }
    })();
  }, [check, claim, refresh]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await save({ data: { ...form, slug: form.slug || slugify(form.title) } });
      toast.success(form.id ? "Статья обновлена" : "Статья опубликована");
      setForm({ ...EMPTY });
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Удалить статью?")) return;
    try {
      await remove({ data: { id } });
      toast.success("Статья удалена");
      if (form.id === id) setForm({ ...EMPTY });
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить");
    }
  }

  if (!ready) {
    return <div className="p-16 text-center text-muted-foreground">Загрузка…</div>;
  }

  if (!allowed) {
    return (
      <div className="mx-auto max-w-md p-16 text-center">
        <h1 className="font-display text-2xl uppercase text-primary">Доступ закрыт</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Этот аккаунт не является администратором проекта.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl uppercase text-primary text-glow-gold">
            Панель статей
          </h1>
          <div className="flex gap-3">
            <Link
              to="/"
              className="inline-flex h-[44px] items-center rounded-full border border-border/60 px-5 text-sm"
            >
              На сайт
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="inline-flex h-[44px] items-center rounded-full border border-border/60 px-5 text-sm"
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={onSubmit} className="space-y-4 rounded-[24px] border border-border/50 bg-card/50 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              {form.id ? "Редактирование" : "Новая статья"}
            </p>
            <input
              className={inputClass}
              placeholder="Заголовок"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  title: e.target.value,
                  slug: f.id ? f.slug : slugify(e.target.value),
                }))
              }
            />
            <input
              className={inputClass}
              placeholder="Адрес статьи (slug)"
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
            />
            <textarea
              className={inputClass}
              rows={2}
              placeholder="Описание для мета-тегов и превью (до 160 символов)"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
            <textarea
              className={inputClass}
              rows={2}
              placeholder="Краткий анонс для карточки на главной"
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Тип (разбор состояния)"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              />
              <input
                className={inputClass}
                placeholder="Протокол (КОД 07 «Алгоритм»)"
                value={form.protocol}
                onChange={(e) => setForm((f) => ({ ...f, protocol: e.target.value }))}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Обложка: /images/blog/файл.jpg"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              />
              <input
                type="date"
                className={inputClass}
                value={form.published_at}
                onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
              />
            </div>
            <textarea
              className={`${inputClass} font-mono text-[13px] leading-6`}
              rows={16}
              placeholder="Текст статьи. Каждый абзац — с новой строки. Подзаголовок — короткая строка без точки в конце. **жирный текст** — двойными звёздочками."
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            />
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Опубликовать сразу
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="h-[52px] rounded-full bg-primary px-7 font-mono text-[12px] uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-60"
              >
                {saving ? "Сохраняю…" : form.id ? "Сохранить" : "Опубликовать"}
              </button>
              {form.id && (
                <button
                  type="button"
                  onClick={() => setForm({ ...EMPTY })}
                  className="h-[52px] rounded-full border border-border/60 px-6 text-sm"
                >
                  Отменить
                </button>
              )}
            </div>
          </form>

          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              Опубликованные статьи ({posts.length})
            </p>
            {posts.length === 0 && (
              <p className="text-sm text-muted-foreground">Пока нет статей, созданных через панель.</p>
            )}
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-[20px] border border-border/50 bg-card/50 p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  {post.published_at} · {post.published ? "опубликована" : "черновик"}
                </p>
                <h3 className="mt-2 text-base font-semibold">{post.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">/{post.slug}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setForm({ ...EMPTY, ...post });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="h-[38px] rounded-full border border-border/60 px-4 text-xs"
                  >
                    Редактировать
                  </button>
                  <Link
                    to="/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex h-[38px] items-center rounded-full border border-border/60 px-4 text-xs"
                  >
                    Открыть
                  </Link>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="h-[38px] rounded-full border border-destructive/50 px-4 text-xs text-destructive"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
