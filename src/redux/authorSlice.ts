import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseURL = 'https://jsonplaceholder.typicode.com/users'

interface Author {
  id: number
  name: string
  username: string
  email: string
}

type AuthorsState = Author[]
const initialState: AuthorsState = []

export const fetchAuthors = createAsyncThunk('authors.fetchAuthors', async () => {
  const response = await fetch(baseURL)
  const data = await response.json()
  return data
})

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAuthors.fulfilled, (_state, action) => {
      return action.payload
      // return [...state, action.payload].flat()
    })
  }
})

export default authorSlice.reducer
