import {AddPost} from './postSlice'
import {useDispatch, useSelector} from 'react-redux'

import React, {useState} from 'react'

const PostForm = () => {
  const authors = useSelector((state) => state.authors)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')

  const onTitleChange = (e) => setTitle(e.target.value)
  const onDescriptionChange = (e) => setDescription(e.target.value)
  const onAuthorChange = (e) => setAuthor(e.target.value)

  const canSave = Boolean(author) && Boolean(title) && Boolean(description)
  const savePost = () => {
    if (!canSave) return
    dispatch(AddPost(title, description, author))
    setTitle('')
    setAuthor('')
    setDescription('')
  }

  const renderAuthors = authors?.map((author) => <option key={author.id}>{author.name}</option>)

  return (
    <form>
      <h2 className='form-title'>Create a new Post</h2>
      <label htmlFor='form-post-author'>Please choose an author</label>
      <select type='text' value={author} onChange={onAuthorChange} name='form-post-author'>
        <option>{''}</option>
        {renderAuthors}
      </select>
      <label htmlFor='form-post-title'>Post Title</label>
      <input type='text' value={title} onChange={onTitleChange} name='form-post-title' placeholder='Post Title...' />
      <label htmlFor='form-textarea'>Post Content</label>
      <textarea type='text' value={description} onChange={onDescriptionChange} name='form-textarea' placeholder='Post Content...' rows={8} />
      <button type='button' onClick={savePost} disabled={!canSave} className='form-button'>
        Send Post
      </button>
    </form>
  )
}

export default PostForm
