import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit'
import {sub} from 'date-fns'

const baseURL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  posts: [],
  isLoading: null,
  error: null,
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
    AddPost: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, description, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: description,
            userId,
            date: new Date().toISOString(),
            likes: {
              thumbsUp: 0,
              hearts: 0,
            },
          },
        }
      },
    },
    AddLikes(state, action) {
      const {postId, reaction} = action.payload
      const selectedPost = state.posts.find((post) => post.id === postId)
      if (selectedPost) {
        selectedPost.likes[reaction]++
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.isLoading = true
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.isLoading = false
      let minuts = 1
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), {minutes: minuts++}).toISOString()
        post.likes = {
          thumbsUp: 0,
          hearts: 0,
        }
        return post
      })
      state.posts = state.posts.concat(loadedPosts)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    },
  },
})

export const allPosts = (state) => state.posts.posts
export const getPostStatus = (state) => state.posts.isLoading
export const getPostError = (state) => state.posts.error
export const {AddPost, AddLikes} = postSlice.actions
export default postSlice.reducer
