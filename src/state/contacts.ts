import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  Update
} from '@reduxjs/toolkit'
import { RootState } from '.'
import { IContact, IContactInput, isContact } from '../MockAPI/store'

export const hydrateContacts = createAsyncThunk('contact/hydrate', async () => {
  const response = await fetch(`contact`).then((res) => res.json())
  if (response instanceof Array && response.every(isContact)) {
    return response
  }
  return []
})

export const addContact = createAsyncThunk(
  'contact/add',
  async (newContact: IContactInput) => {
    const response = await fetch(`contact`, {
      method: 'post',
      body: JSON.stringify(newContact),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    if (isContact(response)) {
      return response
    }
  }
)

export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id: string, thunkAPI) => {
    return fetch(`contact/${id}`, {
      method: 'delete'
    }).then((res) => res.json())
  }
)

export const updateContact = createAsyncThunk<
  IContact | undefined,
  Update<IContactInput>,
  { state: RootState }
>('contact/update', async (payload, thunkAPI) => {
  const currentContact = contactsSelectors.selectById(
    thunkAPI.getState(),
    payload.id
  )
  const response = await fetch(`contact/${payload.id}`, {
    method: 'put',
    body: JSON.stringify({
      ...currentContact,
      ...payload.changes
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())
  if (isContact(response)) {
    return response
  }
})

const contactsAdapter = createEntityAdapter<IContact>({
  selectId: (contact) => contact.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})

export const contactsSelectors = contactsAdapter.getSelectors(
  (state: RootState) => state.contacts
)

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    // Hydrate Contact
    builder.addCase(hydrateContacts.fulfilled, contactsAdapter.setAll)

    // Add Contact
    builder.addCase(addContact.pending, (state, action) =>
      contactsAdapter.addOne(state, {
        ...action.meta.arg,
        id: action.meta.requestId
      })
    )
    builder.addCase(addContact.rejected, (state, action) =>
      contactsAdapter.removeOne(state, action.meta.requestId)
    )
    builder.addCase(addContact.fulfilled, (state, action) =>
      action.payload
        ? contactsAdapter.updateOne(state, {
            id: action.meta.requestId,
            changes: action.payload
          })
        : state
    )

    // Update Contact
    builder.addCase(updateContact.pending, (state, action) =>
      contactsAdapter.updateOne(state, action.meta.arg)
    )
    builder.addCase(updateContact.rejected, (state, action) =>
      contactsAdapter.removeOne(state, action.meta.arg.id)
    )

    // Delete Contact
    builder.addCase(deleteContact.pending, (state, action) =>
      contactsAdapter.removeOne(state, action.meta.arg)
    )
  }
})
