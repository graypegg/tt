import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ContactForm } from '../ContactForm/ContactForm';
import { IContactInput } from '../MockAPI/store';
import { addContact } from '../state/contacts';

export function NewContactForm() {
	const dispatch = useDispatch()

	const saveContact = useCallback((contact: IContactInput) => {
		dispatch(addContact(contact))
	}, [dispatch])

	return (
		<ContactForm legend="New Contact" onSubmit={saveContact}></ContactForm>
	)
}