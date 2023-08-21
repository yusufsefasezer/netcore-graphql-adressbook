import React from 'react'
import AddressForm from '../AddressForm/AddressForm';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACT_BY_ID } from '../../../queries/Query/ContactQuery'
import { GET_ADDRESS_BY_ID } from '../../../queries/Query/AddressQuery'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import { UPDATE_ADDRESS } from '../../../queries/Mutation/AddressMutation';
import { useParams, useNavigate } from 'react-router-dom'

export default function EditAddress(props) {

    const { contactId, addressId } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_ADDRESS_BY_ID, {
        variables: { id: parseInt(addressId, 10) }
    });

    const [updateAddress, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_ADDRESS, {
        refetchQueries: [GET_CONTACT_BY_ID],
        variables: { id: parseInt(contactId, 10) },
        onCompleted: () => {
            return navigate('/');
        }
    });

    if (loading) return <p>loading...</p>;
    if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>;

    const { address } = data;

    return (
        <>
            {mutationLoading && <p>loading...</p>}
            {mutationError && <ErrorComponent title="Error">{error.message}</ErrorComponent>}
            <AddressForm
                title='Edit Address'
                contactId={props.match.params.contactId}
                name={address.name}
                country={address.country}
                city={address.city}
                postalCode={address.postalCode}
                addressLine={address.addressLine}
                operation={updateAddress}
                {...props} />
        </>
    );
}
