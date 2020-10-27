import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { IContact } from '../../MockAPI/store';
import { addContact } from '../../state/contacts';

interface NewContactFormProps {

}

export function NewContactForm(props: NewContactFormProps) {
	const dispatch = useDispatch()

	const [newName, setNewName] = useState('' as IContact['name'])
	const [newJob, setNewJob] = useState('' as IContact['job'])
	const [newAddress, setNewAddress] = useState('' as IContact['address'])
	const [newTel, setNewTel] = useState('' as IContact['tel'])
	const [newEmail, setNewEmail] = useState('' as IContact['email'])

	const saveContact = useCallback(() => {
		dispatch(addContact({
			name: newName,
			job: newJob,
			address: newAddress,
			tel: newTel,
			email: newEmail
		}))
	}, [dispatch, newName, newJob, newAddress, newTel, newEmail])

	return (
		<fieldset className="newContactForm">
			<legend>New Contact</legend>
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

			<button onClick={saveContact} type="submit">Add</button>
		</fieldset>
	)
}