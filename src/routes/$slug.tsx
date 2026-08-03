import { useParams } from "react-router-dom";
import { BLOG_POSTS } from "../data/blogPosts";
import { useEffect } from "react";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;

    const title = `${post.title} | Без-Дна`;
    const description = post.description;
    const imageUrl = `https://bez-dna-sound.lovable.app${post.image}`;
    const pageUrl = `https://bez-dna-sound.lovable.app/${post.slug}`;

    // Устанавливаем title
    document.title = title;

    // Функция для обновления/создания meta-тегов
    const setMeta = (name: string, content: string, isProperty = false) => {
      let meta = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Основные мета-теги
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', imageUrl, true);
    setMeta('og:url', pageUrl, true);
    setMeta('og:type', 'article', true);
    setMeta('og:site_name', 'Без-Дна', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);

    // Каноническая ссылка
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

    // JSON-LD (структурированные данные)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description,
      "image": imageUrl,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Person",
        "name": "Без-Дна"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Без-Дна",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bez-dna-sound.lovable.app/favicon.ico"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [post]);

  if (!post) {
    return <div>Статья не найдена</div>;
  }

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      {post.image && <img src={post.image} alt={post.title} />}
      {post.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
