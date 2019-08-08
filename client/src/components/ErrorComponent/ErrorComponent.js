import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

export default function ErrorComponent(props) {
    return (
        <Segment textAlign='center' basic>
            <Header as='h2' color='red'>{props.title}</Header>
            <p>{props.children}</p>
        </Segment>
    );
};
