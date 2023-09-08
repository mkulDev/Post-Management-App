import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddPost } from '../redux/postSlice'
import { RootState } from '../redux/store' // Import your RootState type from your Redux setup

interface Author {
  id: number
  name: string
}

const PostForm: React.FC = () => {
  const authors: Author[] = useSelector((state: RootState) => state.authors) // Use RootState type
  const dispatch = useDispatch()
  const [title, setTitle] = useState<string>('')
  const [body, setbody] = useState<string>('')
  const [author, setAuthor] = useState<string>('')

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setbody(e.target.value)
  const onAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => setAuthor(e.target.value)

  const canSave: boolean = Boolean(author) && Boolean(title) && Boolean(body)

  const savePost = () => {
    if (!canSave) return
    const userId: number | undefined = authors.find((element) => element.name === author)?.id
    if (userId && title && body) {
      dispatch(AddPost({ title, body, userId })) // Use an object to match the action payload shape
      setTitle('')
      setAuthor('')
      setbody('')
    }
  }

  const renderAuthors = authors?.map((author) => <option key={author.id}>{author.name}</option>)

  return (
    <form className='post-form'>
      <h2 className='form-title'>Create a new Post</h2>
      <label htmlFor='form-post-author'>Please choose an author</label>
      <select
        value={author}
        onChange={onAuthorChange}
        name='form-post-author'
        className='form-select'
      >
        <option>{''}</option>
        {renderAuthors}
      </select>
      <label htmlFor='form-post-title'>Post Title</label>
      <input
        type='text'
        value={title}
        onChange={onTitleChange}
        name='form-post-title'
        placeholder='Post Title...'
        className='form-input'
      />
      <label htmlFor='form-textarea'>Post Content</label>
      <textarea
        value={body}
        onChange={onDescriptionChange}
        name='form-textarea'
        placeholder='Post Content...'
        rows={8}
        className='form-textarea'
      />
      <button
        type='button'
        onClick={savePost}
        disabled={!canSave}
        className={`form-button ${canSave ? 'bg-[#46b5d1] ' : 'bg-gray-400'}`}
      >
        Send Post
      </button>
    </form>
  )
}

export default PostForm
