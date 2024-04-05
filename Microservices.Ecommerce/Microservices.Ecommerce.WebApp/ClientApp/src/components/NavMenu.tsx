import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { ApplicationState } from '../store';
import * as AuthStore from '../store/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const isLoggingIn = useSelector((state: ApplicationState) => state.authentication && state.authentication.isLoggingIn);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    if(!isLoggingIn) {
        return null;
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">Microservices.Ecommerce.WebApp</NavbarBrand>
                    <NavbarToggler onClick={toggle} className="mr-2"/>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                            </NavItem>
                            <NavItem>
                            {isLoggingIn ? (
                                <Button color="primary" onClick={() => dispatch(AuthStore.authActionCreators.logout())}>
                                Logout
                            </Button>
                            ) : (
                                <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                            )}
                        </NavItem>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default NavMenu;