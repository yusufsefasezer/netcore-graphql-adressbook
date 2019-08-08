import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import './HeaderMenu.css'

export default function HeaderMenu() {
    return (
        <Menu secondary className="header-menu">

            <NavLink to="/" className={'item'} exact>Home</NavLink>
            <NavLink to="/about" className={'item'} exact>About</NavLink>
            <NavLink to="/404" className={'item'} exact>404</NavLink>

            <Menu.Menu position='right'>
                <NavLink to="/contact/add" className={'item'} exact>
                    <i className="icon plus square red"></i> Add New
                </NavLink>
            </Menu.Menu>

        </Menu>
    );
};
