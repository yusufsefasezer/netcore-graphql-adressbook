import React from 'react'
import AddressForm from '../AddressForm/AddressForm';
import { Query, Mutation } from 'react-apollo';
import { getContactById } from '../../../queries/Query/ContactQuery'
import { getAddressById } from '../../../queries/Query/AddressQuery'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import { updateAddress } from '../../../queries/Mutation/AddressMutation';

export default function EditAddress(props) {

    return (
        <Query
            query={getAddressById}
            variables={{ id: props.match.params.addressId }}>
            {({ data, loading, error }) => {
                if (loading) return <p>loading...</p>
                if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>

                const { address } = data;

                return (
                    <Mutation
                        mutation={updateAddress}
                        refetchQueries={[{
                            query: getContactById,
                            variables: { id: props.match.params.contactId }
                        }]}
                        onCompleted={() => {
                            return props.history.push('/');
                        }}>
                        {
                            (updateAddress, { loading, error }) => {
                                if (loading) return <p>loading...</p>
                                if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>
                                return (
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
                                )
                            }
                        }

                    </Mutation>
                );
            }}
        </Query>
    );
};
