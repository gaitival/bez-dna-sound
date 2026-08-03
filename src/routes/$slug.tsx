import { useParams } from "react-router-dom";
import { BLOG_POSTS } from "../data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

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
