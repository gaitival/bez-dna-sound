export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  preview: string;
  seoTitle: string;
  seoDescription: string;
  paragraphs: string[];
  image: string;
  eyebrow: string;
  date: string;
  protocol: string;
};

// Источник контента: content/blog/*.md
// Тексты статей будут добавлены позже, обложки — в public/images/blog/
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "pochemu-mysli-razbegayutsya-i-kak-vernut-fokus",
    title: "Почему мысли разбегаются и как вернуть фокус за 15 минут",
    summary:
      "Почему вы не можете сосредоточиться, даже когда это важно, и как звук помогает вернуть ясность.",
    preview: "Разбор состояния — текст статьи будет добавлен позже.",
    seoTitle: "Почему мысли разбегаются и как вернуть фокус за 15 минут",
    seoDescription:
      "Почему вы не можете сосредоточиться, даже когда это важно, и как звук помогает вернуть ясность.",
    paragraphs: [],
    image: "/images/blog/fokus-algoritm.jpg",
    eyebrow: "Разбор состояния",
    date: "2026-08-01",
    protocol: "КОД 07 «Алгоритм»",
  },
  {
    slug: "strakh-ne-uhodit-dazhe-kogda-vse-khorosho",
    title: "Почему страх не уходит, даже когда всё хорошо",
    summary:
      "Разбираем механизм фонового страха: почему он живёт в теле, даже когда вы в безопасности, и как вернуть опору.",
    preview: "Разбор состояния — текст статьи будет добавлен позже.",
    seoTitle: "Почему страх не уходит, даже когда всё хорошо",
    seoDescription:
      "Разбираем механизм фонового страха: почему он живёт в теле, даже когда вы в безопасности, и как вернуть опору.",
    paragraphs: [],
    image: "/images/blog/strakh-ne-uhodit.jpg",
    eyebrow: "Разбор состояния",
    date: "2026-08-01",
    protocol: "КОД 14 «Победоносец» / КОД 16 «Воля или страх»",
  },
  {
    slug: "kak-vernut-granitsy-kogda-ty-postoyanno-vklyuchen",
    title: "Как вернуть границы, когда ты постоянно включён",
    summary:
      "Почему вы говорите «да», когда хотите сказать «нет», и как восстановить внутреннюю опору.",
    preview: "Разбор состояния — текст статьи будет добавлен позже.",
    seoTitle: "Как вернуть границы, когда ты постоянно включён",
    seoDescription:
      "Почему вы говорите «да», когда хотите сказать «нет», и как восстановить внутреннюю опору.",
    paragraphs: [],
    image: "/images/blog/granitsy-pravo-na-svoe.jpg",
    eyebrow: "Разбор состояния",
    date: "2026-08-01",
    protocol: "КОД 05 «Право на своё»",
  },
];
