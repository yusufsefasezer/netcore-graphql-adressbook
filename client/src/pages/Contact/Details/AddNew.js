import React from 'react'
import { Segment, Header, Icon } from 'semantic-ui-react'

export default function AddNew() {
    return (
        <Segment placeholder basic>
            <Header icon>
                <Icon name='address book' /> No address are listed for this contact.
            </Header>
        </Segment>
    );
}
