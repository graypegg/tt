import React from 'react'
import useSWR from 'swr'
import { ContactsList } from '../ContactsList/ContactsList'
import { isContact } from '../MockAPI/store'
import { useTypedSelector } from '../state'

export function Contacts () {
	const { data } = useSWR('/contact')
	const contacts = useTypedSelector(state => state.contacts)

	if (contacts instanceof Array && contacts.every(isContact)) {
		return (
			<ContactsList contacts={contacts}></ContactsList>
		)
	}

	return null
}