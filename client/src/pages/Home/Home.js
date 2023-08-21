import React from 'react'
import { Card } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';
import CustomCard from '../../components/CustomCard/CustomCard'
import { GET_CONTACTS } from '../../queries/Query/ContactQuery'
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent'
import { CONTACT_PREFIX, EDIT_PREFIX } from '../../Global'

export default function Home() {

    const { loading, error, data } = useQuery(GET_CONTACTS);

    if (loading) return <p>loading...</p>;
    if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>;

    if (!data.contacts.length) return <ErrorComponent title="Error">No records found.</ErrorComponent>;

    const listContact = data.contacts.map(contact => (
        <CustomCard
            key={contact.id}
            id={contact.id}
            firstName={contact.firstName}
            lastName={contact.lastName}
            group={`${contact.contactType.charAt(0).toUpperCase()}${contact.contactType.slice(1).toLowerCase()}`}
            description={contact.notes}
            countOfAddress={contact.countOfAddress}
            detailUrl={`/${CONTACT_PREFIX}/${contact.id}`}
            editUrl={`/${CONTACT_PREFIX}/${contact.id}/${EDIT_PREFIX}`} />))

    return <Card.Group itemsPerRow='four' doubling stackable>{listContact}</Card.Group>;
}
