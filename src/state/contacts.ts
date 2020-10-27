import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { IContact, isContact } from '../MockAPI/store';

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

export const contactsAdapter = createEntityAdapter<IContact>({
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
	}
})