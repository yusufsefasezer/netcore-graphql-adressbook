import React, { Component } from 'react'
import { Header, Form, Button, Icon } from 'semantic-ui-react';
import { Country } from '../../../Country';

export default class AddressForm extends Component {

    state = {
        address: {
            name: this.props.name,
            country: this.props.country,
            city: this.props.city,
            postalCode: this.props.postalCode,
            addressLine: this.props.addressLine,
        },
        errors: {
            name: false,
            country: false,
            city: false,
            postalCode: false,
            addressLine: false
        }
    }

    onChange = (e, { name, value }) => {
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    }

    onBlur = (e) => {
        const { name, value } = e.target;
        if (!name) return;
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: (value === "")
            }
        }));
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.operation({
            variables: {
                addressId: this.props.match.params.addressId,
                contactId: this.props.match.params.contactId,
                address: this.state.address
            }
        });
    }

    render() {
        return (
            <React.Fragment>

                <Header as='h2' textAlign='center'>{this.props.title}</Header>

                <Form size='large' onSubmit={this.onSubmit}>

                    <Form.Input
                        name='name'
                        label='Name:'
                        placeholder='Address Name'
                        maxLength='20'
                        required
                        value={this.state.address.name}
                        error={this.state.errors.name}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        autoFocus />

                    <Form.Dropdown
                        name='country'
                        label='Country:'
                        placeholder='Select Country'
                        required
                        fluid search selection
                        options={Country}
                        defaultValue={this.state.address.country}
                        error={this.state.errors.country}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Form.Input
                        name='city'
                        label='City:'
                        placeholder='City'
                        maxLength='30'
                        required
                        value={this.state.address.city}
                        error={this.state.errors.city}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Form.Input
                        name='postalCode'
                        label='Postal Code:'
                        placeholder='Postal Code'
                        maxLength='10'
                        required
                        value={this.state.address.postalCode}
                        error={this.state.errors.postalCode}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Form.TextArea
                        name='addressLine'
                        label='Address:'
                        placeholder='Address'
                        maxLength='255'
                        required
                        value={this.state.address.addressLine}
                        error={this.state.errors.addressLine}
                        onChange={this.onChange}
                        onBlur={this.onBlur} />

                    <Button
                        color='red'
                        labelPosition='left'
                        icon
                        onClick={() => { this.props.history.goBack() }}>
                        <Icon name='arrow left' />
                        Cancel
                    </Button>

                    <Button
                        color='green'
                        labelPosition='right'
                        icon>
                        <Icon name='send' />
                        Submit
                    </Button>

                </Form>

            </React.Fragment>
        );
    };

};
