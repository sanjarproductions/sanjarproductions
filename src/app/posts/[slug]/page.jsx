"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from 'next/dynamic';
import dateFormat from "dateformat";
import http from "@/services/http";
import LoadingBox from "@/app/components/elements/loading-box";

const PostPage = dynamic(() => Promise.resolve(({ slug: initialSlug }) => {
    const params = useParams();
    const slug = initialSlug || params?.slug;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    async function getPost() {
        setLoading(true);
        setError(null);
        try {
            const resp = await http.post('post', { postId: slug });
            setPost(resp.data);
        } catch (err) {
            console.error('Error fetching post:', err);
            setError(err.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!slug) return;
        getPost();
    }, [slug]);

    if (!mounted || loading) return (
        <div className="page">
            <div className="container">
                <LoadingBox />
            </div>
        </div>
    );

    if (error) return (
        <div className="page">
            <div className="container">
                <p className="error">Error: {error}</p>
            </div>
        </div>
    );

    if (!post?.page) return (
        <div className="page">
            <div className="container">
                <p>Post not found.</p>
            </div>
        </div>
    );

    const { page, blocks = [] } = post;
    
    const title = page.properties?.['Doc name']?.title?.[0]?.plain_text || 'Untitled';
    const category = page.properties?.['Category']?.select;
    const createdBy = page.properties?.['Created by']?.people?.[0];
    const createdTime = page.properties?.['Created time']?.created_time || page.created_time;
    const displayDate = dateFormat(createdTime, "mediumDate");
    const lastEdited = dateFormat(page.last_edited_time, "mediumDate");

    const renderBlock = (block) => {
        if (!block || !block.type) return null;

        const getText = (richText) => {
            if (!Array.isArray(richText)) return '';
            return richText.map(text => text?.plain_text || '').join('');
        };

        switch (block.type) {
            case 'paragraph':
                return <p key={block.id} className="mb-4">{getText(block.paragraph?.rich_text)}</p>;
            case 'heading_1':
                return <h1 key={block.id} className="text-2xl font-bold mb-4">{getText(block.heading_1?.rich_text)}</h1>;
            case 'heading_2':
                return <h2 key={block.id} className="text-xl font-bold mb-3">{getText(block.heading_2?.rich_text)}</h2>;
            case 'heading_3':
                return <h3 key={block.id} className="text-lg font-bold mb-2">{getText(block.heading_3?.rich_text)}</h3>;
            case 'bulleted_list_item':
                return <li key={block.id} className="ml-6 mb-2">• {getText(block.bulleted_list_item?.rich_text)}</li>;
            case 'numbered_list_item':
                return <li key={block.id} className="ml-6 mb-2">{getText(block.numbered_list_item?.rich_text)}</li>;
            case 'code':
                return (
                    <pre key={block.id} className="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">
                        <code>{getText(block.code?.rich_text)}</code>
                    </pre>
                );
            case 'quote':
                return (
                    <blockquote key={block.id} className="border-l-4 border-gray-300 pl-4 mb-4 italic">
                        {getText(block.quote?.rich_text)}
                    </blockquote>
                );
            case 'divider':
                return <hr key={block.id} className="my-6 border-t border-gray-700" />;
            default:
                return null;
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="flex post-header">
                    <h1 className="post-title">{title}</h1>
                    <Link className="back-link" href="/posts">Back</Link>
                </div>
                
                <div className="post-meta mb-8">
                    <span className="post-date">{displayDate}</span>
                    {category && (
                        <span className="category" style={category.color ? { backgroundColor: category.color } : undefined}>
                            {category.name}
                        </span>
                    )}
                    {createdBy && (
                        <span className="author">
                            By {createdBy.name}
                            {createdBy.avatar_url && (
                                <img 
                                    src={createdBy.avatar_url} 
                                    alt={createdBy.name} 
                                    className="author-avatar"
                                />
                            )}
                        </span>
                    )}
                    <span className="edited">Last edited: {lastEdited}</span>
                </div>

                <div className="post-content">
                    {Array.isArray(blocks) && blocks.map(block => renderBlock(block))}
                </div>
            </div>
        </div>
    );
}), {
    ssr: false
});

export default PostPage;