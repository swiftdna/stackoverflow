import React from "react";
import styled from "styled-components";
import gLogo from "./Images/user4.png";
import { Link } from "react-router-dom";


export function UserItem()
{
     return(
         <UserContainer>

           <div className="user-item-container">

            <div className="user-image">
               <img src={gLogo} width={60} height={60}/>     
            </div>

        <div className="user-info">
            
            <div className="user-name">
                 <Link to="">
                    Sunny 
                </Link>
            </div>

            <div>
                5100
            </div>

            <div>
                Hyderabad, Telangana
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
    margin-left: -140px;
    margin-top: 15px;
}

.user-info
{
    margin-left: -70px;
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