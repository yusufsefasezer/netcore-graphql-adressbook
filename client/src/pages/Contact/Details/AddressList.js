import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Table, Button, Flag, Modal } from 'semantic-ui-react'
import { CONTACT_PREFIX, ADDRESS_PREFIX, EDIT_PREFIX } from '../../../Global'
import { Mutation } from 'react-apollo'
import { getContactById } from '../../../queries/Query/ContactQuery'
import { deleteAddress } from '../../../queries/Mutation/AddressMutation'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'

export default class AddressList extends Component {

    state = {
        isOpen: false,
        addressId: 0
    }

    showModal = (id) => {
        this.setState({
            isOpen: true,
            addressId: id
        });
    }

    closeModal = () => {
        this.setState({ isOpen: false });
    }

    listAddress = (addresses) => {
        return addresses.map((address, index) => (
            <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{address.name}</Table.Cell>
                <Table.Cell>{address.addressLine}</Table.Cell>
                <Table.Cell>{address.postalCode}</Table.Cell>
                <Table.Cell>{address.city}</Table.Cell>
                <Table.Cell><Flag name={address.country.toLowerCase()} /> {address.country}</Table.Cell>
                <Table.Cell>
                    <Button
                        color='red'
                        size='mini'
                        icon='delete'
                        inverted
                        onClick={() => { this.showModal(address.id) }} />
                    <Link
                        to={`/${CONTACT_PREFIX}/${this.props.contactId}/${ADDRESS_PREFIX}/${address.id}/${EDIT_PREFIX}`}
                        className="ui mini inverted icon green button">
                        <Icon name='edit' />
                    </Link>
                </Table.Cell>
            </Table.Row>
        ))
    }

    render() {
        return (
            <React.Fragment>

                <Modal size='mini' open={this.state.isOpen} onClose={this.closeModal}>
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.closeModal}>No</Button>
                        <Mutation
                            mutation={deleteAddress}
                            variables={{ addressId: this.state.addressId }}
                            refetchQueries={[{
                                query: getContactById,
                                variables: { id: this.props.contactId }
                            }]}>
                            {(mutate, { loading, error }) => {
                                if (loading) return <p>loading...</p>
                                if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>
                                return (
                                    <Button
                                        positive
                                        icon='checkmark'
                                        labelPosition='right'
                                        content='Yes'
                                        onClick={() => {
                                            mutate();
                                            this.closeModal();
                                        }} />
                                );
                            }}
                        </Mutation>
                    </Modal.Actions>
                </Modal>

                <Table celled selectable>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Postal Code</Table.HeaderCell>
                            <Table.HeaderCell>City</Table.HeaderCell>
                            <Table.HeaderCell>Country</Table.HeaderCell>
                            <Table.HeaderCell>Operation</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.listAddress(this.props.addresses)}
                    </Table.Body>

                </Table>
            </React.Fragment>
        );
    }
};
