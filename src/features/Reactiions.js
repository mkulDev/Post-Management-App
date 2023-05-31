import React from 'react'
import {FaRegThumbsUp} from 'react-icons/fa'
import {BiHeart} from 'react-icons/bi'
import {useDispatch, useSelector} from 'react-redux'
import {AddLikes} from './postSlice'

const Reactiions = ({postId}) => {
  const dispatch = useDispatch()
  const post = useSelector((state) => state.posts.find((post) => post.id === postId))
  return (
    <div className='reactions'>
      <div>
        <button
          onClick={() => {
            dispatch(AddLikes({postId: postId, reaction: 'thumbsUp'}))
          }}
          className='article-button'
        >
          <FaRegThumbsUp />
        </button>
        {post.likes.thumbsUp}
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(AddLikes({postId: postId, reaction: 'hearts'}))
          }}
          className='article-button'
        >
          <BiHeart />
        </button>
        {post.likes.hearts}
      </div>
    </div>
  )
}

export default Reactiions
