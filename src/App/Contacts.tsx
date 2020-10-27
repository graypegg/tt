import React from 'react'
import { ContactsList } from '../ContactsList/ContactsList'
import { isContact } from '../MockAPI/store'
import { useTypedSelector } from '../state'
import { contactsSelectors } from '../state/contacts'

export function Contacts () {
	const contacts = useTypedSelector(contactsSelectors.selectAll)


	if (contacts instanceof Array && contacts.every(isContact)) {
		return (
			<div className="contact">
				<h1>Contacts</h1>
				<ContactsList contacts={contacts}></ContactsList>
			</div>
		)
	}

	return null
}