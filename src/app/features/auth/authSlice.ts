import { createSlice } from '@reduxjs/toolkit'
import { authApi, User } from '../auth/auth'
import type { RootState } from '../../store'

type AuthState = {
  user: User | null
  token: string | null | undefined
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.user = payload.user
      }
    )
  },
})

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth?.user