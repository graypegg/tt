import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ContactsList } from '../ContactsList/ContactsList'
import { isContact } from '../MockAPI/store'
import { useTypedSelector } from '../state'
import { addContact, contactsSelectors, hydrateContacts, updateContact } from '../state/contacts'

export function Contacts () {
	const contacts = useTypedSelector(contactsSelectors.selectAll)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(hydrateContacts())

		setTimeout(() => {
			dispatch(addContact({ name: 'Tim sdfsdf', job: 'Develdfggdfgdfoper', address: '456-123 Rue dfgdfgdfg. Road', tel: '2899391gdfdgf065', email: 'asdf@kjh.ff' }))
		}, 3000);

		setTimeout(() => {
			dispatch(updateContact({id: '2',changes: { name: 'Updated Naaaame' }}))
		}, 6000);
	}, [dispatch])

	if (contacts instanceof Array && contacts.every(isContact)) {
		return (
			<ContactsList contacts={contacts}></ContactsList>
		)
	}

	return null
}