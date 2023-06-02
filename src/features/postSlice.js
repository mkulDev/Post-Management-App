import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit'
import {sub} from 'date-fns'

const baseURL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts.fetchPosts', async () => {
  const response = await fetch(baseURL).then((data) => data.json())
  return response
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
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeded'
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
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
export const allPosts = (state) => state.posts.posts
export const getPostStatus = (state) => state.posts.status
export const getPostError = (state) => state.posts.error
export const {AddPost, AddLikes} = postSlice.actions
export default postSlice.reducer
