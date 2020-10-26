import { rest } from 'msw';
import { Contact, isContact, STORE } from './store';

export interface ContactEndpoint {
	'GET contact': {
		response: Contact[]
	}
	'POST contact': {
		body: Contact,
		response: Contact[]
	}
}

export const ContactHandlers = [
	rest.get('contact', (req, res, ctx) => {
		const result = STORE.contacts
		res(
			ctx.status(200),
			ctx.json(result)
		)
	}),
	rest.post<ContactEndpoint['POST contact']['body']>('contact', (req, res, ctx) => {
		if (isContact(req.body)) {
			STORE.contacts = STORE.contacts.concat([req.body])
			const result = STORE.contacts
			res(
				ctx.status(200),
				ctx.json(result)
			)
		}
		res(
			ctx.status(400)
		)
	})
]