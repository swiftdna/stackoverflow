import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import search from "./Images/search.png";
import { useNavigate } from "react-router-dom";
import { UserItem } from './UserItem';
import Sidebar from './Sidebar';
import { FaSearch } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

export function Users() {

    const [usersResponse, SetUsersResponse] = useState([]);
    const navigate = useNavigate();
    const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    axios.get(`/api/getUserDetails?search=`)
    .then(response => {
        SetUsersResponse(response.data.data);
    })
    .catch(err => {
    });
}, []);

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
                <UsersContainer>
                    <h1>Users</h1>

                   <div>
                     
                     <div className="search-container" style={{width: '250px'}}>
                        <FaSearch style={{fontSize: '14px'}} />
                        <input type="text" 
                               placeholder="Filter by user"
                               onChange={(e) => setSearchTitle(e.target.value)}
                        />
                     </div>

                   </div>

                   <div className="tags-container">

        {usersResponse && usersResponse.filter((value) => 
          {
            if (searchTitle === "") 
            {
              return  value;
            } 
            else if (  value.username && (value.username.toLowerCase().includes(searchTitle.toLowerCase())) )  
            {
              return value;
            }
          })
          .map((userItem) => <UserItem data={userItem} />)}

                   </div>
                </UsersContainer>
            </Col>
            </Row>
        </div>
    )
}
export default Users;

const UsersContainer = styled.footer`

p{
    font-size: 15px;
}

.search
{
    width : 300px;
    height: 50px;
    padding-left: 10px;
}

img{
    border-radius: 6px;
}

button
{
    margin-left: -201px;
    height: 30px;
    background-color: white;
    border: none;
    background: none;
    border-radius: 25px;
}

.tags-container
{
    border-style: none;
    margin-top: 20px;
    width: 90%;
    overflow: hidden;
}

`;
