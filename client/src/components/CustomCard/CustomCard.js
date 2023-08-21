import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Grid, Header } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { DELETE_CONTACT } from '../../queries/Mutation/ContactMutation'
import { GET_CONTACTS } from '../../queries/Query/ContactQuery'
import ErrorComponent from '../ErrorComponent/ErrorComponent'

export default function CustomCard(props) {

    const fullName = `${props.firstName} ${props.lastName}`;

    const [deleteContactMutation, { loading, error }] = useMutation(DELETE_CONTACT, {
        refetchQueries: [GET_CONTACTS]
    });

    if (loading) return <p>loading...</p>;
    if (error) return <ErrorComponent title="Error">{error.message}</ErrorComponent>;

    return (
        <Card link>

            <Header
                as='h1'
                textAlign='center'
                style={{ fontSize: '9em' }}>
                {props.firstName.charAt(0).toUpperCase()}
            </Header>

            <Card.Content>
                <Card.Header><Link to={props.detailUrl}>{fullName}</Link></Card.Header>
                <Card.Meta>{props.group}</Card.Meta>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Grid.Column floated='left'>
                    <Icon name='address book outline' circular />{props.countOfAddress} Address
                </Grid.Column>

                <Grid.Column floated='right'>
                    <Link to={props.editUrl}><Icon link name='edit' color='green' circular /></Link>
                    <Link onClick={e => {
                        e.preventDefault();
                        deleteContactMutation({ variables: { contactId: props.id } });
                    }}>
                        <Icon link name='delete' color='red' circular />
                    </Link>
                </Grid.Column>
            </Card.Content>
        </Card>
    );
}
