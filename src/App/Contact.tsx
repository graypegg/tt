import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { isContact } from '../MockAPI/store'
import { useTypedSelector } from '../state'

export function Contact () {
	const { id } = useParams<{ id: string }>()
	const contact = useTypedSelector(state => state.contacts.entities[id])

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
			</div>
		)
	}
	return null
}