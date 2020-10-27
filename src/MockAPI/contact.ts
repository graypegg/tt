import { rest } from 'msw'
import { IContact, IContactInput, isContact, STORE } from './store'

export interface ContactEndpoint {
	'GET contact': {
		response: IContact[]
	}
	'POST contact': {
		body: IContactInput,
		response: IContact[]
	}
}

export const ContactHandlers = [
	rest.get('/contact', (req, res, ctx) => {
		const result = STORE.contacts
		return res(
			ctx.status(200),
			ctx.json(result)
		)
	}),
	rest.post<ContactEndpoint['POST contact']['body']>('/contact', (req, res, ctx) => {
		if (isContact(req.body)) {
			STORE.contacts = STORE.contacts.concat([{...req.body, id: ++STORE.lastId}])
			const result = STORE.contacts
			return res(
				ctx.status(200),
				ctx.json(result)
			)
		}
		return res(
			ctx.status(400)
		)
	})
]