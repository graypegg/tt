import React from 'react'
import { IContact } from '../MockAPI/store';
import { Contact } from './Contact';

interface ContactsListProps {
	contacts: IContact[]
}

export function ContactsList (props: ContactsListProps) {
	return (
		<div className="contacts">
			{
				props.contacts.map(contact => <Contact contact={contact} />)
			}
		</div>
	)
}