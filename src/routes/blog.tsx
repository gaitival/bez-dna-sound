import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TELEGRAM_URL } from "@/data/tree";

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

const posts = [
  {
    title: "Почему обычная музыка не помогает при тревоге",
    summary:
      "Когда внутри шум, перегруз и тревога, нужен не просто фон, а точечный вход в состояние ясности и внутренней опоры.",
    tag: "SEO-статья · hero-ready",
  },
  {
    title: "Как вернуть границы, когда ты постоянно включен",
    summary:
      "История о том, как хроническая включенность стирает личные границы и как вернуть себе ощущение контроля.",
    tag: "Лендинг-блок · benefits",
  },
  {
    title: "Почему обычный отдых не возвращает ресурс",
    summary:
      "Когда усталость уже не физическая, а внутренне-эмоциональная, нужен не просто отдых, а точечный вход в восстановление.",
    tag: "CTA-блок · testimonial",
  },
];

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

        <section className="mt-16 rounded-[28px] border border-border/50 bg-background/70 p-8 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80">
                Первая статья
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                Почему обычная музыка не помогает при тревоге
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Эта тема хорошо работает для лендинга и блога: она прямо говорит о проблеме, не звучит навязчиво и легко ведёт к офферу в Telegram.
            </p>
          </div>

          <article className="mt-8 space-y-5 text-base leading-8 text-foreground/85">
            <p>
              Когда внутри шум, тревога, усталость или размытые границы, обычная музыка часто не решает проблему. Она может быть приятной, но не помогает вернуться в состояние ясности. В такие моменты человек не ищет просто фон, а ищет точку входа — способ быстро перестроиться и снова почувствовать опору.
            </p>
            <p>
              Обычная музыка работает как атмосфера. Она создает настроение, но не всегда отвечает на текущую задачу. Если в голове хаос, внимание распадается и хочется не “просто расслабиться”, а действительно вернуться в себя, такой формат обычно оказывается слишком общим.
            </p>
            <p>
              Именно поэтому в перегрузе люди начинают искать не просто звук, а инструмент, который работает под конкретное состояние. Точечные протоколы помогают мягко переключиться из хаоса в ясность без лишней теории, сложных практик и давления.
            </p>
          </article>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.slice(1).map((post) => (
            <article key={post.title} className="rounded-[24px] border border-border/50 bg-card/70 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                {post.tag}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
