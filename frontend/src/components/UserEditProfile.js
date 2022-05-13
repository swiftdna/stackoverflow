import React, {useState, useEffect} from "react";
import axios from "axios";
import gLogo from "./Images/user4.png";
import styled from "styled-components";

function UserEditProfile()
{
    const [location, SetLocation] = useState("");
    const [about, SetAboutMe] = useState("");
    const [profilePic, SetProfilePic]=useState("");

    const data = {
      location,
      about
    };


    const locationChangeHandler = (e) => {
      const inputValue = e.target.value;
      SetLocation(inputValue);
    };

    
    const aboutChangeHandler = (e) => {
      const inputValue = e.target.value;
      SetAboutMe(inputValue);
    };
  

const onSubmit=()=>
{

  alert(data.location);
  alert(data.about);

  axios.put(`/api/editUserDetails`, data)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
        console.log(err.message);
    });

}
    
    return(
        <>
        <UserEditContainer>
        
         <div>
             <h1>Edit Your Profile</h1>

             <div  style={{marginTop:"15px"}}>
             <div className="profile-pic">
                <img src={gLogo} id="output" width="200" />
                <br/>
                
                <div style={{marginTop:"8px"}}>
                <input id="file" type="file" onchange="loadFile(event)"/>
                </div>

                 </div>
             </div>

             <div style={{marginTop:"20px"}}>
             <label  style={{fontWeight:"bold", fontSize:"16px"}} for="fname">Display name</label><br/>
               <input  style={{width:"400px", height:"35px"}} type="text" id="fname" name="fname"
               disabled />
             </div>

             <div style={{marginTop:"20px"}} >
             <label  style={{fontWeight:"bold",  fontSize:"16px"}} for="location">Location</label><br/>
               <input style={{width:"400px", height:"35px"}} type="text" id="location" name="location"
                onChange={(event) => {
                  locationChangeHandler(event);
                }} />
             </div>
         

            <div style={{marginTop:"20px"}} >
               <label style={{fontWeight:"bold",  fontSize:"16px"}} for="aboutme">About me</label><br/>
               <textarea style={{width:"400px", height:"150px"}}id="w3review" name="w3review" rows="4" cols="50"
                    onChange={(event) => {
                      aboutChangeHandler(event);
                    }} >
                       </textarea>
            </div>

            <div style={{marginTop:"20px", marginLeft:"20px", width:"100px", height:"100px"}} >
                <button style={{height:"40px", paddingBottom:"10px", color:"white",
                        fontWeight:"bold", backgroundColor:"var(--orange)"}}
                        onClick={() => onSubmit()}
                         >submit</button>
            </div>

         </div>

         </UserEditContainer> 

         </>
    )

}

export default UserEditProfile;
const UserEditContainer = styled.footer`

`;