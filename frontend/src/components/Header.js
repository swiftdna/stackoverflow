import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaList, FaUserAlt, FaHeart, FaStore } from 'react-icons/fa';
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

    // const favourites = () => {
    //     navigate('/favourites');
    // }

    // const profile = () => {
    //     navigate('/profile');
    // }

    // const cart = () => {
    //     navigate('/cart');
    // }

    // const purchases = () => {
    //     navigate('./purchases');
    // };

    // const shop = () => {
    //     navigate('./shop');
    // }

    const logout = () => {
        axios.post('/logout')
            .then(response => {
                dispatch(handleLogoutResponse(response));
            });
    }

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

            <a href="#" className="nav-icon">
                <i className="fab fa-stack-overflow"></i>
                <div className="nav-icon-img"></div>
            </a>
        </div>
        <div className="nav-base-links">
            <ul style={{marginTop: '8px', paddingLeft: '0px'}}>
                <li><a href="#">About</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">For Teams</a></li>
            </ul>
        </div>
        <div className="nav-search">
            <div className="search-container">
                <i className="fas fa-search"></i>
                <input type="text" id="" placeholder="Search..." />
            </div>
            <div className="search-hints">
                <div className="search-arrow-up"></div>
                <div className="search-hint-body">
                    <div className="hints-grid-column">
                        <div className="hint-text"><span>[tag] </span> search within a tag</div>
                        <div className="hint-text"><span>user:1234 </span>  search by author</div>
                        <div className="hint-text"><span>"words here"</span> exact phrase </div>
                    </div>
                    <div className="hints-grid-column">
                        <div className="hint-text"><span>answers:0</span> unanswered questions</div>
                        <div className="hint-text"><span> score:3  </span> posts with a 3+ score</div>
                        <div className="hint-text"><span>isaccepted:yes </span> search within status</div>
                    </div>
                </div>
                <div className="search-hint-footer">
                    <a href="#" className="btn">Ask a question</a>
                    <a href="#" className="search-help">Search help</a>
                </div>
            </div>

        </div>
        <div className="nav-right-buttons">
            <div className="search-btn">
                <i className="fas fa-search"></i>
            </div>


            <a href="#" className="btn btn-login">Log in</a>
            <a href="#" className="btn btn-register">Sign up</a>
        </div>
    </nav>
</div>
</header>
    )
}

export default Navbar;