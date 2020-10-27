import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../MockAPI/store';

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState: [] as IContact[],
	reducers: {
		hydrate: (state, action: PayloadAction<IContact[]>) => action.payload,
		add: (state, action: PayloadAction<IContact>) => state.concat([action.payload]),
		update: (state, action: PayloadAction<{newContact: IContact, index: number}>) => (
			{
				...state,
				[action.payload.index]: Object.assign(
					{},
					state[action.payload.index],
					action.payload.newContact
				)
			}
		),
		remove: (state, action: PayloadAction<number>) => state.slice(0, action.payload).concat(state.slice(action.payload + 1))
	}
})