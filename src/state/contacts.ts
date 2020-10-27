import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { IContact, IContactInput, isContact } from '../MockAPI/store';

export const hydrateContacts = createAsyncThunk(
	'contact/hydrate',
	async () => {
		const response = await fetch('contact').then(res => res.json())
		if (response instanceof Array && response.every(isContact)) {
			return response
		}
		return []
	}
)

export const addContact = createAsyncThunk(
	'contact/add',
	async (newContact: IContactInput) => {
		const response = await fetch(`contact`, {
			method: 'post',
			body: JSON.stringify(
				newContact
			),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		if (response instanceof Array && response.every(isContact)) {
			return response
		}
		return []
	}
)

const contactsAdapter = createEntityAdapter<IContact>({
	selectId: (contact) => contact.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const contactsSelectors = contactsAdapter.getSelectors((state: RootState) => state.contacts)

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState: contactsAdapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(hydrateContacts.fulfilled, contactsAdapter.setAll)
		builder.addCase(addContact.pending, (state, action) => contactsAdapter.addOne(state, {...action.meta.arg, id: action.meta.requestId }))
		builder.addCase(addContact.fulfilled, contactsAdapter.setAll)
		builder.addCase(addContact.rejected, (state, action) => contactsAdapter.removeOne(state, action.meta.requestId))
	}
})