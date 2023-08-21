import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import './HeaderMenu.css'

export default function HeaderMenu() {
    return (
        <Menu secondary className="header-menu">

            <NavLink to="/" className={'item'}>Home</NavLink>
            <NavLink to="/about" className={'item'}>About</NavLink>
            <NavLink to="/404" className={'item'}>404</NavLink>

            <Menu.Menu position='right'>
                <NavLink to="/contact/add" className={'item'}>
                    <i className="icon plus square red"></i> Add New
                </NavLink>
            </Menu.Menu>

        </Menu>
    );
}
