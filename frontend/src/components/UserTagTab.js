import React, {useEffect, useState}from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function UserTagsTab({userId})
{
    const navigate = useNavigate();
    const [tagsResponse, SetTagResponse] = useState([]);
    const [length, SetLength] = useState(0);

    const params={};
    params.tab = 'tags';

    const searchForTag = (name) => {
        navigate(`/search?q=user:${userId} [${name}]`)
    }

    const data = {
        id: userId,
      };

      useEffect(() => 
      {
        axios.post(`/api/userActivity`,data,{params})
          .then((response) => 
          {
            SetTagResponse(response.data.data)
            SetLength(response.data.data.length)
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);

    return(
    <div className="tagsTab">
    <UserTagsContainer>
    <div>
        <h1>{length}   Tags</h1>
        <hr></hr>

        
        {
         tagsResponse.map(item => 
           <div>
               
               <p style={{display:"flex", marginLeft:"20px", marginTop:"15px"}}> 
                  <div style={{width:"50px"}}> 
                      <span className="question-tags" onClick={() => searchForTag(item[0])}> { item[0]}  </span>
                  </div> 

                  <div style={{marginLeft:"450px", width:"70px"}}> 
                      <span style={{fontWeight:"bold", fontSize:"23px"}}>{ item[1]}</span>  score
                  </div> 


                  <div style={{marginLeft:"30px"}}> 
                  <span style={{fontWeight:"bold", fontSize:"23px"}}>{ item[2]}</span>  posts
                  </div> 

                   </p>

              <hr></hr>

            </div>

        )}


    </div>
    </UserTagsContainer>
    </div>
    );
}

export default UserTagsTab;

const UserTagsContainer = styled.footer`
.question-tags
  {
      margin : 10px 5px;
      padding: 5px 10px;
      background-color: var(--powder-100);
      border-radius: blue;
      cursor: pointer;
  }

  .question-tags:hover
  {
    color: blue;
    border-radius:3px;
  }

`;