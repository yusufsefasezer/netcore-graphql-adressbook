import React, { Component } from 'react'
import { Header, Form, Input, Button, Icon } from 'semantic-ui-react';

const groupOptions = [
    { value: 'FAMILY', text: 'Family' },
    { value: 'FRIENDS', text: 'Friends' },
    { value: 'RELATIVES', text: 'Relatives' },
    { value: 'OTHER', text: 'Other' }
];

export class ContactForm extends Component {

    state = {
        contact: {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            phoneNumber: this.props.phoneNumber,
            email: this.props.email,
            contactType: this.props.contactType,
            webAddress: this.props.webAddress,
            notes: this.props.notes
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
    }

    onChange = (e, { name, value }) => {
        this.setState(prevState => ({
            contact: {
                ...prevState.contact,
                [name]: value
            }
        }));
    }

    onBlur = (e) => {
        const { name, value } = e.target;
        if (!name) return;
        this.setState(prevState => ({
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

    onSubmit = (e) => {
        e.preventDefault();

        this.props.operation({
            variables: {
                contactId: this.props.match.params.contactId,
                contact: this.state.contact
            }
        });
    }

    render() {
        return (
            <React.Fragment>

                <Header
                    as='h2'
                    textAlign='center'>
                    {this.props.title}
                </Header>

                <Form size='large' onSubmit={this.onSubmit}>

                    <Form.Input
                        name='firstName'
                        label='First name:'
                        placeholder='First Name'
                        maxLength='50'
                        required
                        value={this.state.contact.firstName}
                        error={this.state.errors.firstName}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Form.Input
                        name='lastName'
                        label='Last name:'
                        placeholder='Last Name'
                        maxLength='50'
                        value={this.state.contact.lastName}
                        error={this.state.errors.lastName}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Form.Input
                        name='phoneNumber'
                        type='tel'
                        label='Phone number:'
                        placeholder='Phone Number'
                        maxLength='20'
                        value={this.state.contact.phoneNumber}
                        error={this.state.errors.phoneNumber}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Form.Input
                        name='email'
                        type='email'
                        label='E-mail:'
                        placeholder='E-mail address'
                        maxLength='100'
                        required
                        value={this.state.contact.email}
                        error={this.state.errors.email}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Form.Select
                        name='contactType'
                        label='Group:'
                        options={groupOptions}
                        value={this.state.contact.contactType || groupOptions[0].value}
                        error={this.state.errors.contactType}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Form.Field>
                        <label>Web address:</label>
                        <Input
                            name='webAddress'
                            label='http://'
                            placeholder='Web address'
                            maxLength='100'
                            value={this.state.contact.webAddress}
                            error={this.state.errors.webAddress}
                            onChange={this.onChange}
                            onBlur={this.onBlur} />
                    </Form.Field>

                    <Form.TextArea
                        name='notes'
                        label='Notes:'
                        placeholder='Notes'
                        maxLength='255'
                        value={this.state.contact.notes}
                        error={this.state.errors.notes}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Button
                        color='red'
                        labelPosition='left'
                        icon onClick={() => { this.props.history.goBack() }}>
                        <Icon name='arrow left' />
                        Cancel
                    </Button>

                    <Button
                        color='green'
                        labelPosition='right' icon>
                        <Icon name='send' />
                        Submit
                    </Button>
                </Form>

            </React.Fragment >
        );
    };

};

export default ContactForm;
