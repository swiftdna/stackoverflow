import React, {useEffect, useState}from "react";
import styled from "styled-components";
import axios from "axios";
import AllQuestions from "./AllQuestions";

function UserBookmarksTab({userId})
{
    const [bookmarkResponse, SetBookmarkResponse] = useState();
    const [length, SetLength] = useState(0);

    const params={};
    params.tab = 'bookmarks';

    const data = {
        id: userId,
      };

      useEffect(() => 
      {
        axios.post(`/api/userActivity`,data,{params})
          .then((response) => 
          {
            SetBookmarkResponse(response.data.data)
            SetLength(response.data.data.length)
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);

    return(
    <div className="bookmarksTab">
    <UserTagsContainer>

    <div>
        <h1>{length}   Bookmarks</h1>
        <hr></hr>
        
        <div>
            
             {bookmarkResponse && bookmarkResponse.map(questionItem => <AllQuestions data={questionItem} 
                                             isAuthorRequired={false} questionId={questionItem.id}/>)}
        </div>

    </div>

    </UserTagsContainer>
    </div>
    );
}

export default UserBookmarksTab;

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