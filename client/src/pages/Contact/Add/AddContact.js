import React from 'react'
import ContactForm from '../ContactForm/ContactForm';
import { Mutation } from 'react-apollo';
import { addContact } from '../../../queries/Mutation/ContactMutation';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import { getContacts } from '../../../queries/Query/ContactQuery';

export default function AddContact(props) {

    return (
        <Mutation
            mutation={addContact}
            refetchQueries={[{
                query: getContacts
            }]}
            onCompleted={() => {
                return props.history.push('/');
            }}>
            {(addContact, { loading, error }) => {
                if (loading) return <p>loading...</p>
                if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>
                return (
                    <ContactForm
                        title='Add New Contact'
                        operation={addContact}
                        {...props} />
                )
            }}
        </Mutation>
    );
};
