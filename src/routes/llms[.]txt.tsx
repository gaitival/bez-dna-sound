import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listPublishedPosts } from "@/lib/posts.functions";
import { dbPostToPost, mergePosts } from "@/lib/posts";

const BASE_URL = "https://bez-dna-sound.com";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const rows = await listPublishedPosts();
        const posts = mergePosts(rows.map(dbPostToPost));

        const content = [
          "# DNA Sound — Лаборатория глубинной настройки",
          "",
          "> Аптека состояний: резонансные протоколы (звук, частотные гармоники, соматические инструкции) для ясности, сна, фокуса, заземления и уверенности. Доступно через веб-приложение и Telegram-бот.",
          "",
          "Проект «Без-Дна» объединяет нейроакустику, аудио-резонансы, персональный «Код личности» по дате рождения и пошаговое Древо трансформации из 27 ступеней. Это точечная нейросоматическая работа со вниманием, физиологическим ритмом и состоянием через звук.",
          "",
          "## Основные разделы",
          "",
          `- [Главная страница](${BASE_URL}/): Описание системы, Аптека состояний, отзывы, интерактивное демо и вход в экосистему.`,
          `- [Древо трансформации](${BASE_URL}/tree): 27 узлов пути — от первичной диагностики до новой точки опоры.`,
          `- [Аптека состояний](${BASE_URL}/states): Каталог всех состояний и звуковых протоколов.`,
          `- [Расчёт «Код личности»](${BASE_URL}/app/kod-lichnosti): Персональный алгоритм расчёта по дате рождения.`,
          `- [Визуализатор состояний](${BASE_URL}/app/vizualizator): Интерактивная карта соматических настроек.`,
          "",
          "## Библиотека разборов состояний и протоколов (Статьи)",
          "",
          ...posts.map(
            (post) => `- [${post.title}](${BASE_URL}/${post.slug}): ${post.description}`,
          ),
          "",
          "## Сервисные файлы",
          "",
          `- [Карта сайта XML](${BASE_URL}/sitemap.xml): Полный список проиндексированных страниц.`,
        ].join("\n");

        return new Response(content, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
