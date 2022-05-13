import React, {useEffect, useState}from "react";
import styled from "styled-components";
import axios from "axios";
import AllQuestions from "./AllQuestions";
import { useNavigate } from 'react-router-dom';

function UserReputationTab({userId})
{
    const navigate = useNavigate();
    const [reputationResponse, SetReputationResponse] = useState([]);
    const [length, SetLength] = useState(0);

    const params={};
    params.tab = 'reputation';

    let green = "green-text";
    let red= "red-text";

    const data = {
        id: userId,
      };

      useEffect(() => 
      {
        axios.post(`/api/userActivity`,data,{params})
          .then((response) => 
          {
            SetReputationResponse(response.data.data)
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);

      const openQuestion = (id) => {
        navigate(`/questions/${id}`);
      }

    return( <div className="questionTab">
    <UserReputationTabContainer>
    <div className="questionTabSize">
        <h1>   Reputation </h1>
        <hr></hr>

        {
         reputationResponse && reputationResponse.map(item => 
           <div>
               
               <p style={{display:"flex", marginLeft:"10px", marginTop:"15px"}}> 
                  <div style={{width:"50px"}}> 

                      <span className={ (item.reputation > 0) ? green: red}> { item.reputation}  </span>
                  </div> 

                  <div style={{marginLeft:"20px", width:"800px"}}> 

                      <a href onClick={() => openQuestion(item._id)} title={item.title} 
                 style={{fontWeight:"bold"}}className="question-hyperlink">{item.title}</a>

                  </div> 

                   </p>

              <hr></hr>

            </div>

        )}
    </div>

    <div>

  
    </div>
    </UserReputationTabContainer>
    </div>
    );
}

export default UserReputationTab;

const UserReputationTabContainer = styled.footer`

.red-text
{
    color: red;
    font-weight: bold;
}

.green-text
{
    color: green;
    font-weight: bold;
}

`;