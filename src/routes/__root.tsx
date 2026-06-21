import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "QuG6SOkMw2hVic9s2B1qS0u6WeW8JiNhAFBAJA6hKdg" },
      { name: "theme-color", content: "#0a0a0f" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Лаборатория глубинной настройки" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "DNA Sound — Лаборатория глубинной настройки" },
      { property: "og:title", content: "DNA Sound — Лаборатория глубинной настройки" },
      { name: "twitter:title", content: "DNA Sound — Лаборатория глубинной настройки" },
      { name: "description", content: "Древо трансформации из 21 ступени и звуковые протоколы под твою ДНК. Персональный разбор по дате рождения. Старт — в Telegram" },
      { property: "og:description", content: "Древо трансформации из 21 ступени и звуковые протоколы под твою ДНК. Персональный разбор по дате рождения. Старт — в Telegram" },
      { name: "twitter:description", content: "Древо трансформации из 21 ступени и звуковые протоколы под твою ДНК. Персональный разбор по дате рождения. Старт — в Telegram" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/82bcb4c3-5a9e-4cc4-97df-cb6c8c7bdba4/id-preview-98bbd9d3--fc8f40ba-b85b-4c91-ae90-7fa61df0c66d.lovable.app-1780920518014.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/82bcb4c3-5a9e-4cc4-97df-cb6c8c7bdba4/id-preview-98bbd9d3--fc8f40ba-b85b-4c91-ae90-7fa61df0c66d.lovable.app-1780920518014.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Exo+2:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        children:
          "(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Exo+2:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';document.head.appendChild(l);})();",
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-4HG5Z6W8W6",
        async: true,
      },
      {
        children:
          "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4HG5Z6W8W6');",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
