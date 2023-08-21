import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import './Layout.css'
import HeaderTop from './HeaderTop/HeaderTop'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <Container>
            <Segment padded className="wrapper">

                <header>
                    <HeaderTop title="Address book" />
                    <HeaderMenu />
                </header>

                <section>
                    <Outlet />
                </section>

            </Segment>
        </Container>
    );
}
