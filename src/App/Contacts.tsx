import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ContactsList } from '../ContactsList/ContactsList'
import { isContact } from '../MockAPI/store'
import { useTypedSelector } from '../state'
import { contactsSelectors, hydrateContacts } from '../state/contacts'

export function Contacts () {
	const contacts = useTypedSelector(contactsSelectors.selectAll)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(hydrateContacts())
	}, [dispatch])

	if (contacts instanceof Array && contacts.every(isContact)) {
		return (
			<ContactsList contacts={contacts}></ContactsList>
		)
	}

	return null
}