import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { listPublishedPosts } from "@/lib/posts.functions";
import { dbPostToPost, mergePosts, type Post } from "@/lib/posts";

const BASE_URL = "https://bez-dna-sound.lovable.app";

export const Route = createFileRoute("/states")({
  loader: async () => {
    const rows = await listPublishedPosts();
    const posts = mergePosts(rows.map(dbPostToPost)).sort((a, b) => {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    return { posts };
  },
  head: ({ loaderData }) => {
    const posts = (loaderData?.posts ?? []) as Post[];
    return {
      meta: [
        { title: "Состояния — Без-Дна" },
        {
          name: "description",
          content:
            "Все разборы состояний и звуковые протоколы проекта Без-Дна. Новые публикации вверху.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Без-Дна — Лаборатория глубинной настройки" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:title", content: "Состояния — Без-Дна" },
        {
          property: "og:description",
          content:
            "Все разборы состояний и звуковые протоколы проекта Без-Дна. Новые публикации вверху.",
        },
        { property: "og:url", content: `${BASE_URL}/states` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Состояния — Без-Дна" },
        {
          name: "twitter:description",
          content:
            "Все разборы состояний и звуковые протоколы проекта Без-Дна. Новые публикации вверху.",
        },
      ],
      links: [
        { rel: "canonical", href: `${BASE_URL}/states` },
        { rel: "alternate", hrefLang: "ru", href: `${BASE_URL}/states` },
        { rel: "alternate", hrefLang: "x-default", href: `${BASE_URL}/states` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Состояния — разборы и протоколы",
            url: `${BASE_URL}/states`,
            inLanguage: "ru-RU",
            description:
              "Все разборы состояний и звуковые протоколы проекта Без-Дна. Новые публикации вверху.",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.map((post, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${BASE_URL}/${post.slug}`,
                name: post.title,
              })),
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
                item: `${BASE_URL}/states`,
              },
            ],
          }),
        },
      ],
    };
  },
  component: StatesPage,
});

function StatesPage() {
  const { posts } = Route.useLoaderData() as { posts: Post[] };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-14">
        {/* Breadcrumbs */}
        <nav
          aria-label="Хлебные крошки"
          className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-primary">
            Главная
          </Link>
          <span>/</span>
          <span className="text-primary">Состояния</span>
        </nav>

        <header className="mb-12 border-b border-primary/20 pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            Без-Дна / Разборы
          </p>
          <h1 className="mt-5 font-display text-3xl uppercase leading-[1.1] text-primary text-glow-gold md:text-5xl">
            Состояния
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            Все опубликованные разборы состояний и звуковые протоколы. Самые свежие — вверху.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="py-20 text-center font-mono text-sm text-muted-foreground">
            Пока нет опубликованных статей.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex h-full flex-col overflow-hidden rounded-[24px] border border-border/50 bg-card/70 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={240}
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                    {post.type}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
                  <div className="mt-auto pt-6">
                    <Link
                      to="/$slug"
                      params={{ slug: post.slug }}
                      className="inline-flex h-[44px] items-center justify-center rounded-full border border-border/60 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      Открыть статью
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
