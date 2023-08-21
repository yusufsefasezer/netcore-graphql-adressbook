import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Table, Button, Flag, Modal } from 'semantic-ui-react'
import { CONTACT_PREFIX, ADDRESS_PREFIX, EDIT_PREFIX } from '../../../Global'
import { useMutation } from '@apollo/client';
import { GET_CONTACT_BY_ID, getContactById } from '../../../queries/Query/ContactQuery'
import { DELETE_ADDRESS } from '../../../queries/Mutation/AddressMutation'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'

export default function AddressList({ contactId, addresses }) {

    const [open, setOpen] = useState(false);
    const [addressId, setaddressId] = useState(0);

    const [deleteAddress, { data, loading, error }] = useMutation(DELETE_ADDRESS, {
        refetchQueries: [{
            query: GET_CONTACT_BY_ID,
            variables: { id: contactId }
        }]
    });

    const showModal = (id) => {
        setOpen(true);
        setaddressId(id);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const listAddress = addresses.map((address, index) =>
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
                    onClick={() => { showModal(address.id) }} />
                <Link
                    to={`/${CONTACT_PREFIX}/${contactId}/${ADDRESS_PREFIX}/${address.id}/${EDIT_PREFIX}`}
                    className="ui mini inverted icon green button">
                    <Icon name='edit' />
                </Link>
            </Table.Cell>
        </Table.Row>
    );

    return (
        <>

            <Modal size='mini' open={open} onClose={closeModal}>
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={closeModal}>No</Button>
                    {loading && <p>loading...</p>}
                    {error && <ErrorComponent title="Error">{error.message}</ErrorComponent>}
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Yes'
                        onClick={() => {
                            deleteAddress({ variables: { addressId } });
                            closeModal();
                        }} />
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
                    {listAddress}
                </Table.Body>

            </Table>
        </>
    );
}
