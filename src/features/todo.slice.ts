import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getContainer } from '../infraestructure/container'
import { TYPES } from '../infraestructure/types'
import { Todo } from '../model/todo'
import { TodoService } from '../services/todo.service'
import type { RootState } from '../store'

interface TodoState {
  value: Todo[],
  isDoingAction: boolean,
  isLoading: boolean
}

const initialState: TodoState = {
  value: [],
  isDoingAction: false,
  isLoading: false
}

const myContainer = getContainer()
const service = myContainer.get<TodoService>(TYPES.TodoService)


export const fetchAll = createAsyncThunk(
  'todo/fetchAll', async () => {
    let todos = await service.getAll()
    if (todos.status) {
      return todos.data;
    }

    return []
  }
)

export const cancel = createAsyncThunk(
  'todo/cancel', async (id: string, thunk) => {
    const result = await service.cancel(id)
    if (result.status) {
      await thunk.dispatch(fetchAll())
    }
  })

export const complete = createAsyncThunk(
  'todo/complete', async (id: string, thunk) => {
    const result = await service.complete(id)
    if (result.status) {
      thunk.dispatch(fetchAll())
    }
  }
)



export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Todo[]>) => {
      state.value = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      state.value = action.payload
      state.isLoading = false
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })

    builder.addCase(fetchAll.pending, (state)=> {
      state.isLoading = true
    })

    builder.addCase(cancel.fulfilled, (state)=> {
      state.isDoingAction = false
    })

    builder.addCase(cancel.pending , (state)=> {
      state.isDoingAction = true
    })


    builder.addCase(complete.fulfilled, (state)=> {
      state.isDoingAction = false
    })

    builder.addCase(complete.pending, (state)=> {
      state.isDoingAction = true
    })

  }
})



export const { set } = todoSlice.actions
export const selectTodo = (state: RootState) => state.todo.value

export default todoSlice.reducer