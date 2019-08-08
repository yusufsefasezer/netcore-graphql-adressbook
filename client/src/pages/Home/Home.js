import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import CustomCard from '../../components/CustomCard/CustomCard'
import { getContacts } from '../../queries/Query/ContactQuery'
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent'
import { CONTACT_PREFIX, EDIT_PREFIX } from '../../Global'

export default class Home extends Component {

    listContact = (contacts) => {
        return contacts.map(contact => (
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
    }

    checkContact = (contacts) => {
        return contacts.length !== 0 ?
            <Card.Group itemsPerRow='four' doubling stackable>
                {this.listContact(contacts)}
            </Card.Group>
            :
            <ErrorComponent title="Error">No records found.</ErrorComponent>
    }

    render() {
        return (
            <Query query={getContacts}>
                {({ data, loading, error }) => {
                    if (loading) return <p>loading...</p>
                    if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>
                    return this.checkContact(data.contacts);
                }}
            </Query>
        );
    };
};
