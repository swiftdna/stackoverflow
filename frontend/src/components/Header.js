import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OverlayTrigger, Popover, Button, Row, Col } from 'react-bootstrap';
import { FaList, FaUserAlt, FaHeart, FaStore, FaSearch, FaEnvelope } from 'react-icons/fa';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { selectUser } from '../selectors/appSelector';
import { handleLogoutResponse } from '../actions/app-actions';
import { Link } from "react-router-dom";

//create the Navbar Component
function Navbar() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const userDetails = useSelector(selectUser);
    
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/');
    //     }
    // }, [isAuthenticated])

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }

    const home = () => {
        setSearchText('');
        navigate('/');
    }

    const logout = () => {
        axios.post('/logout')
            .then(response => {
                dispatch(handleLogoutResponse(response));
            });
            navigate('/');
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          const searchKeyword = e.target.value;
          navigate(`/search?q=${searchKeyword}`);
        }
    }

    const popover = (
      <Popover id="popover-basic">
        <Popover.Body>
          <Row>
            <Col xs={6}>
                <p className="search-hint"><span className="hint_type">[tag] </span> search within a tag</p>
                <p className="search-hint"><span className="hint_type">user:1234 </span>  search by author</p>
                <p className="search-hint"><span className="hint_type">"words here"</span> exact phrase </p>
            </Col>
            <Col xs={6}>
                <p className="search-hint"><span className="hint_type">is:question</span> type of post</p>
                <p className="search-hint"><span className="hint_type">isaccepted:yes</span> search within status</p>
            </Col>
          </Row>
        </Popover.Body>
      </Popover>
    );

    return(
    <header>
    <div className="nav-container">
        <nav>
            <div className="nav-brand">
                <div className="hamburger-menu-container">

                    <div className="hamburger-menu">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="nav-dropdown-menu">
                        <a href="#" className="current-link">Home</a>
                        <h5>Public</h5>
                        <ul className="nav-ul">
                            <li className="nav-item">
                                <i className="fas fa-globe-europe"></i>
                                <a href="#" className="nav-link">Stack Overflow</a>
                            </li>
                            <li className="nav-item"><a href="#" className="nav-link">Tags</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Users</a></li>
                        </ul>
                        <h5>Find a Job</h5>
                        <ul className="nav-ul">
                            <li className="nav-item"><a href="#" className="nav-link">Jobs</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Companies</a></li>
                        </ul>
                        <h5>Teams <a href="#" >What's this ?</a></h5>
                        <a href="#" className="nav-link">
                            <i className="fas fa-briefcase"></i>
                            <span>Free 30 Day Trial</span>
                        </a>
                    </div>
                </div>

                <a href onClick={() => home()} className="nav-icon">
                    <i className="fab fa-stack-overflow"></i>
                    <div className="nav-icon-img"></div>
                </a>
            </div>
            {/*
                <div className="nav-base-links">
                    <ul style={{marginTop: '8px', paddingLeft: '0px'}}>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Products</a></li>
                        <li><a href="#">For Teams</a></li>
                    </ul>
                </div>
            */}
            <div className="nav-search">
                <div className="search-container">
                    <FaSearch style={{fontSize: '14px'}} />
                    <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
                        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search..." onKeyDown={_handleKeyDown}/>
                    </OverlayTrigger>
                </div>
            </div>
            <div className="nav-right-buttons">
                <div className="search-btn">
                    <i className="fas fa-search"></i>
                </div>
                
                {isAuthenticated && <Link to={'/userProfile'}><FaUserAlt className="nav-icons" title={userDetails.email} /></Link> }
            
              {
                isAuthenticated ? 
                    <>
                        <Link to={'/messages'}><FaEnvelope className="nav-icons msg" /></Link>
                        <button type="button" className="btn btn-login" title="Log out" onClick={() => logout()}>Logout</button>
                    </> : 
                    <>
                        <button type="button" className="btn btn-login" title="Log In" onClick={() => login()}>login</button>
                        <button type="button" className="btn btn-register" title="Log In" onClick={() => register()}>register</button>
                    </>
            }    
            
        </div>
    </nav>
</div>
</header>
    )
}

export default Navbar;
