import React from 'react'
import { Link } from 'react-router-dom';
import { IContact } from '../MockAPI/store';

interface ContactProps {
	contact: IContact
}

export function Contact (props: ContactProps) {
	return (
		<div className="contact">
			<h3>
				{props.contact.name || 'Unnamed'}
				<Link to={`/${props.contact.id}`}>See More ▶</Link>
			</h3>
			<strong>{props.contact.job || 'Unemployed'}</strong>

		</div>
	)
}