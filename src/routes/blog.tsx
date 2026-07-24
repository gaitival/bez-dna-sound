import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TELEGRAM_URL } from "@/data/tree";
import { BLOG_POSTS } from "@/data/blogPosts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Блог Без-Дна — статьи и протоколы состояния" },
      {
        name: "description",
        content:
          "Сборник статей о внутреннем шуме, тревоге, перегрузке и точечных протоколах состояния для быстрого входа в ясность.",
      },
    ],
  }),
  component: BlogPage,
});

const posts = BLOG_POSTS;

function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-20">
        <section className="rounded-[32px] border border-border/50 bg-card/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.16)] md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            Блог Без-Дна
          </p>
          <h1 className="mt-4 font-display text-3xl uppercase text-primary text-glow-gold md:text-5xl">
            Статьи и протоколы для состояний, в которых нужен быстрый вход в себя
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            Здесь собраны тексты под реальные состояния: внутренний шум, тревога, перегруз, размытые границы и дефицит ресурса. Материалы написаны в мягком, бережном тоне и ведут к Telegram-протоколам Без-Дна.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Открыть Telegram-протоколы
            </a>
            <Link
              to="/"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-border/60 px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Вернуться на главную
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="flex h-full flex-col overflow-hidden rounded-[24px] border border-border/50 bg-card/70 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <img src={post.image} alt={post.title} className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">{post.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
                <div className="mt-5 rounded-2xl border border-border/50 bg-background/70 p-4">
                  <p className="text-sm leading-7 text-foreground/80">{post.preview}</p>
                </div>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-6 inline-flex h-[44px] items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Открыть статью
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
