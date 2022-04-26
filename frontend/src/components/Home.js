import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { selectIsLoggedIn } from '../selectors/appSelector';

//create the Navbar Component
function Home() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <h4>Welcome home!</h4>

            <p onClick={() => navigate('/questions/315135')}>click here</p>
            <p onClick={() => navigate('/questions/ask')}>Ask Question</p>
        </div>
    )
}

export default Home;