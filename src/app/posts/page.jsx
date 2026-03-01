import Link from "next/link";
import Nav from "../components/nav/Nav";
import dateFormat from "dateformat";

const MANUAL_POSTS = [
  {
    slug: "growing-up-in-a-3rd-world-country-be-like",
    title: "Growing Up in a 3rd World Country be like",
    date: "2026-02-28",
    desc: "",
  },
];

export default function PostsPage() {
  return (
    <div className="container page">
      <Nav />
      <h1 className="page-title">posts</h1>

      <div className="posts-wrapper">
        {MANUAL_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="post-card"
          >
            <div className="flex post-header">
              <strong className="post-title">{post.title}</strong>
              {/* <i className="post-date">{dateFormat(post.date, "mediumDate")}</i> */}
            </div>
            <p className="post-desc">{post.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
