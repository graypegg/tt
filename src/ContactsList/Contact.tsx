import React from 'react'
import { IContact } from '../MockAPI/store';

interface ContactProps {
	contact: IContact
}

export function Contact (props: ContactProps) {
	return (
		<div className="contact">
			Name: {props.contact.name}
		</div>
	)
}