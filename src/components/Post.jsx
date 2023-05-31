import React from 'react'
import {useSelector} from 'react-redux'
import PostForm from '../features/PostFrom'
import {formatDistanceToNow, parseISO, compareDesc} from 'date-fns'
import Reactiions from '../features/Reactiions'

const Post = () => {
  const posts = useSelector((state) => state.posts)
  const sortedPost = [...posts].sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))

  const renderPost = sortedPost?.map((post) => (
    <article key={post.id}>
      <h2 className='article-title'>{post.title}</h2>
      <p className='article-desciption'>{post.description}</p>

      <div className='article-information'>
        <div className='article-information-container'>
          <p>
            {' '}
            by: <strong>{post.author ? post.author : 'Unknown Author'}</strong>
          </p>
          <p className='articel-date'>{formatDistanceToNow(parseISO(post.date))} Ago</p>
        </div>
        <Reactiions postId={post.id} />
      </div>
    </article>
  ))

  return (
    <div>
      <PostForm />
      {renderPost}
    </div>
  )
}

export default Post
