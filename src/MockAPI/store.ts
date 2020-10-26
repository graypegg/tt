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
	return ['name', 'job', 'address', 'tel', 'email', 'avatar'].every(key => key in value)
}

console.log(isContact)

export const STORE: IContactsStore = {
	contacts: [ {name: 'd', job: 'q', address: '', tel: 'f', email: 'dsf', avatar: ''} ]
}