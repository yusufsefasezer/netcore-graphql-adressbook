import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Header, Form, Input, Button, Icon } from 'semantic-ui-react';

const groupOptions = [
    { value: 'FAMILY', text: 'Family' },
    { value: 'FRIENDS', text: 'Friends' },
    { value: 'RELATIVES', text: 'Relatives' },
    { value: 'OTHER', text: 'Other' }
];

export default function ContactForm(props) {

    const navigate = useNavigate();

    const { contactId } = useParams();

    const [inputs, setInputs] = useState({
        contact: {
            firstName: props.firstName,
            lastName: props.lastName,
            phoneNumber: props.phoneNumber,
            email: props.email,
            contactType: props.contactType,
            webAddress: props.webAddress,
            notes: props.notes
        },
        errors: {
            firstName: false,
            lastName: false,
            phoneNumber: false,
            email: false,
            contactType: false,
            webAddress: false,
            notes: false
        }
    });

    const onChange = (e, { name, value }) => {
        setInputs(prevState => ({
            contact: {
                ...prevState.contact,
                [name]: value
            },
            errors: {
                ...prevState.errors
            }
        }));
    }

    const onBlur = (e) => {
        const { name, value } = e.target;
        if (!name) return;
        setInputs(prevState => ({
            contact: {
                ...prevState.contact,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: value === ""
            }
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        props.operation({
            variables: {
                contactId: parseInt(contactId, 10),
                contact: inputs.contact
            }
        });
    }

    return (
        <>
            <Header as='h2' textAlign='center'>{props.title}</Header>

            <Form size='large' onSubmit={onSubmit}>

                <Form.Input
                    name='firstName'
                    label='First name:'
                    placeholder='First Name'
                    maxLength='50'
                    required
                    value={inputs.contact.firstName}
                    error={inputs.errors.firstName}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Form.Input
                    name='lastName'
                    label='Last name:'
                    placeholder='Last Name'
                    maxLength='50'
                    value={inputs.contact.lastName}
                    error={inputs.errors.lastName}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Form.Input
                    name='phoneNumber'
                    type='tel'
                    label='Phone number:'
                    placeholder='Phone Number'
                    maxLength='20'
                    value={inputs.contact.phoneNumber}
                    error={inputs.errors.phoneNumber}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Form.Input
                    name='email'
                    type='email'
                    label='E-mail:'
                    placeholder='E-mail address'
                    maxLength='100'
                    required
                    value={inputs.contact.email}
                    error={inputs.errors.email}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Form.Select
                    name='contactType'
                    label='Group:'
                    options={groupOptions}
                    value={inputs.contact.contactType || groupOptions[0].value}
                    error={inputs.errors.contactType}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Form.Field>
                    <label>Web address:</label>
                    <Input
                        name='webAddress'
                        label='https://'
                        placeholder='Web address'
                        maxLength='100'
                        value={inputs.contact.webAddress}
                        error={inputs.errors.webAddress}
                        onChange={onChange}
                        onBlur={onBlur} />
                </Form.Field>

                <Form.TextArea
                    name='notes'
                    label='Notes:'
                    placeholder='Notes'
                    maxLength='255'
                    value={inputs.contact.notes}
                    error={inputs.errors.notes}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Button color='red' labelPosition='left' icon onClick={() => { navigate(-1) }}><Icon name='arrow left' /> Cancel</Button>

                <Button color='green' labelPosition='right' icon><Icon name='send' /> Submit</Button>

            </Form>
        </>
    );
}
