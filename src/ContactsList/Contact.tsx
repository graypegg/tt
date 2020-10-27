import React from 'react'
import { Link } from 'react-router-dom';
import { IContact } from '../MockAPI/store';

import './Contact.css'

interface ContactProps {
	contact: IContact
}

export function Contact (props: ContactProps) {
	return (
		<div className="contactRow">
			<h3 className="contactRow__name">
				{props.contact.name || 'Unnamed'}
				<Link to={`/${props.contact.id}`} className="contactRow__seeMoreLink">See More ▶</Link>
			</h3>
			<strong>{props.contact.job || 'Unemployed'}</strong>
		</div>
	)
}