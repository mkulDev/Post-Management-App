import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const baseURL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []

export const fetchAuthors = createAsyncThunk('posts.fetchAuthors', async () => {
  const response = await fetch(baseURL).then((data) => data.json())
  return response
})

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      return action.payload
    })
  },
})
export const allAuthors = (state) => state.authors
export default authorSlice.reducer
