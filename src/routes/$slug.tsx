import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TELEGRAM_URL } from "@/data/tree";
import { listPublishedPosts } from "@/lib/posts.functions";
import { dbPostToPost, mergePosts, type Post } from "@/lib/posts";

const BASE_URL = "https://bez-dna-sound.lovable.app";

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const rows = await listPublishedPosts();
    const post = mergePosts(rows.map(dbPostToPost)).find((item) => item.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post as Post | undefined;
    if (!post) {
      return {
        meta: [{ title: "Статья недоступна — Без-Дна" }, { name: "robots", content: "noindex, nofollow" }],
      };
    }
    const url = `${BASE_URL}/${params.slug}`;
    const imageUrl = post.image.startsWith("http") ? post.image : `${BASE_URL}${post.image}`;

    return {
      meta: [
        { title: `${post.title} | Без-Дна` },
        { name: "description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "Без-Дна — Лаборатория глубинной настройки" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:url", content: url },
        { property: "og:image", content: imageUrl },
        { property: "article:published_time", content: post.date },
        { property: "article:modified_time", content: post.date },
        { property: "article:section", content: post.type },
        { property: "article:tag", content: post.protocol },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "ru", href: url },
        { rel: "alternate", hrefLang: "x-default", href: url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: imageUrl,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "ru-RU",
            articleSection: post.type,
            keywords: [post.type, post.protocol, "звуковые протоколы", "самонастройка", "Без-Дна"],
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: {
              "@type": "Organization",
              name: "Проект Без-Дна",
              url: BASE_URL,
            },
            publisher: {
              "@type": "Organization",
              name: "Проект Без-Дна",
              url: BASE_URL,
              logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: BASE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Состояния",
                item: `${BASE_URL}/#states`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: url,
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl uppercase text-primary text-glow-gold">Статья не найдена</h1>
        <Link
          to="/"
          hash="states"
          className="mt-8 inline-flex h-[48px] items-center justify-center rounded-full border border-border/60 px-6 text-sm text-foreground transition-colors hover:bg-accent"
        >
          ← Вернуться на главную
        </Link>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ArticlePage,
});

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
    chunk.startsWith("**") && chunk.endsWith("**") ? (
      <strong key={i} className="font-semibold text-primary">
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{chunk}</span>
    ),
  );
}

function isHeading(text: string) {
  const t = text.trim();
  if (t.length > 80) return false;
  if (/^(\d+\.|Шаг \d+\.)\s/.test(t)) return true;
  return !/[.!?…:»]$/.test(t);
}

function BackLink({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      hash="states"
      className={`inline-flex h-[48px] w-fit items-center justify-center gap-2 rounded-full border border-primary/40 px-6 font-mono text-[12px] uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-primary/10 ${className}`}
    >
      ← Вернуться на главную
    </Link>
  );
}

function ArticlePage() {
  const { post } = Route.useLoaderData() as { post: Post };
  const body = post.paragraphs.filter((p: string) => p.trim() !== "");

  let bodyIndex = 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-14">
        {/* Semantic Breadcrumbs navigation */}
        <nav aria-label="Хлебные крошки" className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
          <span>/</span>
          <Link to="/" hash="states" className="hover:text-primary transition-colors">Состояния</Link>
          <span>/</span>
          <span className="text-primary truncate max-w-[280px] sm:max-w-md">{post.title}</span>
        </nav>

        <BackLink />

        <header className="mt-10 border-b border-primary/20 pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            Без-Дна / {post.type}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-3xl uppercase leading-[1.1] text-primary text-glow-gold md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
            <span className="rounded-full border border-primary/30 px-3 py-1 text-primary">
              {post.protocol}
            </span>
            <span>~5 мин чтения</span>
          </div>

          {post.image && (
            <figure className="mt-8 overflow-hidden rounded-[20px] border border-primary/20 bg-card/60 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <img
                src={post.image}
                alt={post.title}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                className="h-auto max-h-[460px] w-full object-cover"
              />
            </figure>
          )}
        </header>

        <article className="mt-12 w-full max-w-[70ch]">
          {body.map((paragraph, i) => {
            if (isHeading(paragraph)) {
              return (
                <h2
                  key={i}
                  className="mt-14 w-full text-balance break-words font-display text-lg uppercase leading-snug tracking-wide text-primary md:text-xl"
                >
                  {renderInline(paragraph)}
                </h2>

              );
            }
            const first = bodyIndex++ === 0;
            return (
              <p
                key={i}
                className={`mt-6 w-full text-justify [hyphens:none] break-normal text-[17px] leading-9 text-foreground/85 md:text-[18px] ${
                  first
                    ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-primary"
                    : ""
                }`}
              >
                {renderInline(paragraph)}
              </p>
            );
          })}
        </article>

        <section className="mt-16 overflow-hidden rounded-[28px] border border-primary/30 bg-primary/[0.06] p-8 md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            Следующий шаг
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-2xl uppercase text-foreground md:text-3xl">
            Протокол {post.protocol} — 15 минут, которые меняют состояние
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Здесь не про «спокойную музыку» и не про ещё один совет по самопомощи. Это точечный вход
            в состояние, когда надо быстро вернуть ясность, контроль и внутреннюю опору.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center justify-center rounded-full bg-primary px-7 font-mono text-[12px] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Открыть приложение в Telegram
            </a>
            <BackLink className="h-[52px]" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
