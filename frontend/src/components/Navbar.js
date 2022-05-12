import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaList, FaUserAlt, FaEnvelope } from 'react-icons/fa';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { handleLogoutResponse } from '../actions/app-actions';

//create the Navbar Component
function Navbar() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    // const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated])

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }

    const home = () => {
        navigate('/');
    }

    const logout = () => {
        axios.post('/logout')
            .then(response => {
                dispatch(handleLogoutResponse(response));
            });
    }

    return(
        <nav className="navbar navbar-light bg-light justify-content-between">
            <div className="container">
                <div className="col-1">
                    <a className="" href onClick={() => home()}>Stack Overflow</a>
                </div>
                <div className="col-9">
                    <input style={{display: 'inline', width: '91%', borderTopRightRadius: 0, borderBottomRightRadius: 0}} className="form-control mr-sm-2" type="search" placeholder="Enter search text" aria-label="Search" />
                    <Button style={{display: 'inline', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginTop: '-4px'}} variant="warning">Search</Button>
                </div>
                <div className="col-2 center-contents">
                    {
                        isAuthenticated ? 
                        <button type="button" className="btn btn-light nav-buttons" title="Log out" onClick={() => logout()}>Logout</button> : 
                        <>
                            <button type="button" className="btn btn-light nav-buttons" title="Log In" onClick={() => login()}>login</button>
                            <button type="button" className="btn btn-light nav-buttons" title="Log In" onClick={() => register()}>register</button>
                        </>
                    }
                    {
                        isAuthenticated && (
                            <>
                                <FaEnvelope className="nav-buttons" title="Messages" size="3em" />
                                <FaUserAlt className="nav-buttons" title="Profile" size="3em" />
                            </>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;