import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import search from "./Images/search.png";
import { useNavigate } from "react-router-dom";
import { UserItem } from './UserItem';
import axios from 'axios';

export function Users() {

    const [usersResponse, SetUsersResponse] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/getUserDetails?search=`)
    .then(response => {
        SetUsersResponse(response.data.data);
    })
    .catch(err => {
    });
}, []);

    return(
        <>
        <div
        className="container"
        style={{ marginTop: "80px", border: "1px solid red;" }}
        >
        <h4>Welcome home!</h4>

        <p onClick={() => navigate("/questions/315135")}>click here</p>
        <p onClick={() => navigate("/questions/ask")}>Ask Question</p>
        <h4 onClick={() => navigate("/")}>All Questions</h4>
        <h4 onClick={() => navigate("/tags")}>Tags</h4>
        <h4 onClick={() => navigate("/Users")}>Users</h4>

      </div>

    <UsersContainer>

       <div style={{marginTop:"-150px"}}>
          <h1>
             Users
          </h1>
       </div>

       <div>
         <input type="text" placeholder="Search.." className="search"/>
         <button type="submit"><img width={50} height={47} src={search}/></button>
       </div>

       <div className="tags-container">
       {usersResponse && usersResponse.map(userItem => <UserItem data={userItem} />)}
       </div>

    </UsersContainer>
    </>

    )
}
export default Users;

const UsersContainer = styled.footer`
*
{
   margin-left: 150px;
}

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
    margin-left: 140px;
    width: 90%;
    overflow: hidden;
}

`;