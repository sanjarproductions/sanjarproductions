"use client"
import Link from 'next/link'
import Nav from '../components/nav/Nav'
import dateFormat from "dateformat";
import { useEffect, useState } from 'react'
import http from '@/services/http';
import { VscLoading } from 'react-icons/vsc';
import LoadingBox from '../components/elements/loading-box';

const AllPosts = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  async function getPosts() {
    setLoading(true)
    setError(null)
    try {
      const resp = await http.post('posts', {})
      console.log('Posts response:', resp.data)
      setPosts(resp.data?.results || [])
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='container page'>
      <h1 className="page-title">posts</h1>
      <Nav />

      <div className="posts-wrapper">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <p>Error: {error}</p>
        ) : posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => {
            const { id, properties, created_time, last_edited_time, url } = post;
            
            // Get all the property values
            const title = properties['Doc name']?.title?.[0]?.plain_text;
            const category = properties['Category']?.select;
            const createdBy = properties['Created by']?.people?.[0];
            const createdTime = properties['Created time']?.created_time;
            
            const displayDate = dateFormat(createdTime || created_time, "mediumDate");
            const lastEdited = dateFormat(last_edited_time, "mediumDate");
            
            return (
              <Link href={`posts/${id}`} className='post-card' key={id}>
                <div className="flex post-header">
                  <strong className='post-title'>{title || 'Untitled'}</strong>
                  <i className='post-date'>{displayDate}</i>
                </div>
                <div className="post-meta">
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
              </Link>
            );
          })
        )}
      </div>
    </div>
  )
}

export default AllPosts