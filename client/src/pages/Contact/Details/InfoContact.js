import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'

export default function InfoContact(props) {
    return (
        <Grid celled='internally' stackable columns='three'>
        <Grid.Row>
            <Grid.Column>
                <Icon name='phone' size='big' /> {props.phoneNumber}
            </Grid.Column>
            <Grid.Column>
                <Icon name='envelope outline' size='big' /> {props.email}
            </Grid.Column>
            <Grid.Column>
                <Icon name='linkify' size='big' /> {props.webAddress}
            </Grid.Column>
        </Grid.Row>
    </Grid>
    );
};
