"use client"
import Link from 'next/link'
import Nav from '../components/nav/Nav'
import dateFormat from "dateformat";
import { useEffect, useState } from 'react'
import http from '@/services/http';

const AllPosts = () => {
  const [posts, setPosts] = useState([])

  async function getPosts() {
    try {
      const resp = await http.post('posts', {})
      setPosts(resp.data?.results)
    } catch (err) {
      console.log('err', err);
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  let postDate = dateFormat(posts[0]?.properties?.Date?.date?.start, "mediumDate");

  return (
    <div className='container page'>
      <h1 className="page-title">posts</h1>
      <Nav />

      <div className="posts-wrapper">
        {
          posts?.length ? posts.map(({ id, properties }) =>
            <Link href={`posts/${id}`} className='post-card' key={id}>
              <div className="flex post-header">
                <strong className='post-title'>{properties?.Title?.title[0]?.plain_text}</strong>
                <i className='post-date'>{postDate}</i>
              </div>
              <p className='post-desc'>{properties?.Description?.rich_text[0]?.plain_text}</p>
            </Link>
          ) : "Empty"}
      </div>

    </div>
  )
}

export default AllPosts