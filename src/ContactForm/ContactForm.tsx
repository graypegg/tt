import React, { useCallback, useState } from 'react'
import { IContact, IContactInput } from '../MockAPI/store';

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
		<fieldset className="newContactForm">
			<legend>{props.legend}</legend>
			<label>
				Name
				<input value={newName} onChange={e => setNewName(e.target.value)} />
			</label>
			<label>
				Job
				<input value={newJob} onChange={e => setNewJob(e.target.value)} />
			</label>
			<label>
				Address
				<input value={newAddress} onChange={e => setNewAddress(e.target.value)} />
			</label>
			<label>
				Phone Number
				<input value={newTel} onChange={e => setNewTel(e.target.value)} type="tel" />
			</label>
			<label>
				Email
				<input value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" />
			</label>

			<button onClick={submit} type="submit">Add</button>
		</fieldset>
	)
}