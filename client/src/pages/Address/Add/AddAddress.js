import React from 'react'
import AddressForm from '../AddressForm/AddressForm';
import { useMutation } from '@apollo/client';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import { ADD_ADDRESS } from '../../../queries/Mutation/AddressMutation';
import { GET_CONTACT_BY_ID } from '../../../queries/Query/ContactQuery';
import { useParams, useNavigate } from 'react-router-dom'

export default function AddAddress(props) {

    const { contactId } = useParams();

    const navigate = useNavigate();

    const [addAddress, { loading, error }] = useMutation(ADD_ADDRESS, {
        refetchQueries: [{
            query: GET_CONTACT_BY_ID,
            variables: { id: parseInt(contactId, 10) }
        }],
        onCompleted: () => {
            return navigate('/');
        }
    });

    if (loading) return <p>loading...</p>;
    if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>;

    return (
        <AddressForm
            title='Add New Address'
            operation={addAddress}
            {...props} />
    );
}
