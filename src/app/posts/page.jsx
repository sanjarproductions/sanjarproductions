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

  async function getPosts() {
    setLoading(true)
    try {
      const resp = await http.post('posts', {})
      setPosts(resp.data?.results)
    } catch (err) {
      console.log('err', err);
    }
    setLoading(false)
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
          loading ? <LoadingBox /> : posts.map(({ id, properties }) =>
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