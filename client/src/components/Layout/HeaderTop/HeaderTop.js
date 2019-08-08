import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header } from 'semantic-ui-react'

export default function HeaderTop(props) {
    return (
        <Grid doubling>
            <Grid.Row columns='four'>

                <Grid.Column floated='left'>
                    <Link to="/">
                        <Header as='h1' color='teal'>{props.title}</Header>
                    </Link>
                </Grid.Column>

                <Grid.Column floated='right'>
                    <div className="ui search">
                        <div className="ui icon input">
                            <input className="prompt" type="text" placeholder="Who are you looking for?" />
                            <i className="search icon"></i>
                        </div>
                        <div className="results"></div>
                    </div>
                </Grid.Column>

            </Grid.Row>
        </Grid>
    );
};
