import { configureStore } from '@reduxjs/toolkit'
import postSlice from './postSlice'
import authorSlice from './authorSlice'
const store = configureStore({
  reducer: {
    posts: postSlice,
    authors: authorSlice
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
