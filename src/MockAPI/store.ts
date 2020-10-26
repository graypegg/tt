export interface IContactsStore {
	contacts: IContact[]
}

export interface IContact {
	name: string
	job: string
	address: string
	tel: string
	email: string
	avatar: string
}

export function isContact(value: Object): value is IContact {
	const keys = Object.keys(value)
	return ('name' in keys) && ('job' in keys) && ('address' in keys) && ('tel' in keys) && ('email' in keys) && ('avatar' in keys)
}

export const STORE: IContactsStore = {
	contacts: [ {name: 'd', job: 'q', address: '', tel: 'f', email: 'dsf', avatar: ''} ]
}