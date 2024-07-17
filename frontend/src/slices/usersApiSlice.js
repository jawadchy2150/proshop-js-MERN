import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;

//Using a mutation for logging in is a common practice even though it might not seem like you're updating something. Here are the reasons why a mutation is appropriate for a login operation:

//Login as a Side-Effect Operation:
//A login action typically involves sending credentials (username and password) to the server and receiving a response that includes a token and user information.Even though you're not updating data on the server, the action has side effects, such as generating and returning a token or session information, which can be considered a state-changing operation.

//HTTP Method:
//Logins usually use the POST method, which is generally associated with creating or updating resources. This contrasts with the GET method, which is idempotent and used for fetching data without side effects.

//Security and Semantics:
//POST requests are more secure for sending sensitive information like passwords because they don't include data in the URL, which can be logged in server logs or browser history.

//Behavior:
//Mutations in Redux Toolkit Query are designed to handle actions that change the state, manage cache invalidation, and handle errors differently than queries. Since login operations often require special handling (e.g., storing tokens, redirecting users), using a mutation is more suitable.
