export interface IContactsStore {
	contacts: IContact[]
}

export interface IContact {
	name: string
	job: string
	address: string
	tel: string
	email: string
}

export function isContact(value: Object): value is IContact {
	return ['name', 'job', 'address', 'tel', 'email'].every(key => key in value)
}

console.log(isContact)

export const STORE: IContactsStore = {
	contacts: [ {name: 'Tim Whatever', job: 'Developer', address: '456-123 Rue St. Road', tel: '2899391065', email: 'asdf@kjh.com'} ]
}