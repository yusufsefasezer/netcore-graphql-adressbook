import React from 'react'
import ContactForm from '../ContactForm/ContactForm';
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { ADD_CONTACT } from '../../../queries/Mutation/ContactMutation';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import { GET_CONTACTS } from '../../../queries/Query/ContactQuery';

export default function AddContact(props) {

    const navigate = useNavigate();

    const [addContact, { loading, error }] = useMutation(ADD_CONTACT, {
        refetchQueries: [GET_CONTACTS],
        onCompleted: () => {
            return navigate('/');
        }
    });

    if (loading) return <p>loading...</p>;
    if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>;

    return (
        <ContactForm
            title='Add New Contact'
            operation={addContact}
            {...props} />
    );
}
