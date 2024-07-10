import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
// import { tokenReceived, loggedOut } from './authSlice'

const baseQuery = fetchBaseQuery({ baseUrl: 'https://localhost:7263/api/v1' });

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/user', api, extraOptions)
    console.log('refreshResult', refreshResult)
    if (refreshResult.data) {
      // store the new token

      // api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      // api.dispatch(loggedOut())
    }
  }
  return result
}