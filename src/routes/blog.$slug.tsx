import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TELEGRAM_URL } from "@/data/tree";
import { BLOG_POSTS } from "@/data/blogPosts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((item) => item.slug === params.slug);
    if (!post) {
      throw new Error("Post not found");
    }
    return { post };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-20">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent"
        >
          ← Вернуться на главную
        </Link>

        <article className="mt-8 overflow-hidden rounded-[36px] border border-border/50 bg-card/70 shadow-[0_30px_80px_rgba(0,0,0,0.16)]">
          <img src={post.image} alt={post.title} className="h-72 w-full object-cover md:h-96" />
          <div className="p-8 md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              Без-Дна / {post.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-3xl uppercase text-primary text-glow-gold md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">{post.summary}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5 text-base leading-8 text-foreground/85">
                {post.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="rounded-[24px] border border-border/50 bg-background/70 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Почему это работает</p>
                <p className="mt-4 text-sm leading-7 text-foreground/85">
                  Здесь не про «спокойную музыку» и не про ещё один совет по самопомощи. Здесь про точечный вход в состояние, когда надо быстро вернуть ясность, контроль и внутреннюю опору.
                </p>
                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <p className="text-sm leading-7 text-foreground/85">
                    Если хочется выйти из шума быстрее — первый шаг можно сделать прямо через Telegram: открыть короткий протокол и почувствовать, как меняется состояние уже с первых минут.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Открыть Telegram-протоколы
            </a>
            <Link
              to="/blog"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-border/60 px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Вернуться к блогу
            </Link>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
