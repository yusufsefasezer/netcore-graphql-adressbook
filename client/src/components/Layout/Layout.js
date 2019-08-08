import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import './Layout.css'
import HeaderTop from './HeaderTop/HeaderTop'
import HeaderMenu from './HeaderMenu/HeaderMenu'

export default function Layout(props) {
    return (
        <Container>
            <Segment padded className="wrapper">

                <header>
                    <HeaderTop title="Address book" />
                    <HeaderMenu />
                </header>

                <section>
                    {props.children}
                </section>

            </Segment>
        </Container>
    );
};
