import React from 'react'
import ContactForm from '../ContactForm/ContactForm';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACT_BY_ID, GET_CONTACTS } from '../../../queries/Query/ContactQuery'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import { UPDATE_CONTACT } from '../../../queries/Mutation/ContactMutation';
import { useParams, useNavigate } from 'react-router-dom'

export default function EditContact(props) {

    const { contactId } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_CONTACT_BY_ID, {
        variables: { id: parseInt(contactId, 10) }
    });

    const [updateContact, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_CONTACT, {
        refetchQueries: [GET_CONTACTS],
        onCompleted: () => {
            return navigate('/');
        }
    });

    if (loading) return <p>loading...</p>;
    if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>;

    const { contact } = data;

    return (
        <>
            {mutationLoading && <p>loading...</p>}
            {mutationError && <ErrorComponent title="Error">{mutationError.message}</ErrorComponent>}
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
        </>
    );
}
