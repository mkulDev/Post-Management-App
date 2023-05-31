import {createSlice, nanoid} from '@reduxjs/toolkit'
import {sub} from 'date-fns'

const initialState = [
  {
    id: 0,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit!',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eaque recusandae, velit rerum distinctio ab vel eum nostrum quos quo, possimus expedita, accusantium asperiores iste ipsam nemo unde minima. Necessitatibus!',
    date: sub(new Date(), {minutes: 10}).toISOString(),
    likes: {
      thumbsUp: 2,
      hearts: 0,
    },
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet.',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eaque recusandae, velit rerum distinctio ab vel eum nostrum quos quo, possimus expedita, accusantium asperiores iste ipsam nemo unde minima. Necessitatibus!',
    date: sub(new Date(), {minutes: 123}).toISOString(),
    likes: {
      thumbsUp: 1,
      hearts: 4,
    },
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor!',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eaque recusandae, velit rerum distinctio ab vel eum nostrum quos quo, possimus expedita, accusantium asperiores iste ipsam nemo unde minima. Necessitatibus!',
    date: sub(new Date(), {minutes: 43}).toISOString(),
    likes: {
      thumbsUp: 2,
      hearts: 2,
    },
  },
]

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    AddPost: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, description, author) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            author,
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

      const selectedPost = state.find((post) => post.id === postId)

      if (selectedPost) {
        selectedPost.likes[reaction]++
      }
    },
  },
})

export const {AddPost, AddLikes} = postSlice.actions
export default postSlice.reducer
