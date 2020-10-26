import React from 'react'
import { IContact } from '../MockAPI/store';
import { Contact } from './Contact';

interface ContactsProps {
	contacts: IContact[]
}

export function Contacts (props: ContactsProps) {
	return (
		<div className="contacts">
			{
				props.contacts.map(contact => <Contact contact={contact} />)
			}
		</div>
	)
}