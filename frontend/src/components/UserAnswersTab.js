import React, {useEffect, useState}from "react";
import styled from "styled-components";
import axios from "axios";
import AllQuestions from "./AllQuestions";

function UserAnswersTab({userId})
{
    const [answersResponse, SetAnswersResponse] = useState();
    const [answersLength, SetAnswersLength] = useState(0);

    const params={};
    params.tab = 'answers';

    const data = {
        id: userId,
      };

      useEffect(() => 
      {
        axios.post(`/api/userActivity`,data,{params})
          .then((response) => 
          {
            SetAnswersResponse(response.data.data)
            SetAnswersLength(response.data.data.length)
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);


    return(
    <div className="questionTab">
    <UserAnswersTabContainer>
    <div>
        <h1>{answersLength}   Answers</h1>
        <hr></hr>
    </div>

    <div>

    { answersResponse && answersResponse.map(answerItem => <AllQuestions data={answerItem} 
                                             isAuthorRequired={false} questionId={answerItem._id}/>)}
    </div>
    </UserAnswersTabContainer>
    </div>
    );
}

export default UserAnswersTab;

const UserAnswersTabContainer = styled.footer`

`;