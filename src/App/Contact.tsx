import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ContactForm } from '../ContactForm/ContactForm'
import { IContactInput, isContact } from '../MockAPI/store'
import { useTypedSelector } from '../state'
import { deleteContact, updateContact } from '../state/contacts'

import './Contact.css'

export function Contact () {
	const dispatch = useDispatch()
	const history = useHistory()
	const { id } = useParams<{ id: string }>()
	const contact = useTypedSelector(state => state.contacts.entities[id])

	const onUpdateContact = useCallback((changes: IContactInput) => {
		dispatch(updateContact({ id, changes }))
	}, [dispatch, id])

	const onDeleteContact = useCallback(() => {
		dispatch(deleteContact(id))
		history.push('/')
	}, [dispatch, id])

	if (isContact(contact)) {
		return (
			<div className="contact">
				<h1>Contact</h1>
				<Link to="/">◀ Back</Link>
				<h3>{contact.name || 'Unnamed'}</h3>
				<strong>{contact.job || 'Unemployed'}</strong>

				<dl className="contact__information">
					<dt className="contact__information__title">Address</dt>
					<dd className="contact__information__data">{contact.address}</dd>

					<dt className="contact__information__title">Phone</dt>
					<dd className="contact__information__data"><a href={`tel:${contact.tel}`}>{contact.tel}</a></dd>

					<dt className="contact__information__title">Email</dt>
					<dd className="contact__information__data"><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
				</dl>

				<button className="contact__delete" onClick={onDeleteContact}>Delete Permanently</button>
				<ContactForm legend="Update Contact" onSubmit={onUpdateContact} contact={contact}></ContactForm>
			</div>
		)
	}
	return null
}