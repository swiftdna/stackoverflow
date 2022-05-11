import React, {useEffect, useState}from "react";
import styled from "styled-components";
import axios from "axios";
import AllQuestions from "./AllQuestions";

function UserQuestionTab({userId})
{
    const [questionsResponse, SetQuestionsResponse] = useState();
    const [length, SetLength] = useState(0);

    const params={};
    params.tab = 'questions';

    const data = {
        id: userId,
      };

      useEffect(() => 
      {
        axios.post(`/api/userActivity`,data,{params})
          .then((response) => 
          {
              SetQuestionsResponse(response.data.data)
              SetLength(response.data.data.length)
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);


      console.log("sunny"+ questionsResponse )

    return( <div className="questionTab">
    <UserQuestionTabContainer>
    <div className="questionTabSize">
        <h1>{length}   Questions</h1>
        <hr></hr>
    </div>

    <div>

    {questionsResponse && questionsResponse.map(questionItem => <AllQuestions data={questionItem} 
                                             isAuthorRequired={false} questionId={questionItem.id}/>)}
    </div>
    </UserQuestionTabContainer>
    </div>
    );
}

export default UserQuestionTab;

const UserQuestionTabContainer = styled.footer`

`;