import { rest } from 'msw'
import { IContact, IContactInput, isContact, STORE } from './store'

export interface ContactEndpoint {
	'GET contact': {
		response: IContact[]
	}
	'POST contact': {
		body: IContactInput,
		response: IContact
	}
	'PUT contact': {
		body: IContactInput,
		response: IContact
	}
	'DELETE contact': {
		response: IContact
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
			const newContact = { ...req.body, id: (++STORE.lastId).toString() }
			STORE.contacts = STORE.contacts.concat([newContact])
			return res(
				ctx.status(200),
				ctx.json(newContact)
			)
		}
		return res(
			ctx.status(400)
		)
	}),
	rest.put<ContactEndpoint['PUT contact']['body']>('/contact/:id', (req, res, ctx) => {
		if (isContact(req.body) && req.params['id']) {
			const newContact = { ...req.body, id: req.params['id'] }
			STORE.contacts = STORE.contacts.filter(contact => contact.id !== req.params['id']).concat([newContact])
			return res(
				ctx.status(200),
				ctx.json(newContact)
			)
		}
		return res(
			ctx.status(400)
		)
	}),
	rest.delete<ContactEndpoint['PUT contact']['body']>('/contact/:id', (req, res, ctx) => {
		if (req.params['id']) {
			STORE.contacts = STORE.contacts.filter(contact => contact.id !== req.params['id'])
			return res(
				ctx.status(200),
				ctx.json({})
			)
		}
		return res(
			ctx.status(400)
		)
	})
]