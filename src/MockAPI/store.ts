export interface IContactsStore {
	contacts: IContact[]
	lastId: number
}

export interface IContactInput {
	name: string
	job: string
	address: string
	tel: string
	email: string
}

export interface IContact extends IContactInput {
	id: number
}

export function isContact(value: Object): value is IContact {
	return ['name', 'job', 'address', 'tel', 'email'].every(key => key in value)
}

export const STORE: IContactsStore = {
	contacts: [ {id: 1, name: 'Tim Whatever', job: 'Developer', address: '456-123 Rue St. Road', tel: '2899391065', email: 'asdf@kjh.com'} ],
	lastId: 1
}