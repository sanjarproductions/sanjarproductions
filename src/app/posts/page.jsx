"use client"
import Link from 'next/link'
import Nav from '../components/nav/Nav'
import dateFormat, { masks } from "dateformat";
import { useEffect, useState } from 'react'

const AllPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/api/notion", { method: "POST" })
      .then(res => res.json())
      .then(data => {
        setPosts(data.results);
      })
      .catch(err => console.error("Error fetching posts:", err));
  }, [])
  let postDate = dateFormat(posts[0]?.properties?.Date?.date?.start, "mediumDate");

  return (
    <div className='container page'>
      <h1 className="page-title">posts</h1>
      <Nav />

      <div className="posts-wrapper">
        {
          posts.map(({ id, properties }) =>
            <Link href={`posts/${id}`} className='post-card' key={id}>
              <div className="flex post-header">
                <strong className='post-title'>{properties?.Title?.title[0]?.plain_text}</strong>
                <i className='post-date'>{postDate}</i>
              </div>
              <p className='post-desc'>{properties?.Description?.rich_text[0]?.plain_text}</p>
            </Link>
          )}
      </div>

    </div>
  )
}

export default AllPosts