import React from 'react'
import { IContact } from '../MockAPI/store';

interface ContactProps {
	contact: IContact
}

export function Contact (props: ContactProps) {
	return (
		<dl className="contact">
			<h3>{props.contact.name}</h3>
			<strong>{props.contact.job}</strong>
			<dt>Address</dt>
			<dd>{props.contact.address}</dd>

			<dt>Phone</dt>
			<dd><a href={`tel:${props.contact.tel}`}>{props.contact.tel}</a></dd>

			<dt>Email</dt>
			<dd><a href={`mailto:${props.contact.email}`}>{props.contact.email}</a></dd>
		</dl>
	)
}