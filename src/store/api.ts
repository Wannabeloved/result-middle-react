import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Contact', 'Group'],
  endpoints: (builder) => ({
    getContacts: builder.query<ContactDto[], void>({
      query: () => 'contacts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Contact' as const, id })),
              { type: 'Contact', id: 'LIST' },
            ]
          : [{ type: 'Contact', id: 'LIST' }],
    }),
    getGroups: builder.query<GroupContactsDto[], void>({
      query: () => 'groups',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Group' as const, id })),
              { type: 'Group', id: 'LIST' },
            ]
          : [{ type: 'Group', id: 'LIST' }],
    }),
    addContact: builder.mutation<ContactDto, Partial<ContactDto>>({
      query: (body) => ({
        url: `contacts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),
    toggleFavorite: builder.mutation<ContactDto, { id: string; isFavorite: boolean }>({
      query: ({ id, isFavorite }) => ({
        url: `contacts/${id}`,
        method: 'PATCH',
        body: { isFavorite },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Contact', id }],
    }),
  }),
});

export const { 
    useGetContactsQuery, 
    useGetGroupsQuery, 
    useAddContactMutation,
    useDeleteContactMutation,
    useToggleFavoriteMutation 
} = contactsApi;
