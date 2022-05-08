 import React from "react";
 import styled from "styled-components";
 import gLogo from "./Images/user4.png";

function UserProfileTab()
 {
    return(
        <UserProfileTabContainer>
        <div className="userProfileTabs">
            
            <div>
               <h2>Stats</h2>
                <div className="stats-tab">
                    <div className="user-reputation">
                        <p>1</p>
                        <p>reputation</p>
                    </div>

                    <div className="user-reached">
                        <p>0</p>
                        <p>reached</p>
                    </div>

                    <div className="user-answers">
                        <p>0</p>
                        <p>answers</p>
                    </div>

                    <div className="user-questions">
                        <p>0</p>
                        <p>questions</p>
                    </div>
                  
                </div>
            </div>

            <div className="aboutMeTab">

                   <h2>About Me</h2>
                   <div className="aboutMe">
                   
                   </div>
            
            </div>

           < div className="badges-tab">
               <h2>Badges</h2>
               <div className="badges-inner-tab">
                 <div className="badges-gold-tab">
                    
                 </div>

                 <div className="badges-silver-tab">
                    
                 </div>

                 <div className="badges-bronze-tab">
                    
                 </div>
             </div>
            </div>

        </div>
        </UserProfileTabContainer>
    )
 }

 export default UserProfileTab;


 const UserProfileTabContainer = styled.footer`

 .stats-tab
 {
    width: 190px;
    height: 160px;
    border-style: solid;
    border-color: #888888;
    border-radius: 10px;
 }

.user-reputation
{
    margin-left: 10px;
    margin-top: 5px;
}

 .user-reached
 {
    margin-left: 120px;
    margin-top: -61px;
 }

 .user-answers
 {
    margin : 8px;
    margin-top: 50px;
    width: 70px;
 }

.user-questions
{
    margin-left: 120px;
    margin-top: -60px;
}
.badges-tab
{
   margin-top: 15px;
}

.badges-tab
{
    width: 2000px;
}

.badges-inner-tab
{
    display: flex;
}

.badges-gold-tab,
.badges-silver-tab,
.badges-bronze-tab
{
    width: 270px;
    height: 162px;
    border-style: solid;
    border-color: #888888;
    border-radius: 10px;
}

.badges-silver-tab
{
    margin-left: 20px;
}

.badges-bronze-tab
{
    margin-left: 20px;
}

.aboutMeTab
{
    margin-left: 200px;
    margin-top: -190px;
}

.aboutMe
{
    border-style: solid;
    border-color: #888888;
    border-radius: 10px;
    width: 650px;
    height: 162px;
    background-color: 	#E0E0E0;
}

`;