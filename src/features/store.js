import {configureStore} from '@reduxjs/toolkit'
import postSlice from './postSlice'
import authorSlice from './authorSlice'
const store = configureStore({
  reducer: {
    posts: postSlice,
    authors: authorSlice,
  },
})

export default store
