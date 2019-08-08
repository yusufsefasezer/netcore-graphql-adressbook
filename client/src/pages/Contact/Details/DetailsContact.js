import React from 'react'
import { Query } from 'react-apollo'
import { Divider, Icon, Segment, Header } from 'semantic-ui-react'
import { getContactById } from '../../../queries/Query/ContactQuery'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import AddNew from './AddNew'
import AddressList from './AddressList'
import { CONTACT_PREFIX, ADDRESS_PREFIX, ADD_PREFIX } from '../../../Global'
import InfoContact from './InfoContact';
import { Link } from 'react-router-dom'

export default function DetailsContact(props) {
    return (
        <Query
            query={getContactById}
            variables={{ id: props.match.params.contactId }}>
            {({ data, loading, error }) => {
                if (loading) return <p>loading...</p>
                if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>

                return (
                    <React.Fragment>

                        <Segment basic textAlign='center'>
                            <Header
                                as='h2'
                                style={{ fontSize: '4em' }}>
                                {`${data.contact.firstName} ${data.contact.lastName}`}
                            </Header>
                            <p>{data.contact.notes}</p>
                        </Segment>

                        <Divider horizontal>Contact</Divider>

                        <InfoContact
                            phoneNumber={data.contact.phoneNumber}
                            email={data.contact.email}
                            webAddress={data.contact.webAddress} />

                        <Divider horizontal>Address</Divider>

                        {(data.contact.countOfAddress === 0) ?
                            <AddNew />
                            :
                            <AddressList
                                contactId={data.contact.id}
                                addresses={data.contact.addresses} />
                        }

                        <Segment basic size='tiny' textAlign='center'>
                            <Link
                                to={`/${CONTACT_PREFIX}/${data.contact.id}/${ADDRESS_PREFIX}/${ADD_PREFIX}`}
                                className="ui positive left labeled icon button">Add Address <Icon name='plus' /></Link>
                        </Segment>

                    </React.Fragment>
                );
            }}
        </Query>
    );
};
