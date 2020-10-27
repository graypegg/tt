import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ContactForm } from '../ContactForm/ContactForm'
import { IContactInput, isContact } from '../MockAPI/store'
import { useTypedSelector } from '../state'
import { addContact, updateContact } from '../state/contacts'

export function Contact () {
	const dispatch = useDispatch()
	const { id } = useParams<{ id: string }>()
	const contact = useTypedSelector(state => state.contacts.entities[id])

	const saveContact = useCallback((changes: IContactInput) => {
		dispatch(updateContact({ id, changes }))
	}, [dispatch, id])

	if (isContact(contact)) {
		return (
			<div className="contact">
				<Link to="/">◀ Back</Link>
				<h3>{contact.name || 'Unnamed'}</h3>
				<strong>{contact.job || 'Unemployed'}</strong>

				<dl>
					<dt>Address</dt>
					<dd>{contact.address}</dd>

					<dt>Phone</dt>
					<dd><a href={`tel:${contact.tel}`}>{contact.tel}</a></dd>

					<dt>Email</dt>
					<dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
				</dl>

				<ContactForm legend="Update Contact" onSubmit={saveContact} contact={contact}></ContactForm>
			</div>
		)
	}
	return null
}