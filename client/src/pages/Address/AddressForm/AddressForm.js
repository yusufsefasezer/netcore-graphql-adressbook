import React, { useState } from 'react'
import { Header, Form, Button, Icon } from 'semantic-ui-react';
import { useNavigate, useParams } from "react-router-dom";
import { Country } from '../../../Country';

export default function AddressForm(props) {

    const navigate = useNavigate();

    const { addressId, contactId } = useParams();

    const [inputs, setInputs] = useState({
        address: {
            name: props.name,
            country: props.country,
            city: props.city,
            postalCode: props.postalCode,
            addressLine: props.addressLine,
        },
        errors: {
            name: false,
            country: false,
            city: false,
            postalCode: false,
            addressLine: false
        }
    });

    const onChange = (e, { name, value }) => {
        setInputs(prevState => ({
            address: {
                ...prevState.address,
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
            address: {
                ...prevState.address,
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
                addressId: parseInt(addressId, 10),
                contactId: parseInt(contactId, 10),
                address: inputs.address
            }
        });
    }

    return (
        <>
            <Header as='h2' textAlign='center'>{props.title}</Header>

            <Form size='large' onSubmit={onSubmit}>

                <Form.Input
                    name='name'
                    label='Name:'
                    placeholder='Address Name'
                    maxLength='20'
                    required
                    value={inputs.address.name}
                    error={inputs.errors.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoFocus />

                <Form.Dropdown
                    name='country'
                    label='Country:'
                    placeholder='Select Country'
                    required
                    fluid search selection
                    options={Country}
                    defaultValue={inputs.address.country}
                    error={inputs.errors.country}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Form.Input
                    name='city'
                    label='City:'
                    placeholder='City'
                    maxLength='30'
                    required
                    value={inputs.address.city}
                    error={inputs.errors.city}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Form.Input
                    name='postalCode'
                    label='Postal Code:'
                    placeholder='Postal Code'
                    maxLength='10'
                    required
                    value={inputs.address.postalCode}
                    error={inputs.errors.postalCode}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Form.TextArea
                    name='addressLine'
                    label='Address:'
                    placeholder='Address'
                    maxLength='255'
                    required
                    value={inputs.address.addressLine}
                    error={inputs.errors.addressLine}
                    onChange={onChange}
                    onBlur={onBlur} />

                <Button color='red' labelPosition='left' icon onClick={() => { navigate(-1) }}><Icon name='arrow left' /> Cancel</Button>

                <Button color='green' labelPosition='right' icon><Icon name='send' /> Submit</Button>

            </Form>
        </>
    );
}