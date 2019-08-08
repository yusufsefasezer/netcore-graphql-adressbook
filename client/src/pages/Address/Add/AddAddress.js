import React from 'react'
import AddressForm from '../AddressForm/AddressForm';
import { Mutation } from 'react-apollo';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import { addAddress } from '../../../queries/Mutation/AddressMutation';
import { getContactById } from '../../../queries/Query/ContactQuery';

export default function AddAddress(props) {

    return (
        <Mutation
            mutation={addAddress}
            refetchQueries={[{
                query: getContactById,
                variables: { id: props.match.params.contactId }
            }]}
            onCompleted={() => {
                return props.history.push('/');
            }}>
            {(addAddress, { loading, error }) => {
                if (loading) return <p>loading...</p>
                if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>
                return (
                    <AddressForm
                        title='Add New Address'
                        operation={addAddress}
                        {...props} />
                )
            }}
        </Mutation>
    );

};
