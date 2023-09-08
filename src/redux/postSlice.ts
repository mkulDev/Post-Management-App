import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import Post from '../conponents/Post'
import { RootState } from './store'

const baseURL = 'https://jsonplaceholder.typicode.com/posts'

type Post = {
  userId: number
  id: string
  title: string
  body: string
  date?: string
  likes: {
    thumbsUp: number
    hearts: number
  }
}

type PostsState = {
  posts: Post[]
  isLoading: boolean
  error: null | string
}
const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null
}

export const fetchPosts = createAsyncThunk('posts.fetchPosts', async () => {
  const response = await fetch(baseURL)
  const data = await response.json()
  return data
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    AddPost(state, action) {
      const { title, body, userId }: { title: string; body: string; userId: number } = action.payload
      const newPost = {
        id: nanoid(),
        title,
        body: body,
        userId,
        date: new Date().toISOString(),
        likes: {
          thumbsUp: 0,
          hearts: 0
        }
      }

      state.posts.push(newPost)
    },
    AddLikes(state, action) {
      const { postId, reaction } = action.payload
      const selectedPost = state.posts.find((post) => post.id === postId)
      if (selectedPost) {
        const validReaction = reaction as keyof Post['likes']
        selectedPost.likes[validReaction]++
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true
    }),
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false
        let minuts = 1
        const loadedPosts = action.payload.map((post: Post) => {
          post.date = sub(new Date(), { minutes: minuts++ }).toISOString()
          post.likes = { thumbsUp: 0, hearts: 0 }
          return post
        })
        state.posts = state.posts.concat(loadedPosts)
      }),
      builder.addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error occured'
      })
  }
})

export const allPosts = (state: RootState) => state.posts.posts
export const getPostStatus = (state: RootState) => state.posts.isLoading
export const getPostError = (state: RootState) => state.posts.error
export const { AddPost, AddLikes } = postSlice.actions
export default postSlice.reducer
