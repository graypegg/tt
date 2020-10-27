import React, { useCallback, useState } from 'react'
import { IContact, IContactInput } from '../MockAPI/store';

import './ContactForm.css'

interface ContactFormProps {
	legend: string
	onSubmit: (contact: IContactInput) => void
	contact?: IContactInput
}

export function ContactForm(props: ContactFormProps) {
	const [newName, setNewName] = useState(props.contact?.name ?? '' as IContact['name'])
	const [newJob, setNewJob] = useState(props.contact?.job ?? '' as IContact['job'])
	const [newAddress, setNewAddress] = useState(props.contact?.address ?? '' as IContact['address'])
	const [newTel, setNewTel] = useState(props.contact?.tel ?? '' as IContact['tel'])
	const [newEmail, setNewEmail] = useState(props.contact?.email ?? '' as IContact['email'])

	const submit = useCallback(() => {
		props.onSubmit({
			name: newName,
			job: newJob,
			address: newAddress,
			tel: newTel,
			email: newEmail
		})
	}, [props.onSubmit, newName, newJob, newAddress, newTel, newEmail])

	return (
		<fieldset className="contactForm">
			<legend className="contactForm__legend">{props.legend}</legend>
			<label className="contactForm__row">
				<span>Name</span>
				<input value={newName} onChange={e => setNewName(e.target.value)} />
			</label>
			<label className="contactForm__row">
				<span>Job</span>
				<input value={newJob} onChange={e => setNewJob(e.target.value)} />
			</label>
			<label className="contactForm__row">
				<span>Address</span>
				<input value={newAddress} onChange={e => setNewAddress(e.target.value)} />
			</label>
			<label className="contactForm__row">
				<span>Tel.</span>
				<input value={newTel} onChange={e => setNewTel(e.target.value)} type="tel" />
			</label>
			<label className="contactForm__row">
				<span>Email</span>
				<input value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" />
			</label>

			<button onClick={submit} type="submit">Add</button>
		</fieldset>
	)
}