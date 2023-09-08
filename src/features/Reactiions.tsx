import { FaRegThumbsUp } from 'react-icons/fa'
import { BiHeart } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { AddLikes, allPosts } from '../redux/postSlice'
import { RootState } from '../redux/store'
const Reactiions = ({ postId }: { postId: string }) => {
  const dispatch = useDispatch()

  const post = useSelector((state: RootState) => allPosts(state).find((post) => postId === post.id))
  return (
    <div className='reactions'>
      <div>
        <button
          onClick={() => {
            dispatch(AddLikes({ postId: postId, reaction: 'thumbsUp' }))
          }}
          className='article-button'
        >
          <FaRegThumbsUp />
        </button>
        {post?.likes && post.likes.thumbsUp}
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(AddLikes({ postId: postId, reaction: 'hearts' }))
          }}
          className='article-button'
        >
          <BiHeart />
        </button>
        {post?.likes && post.likes.hearts}
      </div>
    </div>
  )
}

export default Reactiions
