import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getContainer } from '../infraestructure/container'
import { Nullable } from '../model/nullable'
import { User } from '../model/user'
import { UserImplService } from '../services/impl/user-impl.service'
import type { RootState } from '../store'

interface UserState {
    user: Nullable<User>,
    token: Nullable<string>
}


console.log(getContainer)

const service = new UserImplService()
export const USERTOKEN = 'USERTOKEN'

const initialState: UserState = {
    user: null,
    token: null
}

export interface FetchUserParams {
    instance: IPublicClientApplication,
    account: AccountInfo
}

export const fetchToken = createAsyncThunk(
    'todo/fetchToken', async ({ account, instance }: FetchUserParams, thunk) => {
        let token = await service.getToken(instance, account)
        localStorage.setItem(USERTOKEN, token)
        thunk.dispatch(fetchUser())
        return token
    }
)

export const fetchUser = createAsyncThunk(
    'todo/fetchUser', async () => {
        let user = await service.getUser()
        return user
    }
)


export const todoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, { payload }: PayloadAction<User>) => {
            state.user = payload

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            state.token = action.payload
        })

        builder.addCase(fetchUser.fulfilled, (state, action)=> {
            state.user = action.payload
        })
    }
})



export const { set } = todoSlice.actions
export const selectUser = (state: RootState) => state.user.user


export default todoSlice.reducer