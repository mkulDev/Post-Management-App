import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PostForm from '../features/PostFrom'
import {formatDistanceToNow, parseISO, compareDesc} from 'date-fns'
import Reactiions from '../features/Reactiions'
import {allPosts, getPostError, getPostStatus, fetchPosts} from '../features/postSlice'
import {allAuthors} from '../features/authorSlice'

const Post = () => {
  const dispatch = useDispatch()

  const posts = useSelector(allPosts)
  const postsStatus = useSelector(getPostStatus)
  const authors = useSelector(allAuthors)
  const postsErrors = useSelector(getPostError)

  useEffect(() => {
    if (postsStatus === null) {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  const sortedPost = [...posts].sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))

  const renderPost = sortedPost?.map((post, index) => (
    <article key={index}>
      <h2 className='article-title'>{post.title}</h2>
      <p className='article-desciption'>{post.body}</p>

      <div className='article-information'>
        <div className='article-information-container'>
          <p>
            {' '}
            by: <strong>{post.userId ? authors.find((element) => element.id === post.userId).name : 'Unknown Author'}</strong>
          </p>
          <p className='articel-date'>{formatDistanceToNow(parseISO(post.date))} Ago</p>
        </div>
        <Reactiions postId={post.id} />
      </div>
    </article>
  ))
  if (postsStatus === true) return <div class='loading-ring'></div>
  if (postsStatus === false && postsErrors) return `Sorry, but something has gone wrong. Here is an error ${postsErrors}`
  return (
    <div>
      <PostForm />
      {renderPost}
    </div>
  )
}

export default Post
