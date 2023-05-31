import {createSlice} from '@reduxjs/toolkit'
const initialState = [
  {id: 1, name: 'Mark Twain'},
  {id: 2, name: 'Odi Nelson'},
  {id: 3, name: 'Frank Smith'},
  {id: 4, name: 'Alen Sedock'},
]

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
})

export default authorSlice.reducer
