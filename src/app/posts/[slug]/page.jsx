"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dateFormat from "dateformat";
import { FaCircle } from "react-icons/fa";

const PostPage = () => {
    const { slug } = useParams(); // ✅ Get the post ID from URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        fetch(`/api/blog`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId: slug })
        })
            .then((res) => res.json())
            .then((data) => {
                setPost(data || null);
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Error fetching post:", err);
                setLoading(false);
            });
    }, [slug]);

    // if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found.</p>;

    let postDate = dateFormat(post?.properties?.Date?.date?.start, "mediumDate");

    return (
        <div className="page">
            <div className="container">
                <div className="flex post-header">
                    <h1 className="post-title">{post?.properties?.Title?.title[0]?.plain_text}</h1>
                    <Link className="back-link" href={`/posts`}>Back</Link>
                </div>
                <div className="flex post-sub-header">
                    <p className="post-date">{postDate}</p>
                    <FaCircle className="link-circle" />
                    <div className="tags flex">
                        {post?.properties?.Tags?.multi_select.slice(0, 3).map((tag, id) => (
                            <p className="tag" key={id}>{tag.name}</p>
                        ))}
                    </div>
                </div>

                {/* ✅ Render post content properly */}
                <div className="post-content">
                    {post?.properties?.Content?.rich_text.map((block, index) => {
                        if (!block.plain_text.trim()) return null; // Skip empty blocks

                        if (block.annotations.bold) {
                            return <p key={index}><strong>{block.plain_text}</strong></p>;
                        }
                        if (block.annotations.italic) {
                            return <p key={index}><em>{block.plain_text}</em></p>;
                        }
                        if (block.annotations.code) {
                            return <pre key={index}><code>{block.plain_text}</code></pre>;
                        }

                        return <p key={index}>{block.plain_text}</p>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default PostPage;