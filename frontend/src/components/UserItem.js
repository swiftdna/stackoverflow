import React from "react";
import styled from "styled-components";
import gLogo from "./Images/user4.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export function UserItem({data})
{
    const navigate = useNavigate();

    const openUser = (id) => {
        navigate(`/userProfile/${id}/${data.email}`);
      }

     return(
         <UserContainer>

           <div className="user-item-container">

            <div className="user-image">
               <img src={data.profilePhoto} width={60} height={60}/>     
            </div>

        <div className="user-info">
            
            <div className="user-name">
                
                <a href onClick={() => openUser(data.id)} 
                    style={{fontWeight:"bold", color:"hsl(206deg 100% 40%)"}} >{data.username}</a>
            </div>

            <div>
                {data.Reputation}
            </div>

            <div>
                {data.location}
            </div>

        </div>


           </div>

         </UserContainer>
     )
}

export default UserItem;

const UserContainer = styled.footer`
.user-item-container
{
    width: 250px;
    height: 90px;
    float:left;
    margin :5px 0px 5px 10px; 
    border-radius: 5px
}

.user-image
{
}

.user-info
{
    margin-left: 60px;
    margin-top: -60px;
    font-weight: bold;
    color: #505050;
    font-size: 12px;
}
.user-name
{
    margin-left: 0px;
}

`;