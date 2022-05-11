import React, {useEffect, useState}from "react";
import styled from "styled-components";
import axios from "axios";

function UserBadgesTab({userId})
{
    const [userBadges, SetBadges] = useState([]);
    const [length, SetLength] = useState(0);

    useEffect(() => 
    {
      axios.get(`/api/badges/getAllbadges/${userId}`)
        .then((response) =>{
          SetBadges(response.data.data)
          SetLength(response.data.data.length)
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);

    
    return(
        <div>
        <h1>{length}   Badges</h1>
        <hr></hr>
        
        <div style={{display:"flex",  flexFlow: "row wrap"}}>             
        {
                      userBadges.map(function(element){
                          return <div style={{ marginLeft:"20px", backgroundColor: "black", color: "white",
                                               marginTop: "5px", paddingLeft: "20px", width: "150px", fontSize:"13px",
                                               height:"35px", borderRadius: "5px",paddingTop: "8px"}}>
                                 {element.badgeName}
                                 </div>
                    })}

        </div>
        </div>
    )
}

export default UserBadgesTab;