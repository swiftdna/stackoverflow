import React, {useState, useEffect} from "react";
import axios from "axios";
import gLogo from "./Images/user4.png";
import styled from "styled-components";

function UserEditProfile()
{
    const [location, SetLocation] = useState("");
    const [about, SetAboutMe] = useState("");
    const [profilePhoto, SetProfilePhoto] = useState("");

    const data = {
      profilePhoto,
      location,
      about
    };


    const imageChangeHandler = (e) => {
      const inputValue = e.target.files[0];
      SetProfilePhoto(uploadImageToCloud(inputValue));
    };

    const locationChangeHandler = (e) => {
      const inputValue = e.target.value;
      SetLocation(inputValue);
    };

    
    const aboutChangeHandler = (e) => {
      const inputValue = e.target.value;
      SetAboutMe(inputValue);
    };
  
    function uploadImageToCloud( file)
    {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('cloud_name', 'dac0hzhv5')
      formData.append('upload_preset', 'j8gp4zov')
  
      return axios.post(
        'https://api.cloudinary.com/v1_1/dac0hzhv5/image/upload',
        formData
      );
    }

    console.log("-------sunny----------");
    console.log(profilePhoto);
    console.log("-----------------------")

const onSubmit=()=>
{
  axios.put(`/api/editUserDetails`, data)
    .then(response => {
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
                <input id="file" type="file" 
                onChange={ (event) => {
                  imageChangeHandler(event);
                 }}
                 />
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