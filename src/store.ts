import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './features/user.slice'
import TodoReducer from './features/todo.slice'


export const store = configureStore({
    reducer: {
        todo: TodoReducer,
        user: UserReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch