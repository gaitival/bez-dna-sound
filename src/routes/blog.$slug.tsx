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

      <main className="mx-auto flex w-full max-w-4xl flex-col px-4 py-20">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent"
        >
          ← Вернуться на главную
        </Link>

        <article className="mt-8 rounded-[32px] border border-border/50 bg-card/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.16)] md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            Без-Дна / Блог
          </p>
          <h1 className="mt-4 font-display text-3xl uppercase text-primary text-glow-gold md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">{post.summary}</p>

          <div className="mt-8 space-y-5 text-base leading-8 text-foreground/85">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
