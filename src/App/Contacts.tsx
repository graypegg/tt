import React from 'react'
import useSWR from 'swr'
import { ContactsList } from '../ContactsList/ContactsList'
import { isContact } from '../MockAPI/store'

export function Contacts () {
	const { data } = useSWR('/contact')

	if (data instanceof Array && data.every(isContact)) {
		return (
			<ContactsList contacts={data}></ContactsList>
		)
	}

	return null
}