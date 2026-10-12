import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TELEGRAM_URL } from "@/data/tree";
import { listPublishedPosts } from "@/lib/posts.functions";
import { BLOG_POSTS } from "@/data/blogPosts";
import { dbPostToPost, mergePosts, type Post } from "@/lib/posts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BASE_URL = "https://bez-dna-sound.com";

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    // 1. Мгновенный синхронный поиск по статическим статьям (0 мс, без блокирующих сетевых вызовов)
    const staticPost = (BLOG_POSTS as Post[]).find((item) => item.slug === params.slug);
    if (staticPost) {
      return { post: staticPost };
    }
    // 2. Резервный поиск среди динамических статей из базы
    const rows = await listPublishedPosts();
    const post = mergePosts(rows.map(dbPostToPost)).find((item) => item.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const rawPost = loaderData?.post as Post | undefined;
    if (!rawPost) {
      return {
        meta: [{ title: "Статья недоступна - Без-Дна" }, { name: "robots", content: "noindex, nofollow" }],
      };
    }
    const title = rawPost.title.replace(/[—–]/g, "-");
    const description = rawPost.description.replace(/[—–]/g, "-");
    const protocol = rawPost.protocol.replace(/[—–]/g, "-");
    const url = `${BASE_URL}/${params.slug}`;
    const imageUrl = rawPost.image.startsWith("http") ? rawPost.image : `${BASE_URL}${rawPost.image}`;

    return {
      meta: [
        { title: `${title} | Без-Дна` },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "Без-Дна - Лаборатория глубинной настройки" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: imageUrl },
        { property: "article:published_time", content: rawPost.date },
        { property: "article:modified_time", content: rawPost.date },
        { property: "article:section", content: rawPost.type },
        { property: "article:tag", content: protocol },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
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
            headline: title,
            description: description,
            image: imageUrl,
            datePublished: rawPost.date,
            dateModified: rawPost.date,
            inLanguage: "ru-RU",
            articleSection: rawPost.type,
            keywords: [rawPost.type, protocol, "звуковые протоколы", "самонастройка", "Без-Дна"],
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
                name: "Разборы состояний",
                item: `${BASE_URL}/states`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: url,
              },
            ],
          }),
        },
        ...(rawPost.faqs && rawPost.faqs.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: rawPost.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question.replace(/[—–]/g, "-"),
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer.replace(/[—–]/g, "-"),
                    },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl uppercase text-primary text-glow-gold">Статья не найдена</h1>
        <Link
          to="/states"
          className="mt-8 inline-flex h-[48px] items-center justify-center rounded-full border border-border/60 px-6 text-sm text-foreground transition-colors hover:bg-accent"
        >
          ← Вернуться в разборы состояний
        </Link>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ArticlePage,
});

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((chunk, i) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-primary">
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, href] = linkMatch;
      if (href.startsWith("/")) {
        const cleanSlug = href.replace(/^\//, "");
        if (cleanSlug === "" || cleanSlug === "states" || cleanSlug === "tree") {
          return (
            <Link
              key={i}
              to={href as any}
              preload="intent"
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors font-medium"
            >
              {linkText}
            </Link>
          );
        }
        return (
          <Link
            key={i}
            to="/$slug"
            params={{ slug: cleanSlug }}
            preload="intent"
            className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors font-medium"
          >
            {linkText}
          </Link>
        );
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors font-medium"
        >
          {linkText}
        </a>
      );
    }
    return <span key={i}>{chunk}</span>;
  });
}

function isHeading(text: string) {
  const t = text.trim();
  if (/^#{1,6}\s/.test(t)) return true;
  if (t.length > 80) return false;
  if (/^(\d+\.|Шаг \d+\.)\s/.test(t)) return true;
  return !/[.!?…:»]$/.test(t);
}

function BackLink({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/states"
      className={`inline-flex h-[48px] w-fit items-center justify-center gap-2 rounded-full border border-primary/40 px-6 font-mono text-[12px] uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-primary/10 ${className}`}
    >
      ← Вернуться к разборам
    </Link>
  );
}

function ArticlePage() {
  const { post } = Route.useLoaderData() as { post: Post };
  const cleanTitle = post.title.replace(/[—–]/g, "-");
  const cleanDescription = post.description.replace(/[—–]/g, "-");
  const cleanProtocol = post.protocol.replace(/[—–]/g, "-");
  const cleanType = post.type.replace(/[—–]/g, "-");
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
          <Link to="/states" className="hover:text-primary transition-colors">Разборы состояний</Link>
          <span>/</span>
          <span className="text-primary truncate max-w-[280px] sm:max-w-md">{cleanTitle}</span>
        </nav>

        <BackLink />

        <header className="mt-10 border-b border-primary/20 pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            Без-Дна / {cleanType}
          </p>
          <h1 className="mt-5 w-full font-display text-2xl uppercase leading-[1.14] tracking-[-0.018em] text-primary text-glow-gold sm:text-3xl md:text-[40px] lg:text-[45px] xl:text-[46px]">
            {cleanTitle}
          </h1>
          <p className="mt-6 w-full text-base leading-8 text-muted-foreground md:text-lg">
            {cleanDescription}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
            <span className="rounded-full border border-primary/30 px-3 py-1 text-primary">
              {cleanProtocol}
            </span>
            <span>~5 мин чтения</span>
          </div>

          {post.image && (
            <figure className="mt-8 overflow-hidden rounded-[20px] border border-primary/20 bg-card/60 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <img
                src={post.image}
                alt={cleanTitle}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                className="h-auto max-h-[460px] w-full object-cover"
              />
            </figure>
          )}
        </header>

        <article className="mt-12 w-full">
          {body.map((paragraph, i) => {
            const cleanParagraph = paragraph.replace(/[—–]/g, "-");
            if (isHeading(cleanParagraph)) {
              return (
                <h2
                  key={i}
                  className="mt-14 w-full break-words font-display text-lg uppercase leading-snug tracking-wide text-primary md:text-2xl"
                >
                  {renderInline(cleanParagraph.replace(/^#{1,6}\s+/, ""))}
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
                {renderInline(cleanParagraph)}
              </p>
            );
          })}
        </article>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16 w-full border-t border-primary/20 pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              FAQ / Вопросы и ответы
            </p>
            <h2 className="mt-3 font-display text-2xl uppercase tracking-wide text-primary md:text-3xl">
              Часто задаваемые вопросы
            </h2>
            <Accordion type="single" collapsible className="mt-6 w-full space-y-3">
              {post.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-primary/20 bg-card/40 px-5 py-1 transition-colors data-[state=open]:border-primary/40 data-[state=open]:bg-card/70"
                >
                  <AccordionTrigger className="text-left font-display text-base uppercase tracking-wide text-foreground hover:text-primary hover:no-underline">
                    {faq.question.replace(/[—–]/g, "-")}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-7 text-muted-foreground pt-1 pb-4">
                    {faq.answer.replace(/[—–]/g, "-")}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        <section className="mt-16 overflow-hidden rounded-[28px] border border-primary/30 bg-primary/[0.06] p-8 md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            Следующий шаг
          </p>
          <h2 className="mt-4 w-full font-display text-2xl uppercase text-foreground md:text-3xl">
            Протокол {cleanProtocol} - 15 минут, которые меняют состояние
          </h2>
          <p className="mt-4 w-full text-base leading-8 text-muted-foreground">
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
