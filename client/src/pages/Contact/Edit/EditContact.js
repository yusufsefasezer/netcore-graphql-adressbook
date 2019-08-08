import React from 'react'
import ContactForm from '../ContactForm/ContactForm';
import { Query, Mutation } from 'react-apollo';
import { getContactById, getContacts } from '../../../queries/Query/ContactQuery'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import { updateContact } from '../../../queries/Mutation/ContactMutation';

export default function EditContact(props) {

    return (
        <Query
            query={getContactById}
            variables={{ id: props.match.params.contactId }}>
            {({ data, loading, error }) => {
                if (loading) return <p>loading...</p>
                if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>

                const { contact } = data;

                return (
                    <Mutation
                        mutation={updateContact}
                        refetchQueries={[{
                            query: getContacts
                        }]}
                        onCompleted={() => {
                            return props.history.push('/');
                        }}>
                        {(updateContact, { loading, error }) => {
                            if (loading) return <p>loading...</p>
                            if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>
                            return (
                                <ContactForm
                                    title='Edit Contact'
                                    firstName={contact.firstName}
                                    lastName={contact.lastName}
                                    phoneNumber={contact.phoneNumber}
                                    email={contact.email}
                                    contactType={contact.contactType}
                                    webAddress={contact.webAddress}
                                    notes={contact.notes}
                                    operation={updateContact}
                                    {...props} />
                            )
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};
