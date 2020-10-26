export interface ContactsStore {
	contacts: Contact[]
}

export interface Contact {
	name: string
	job: string
	address: string
	tel: string
	email: string
	avatar: string
}

export function isContact(value: Object): value is Contact {
	const keys = Object.keys(value)
	return ('name' in keys) && ('job' in keys) && ('address' in keys) && ('tel' in keys) && ('email' in keys) && ('avatar' in keys)
}

export const STORE: ContactsStore = {
	contacts: []
}