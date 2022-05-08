import React, {useEffect} from 'react';
import styled from "styled-components";
import search from "./Images/search.png";
import { useNavigate } from "react-router-dom";
import { TagItem } from './TagItem';


export function Tags() {
    const navigate = useNavigate();

    return(
        <>
        <div
        className="container"
        style={{ marginTop: "80px", border: "1px solid red;" }}
        >
        <h4>Welcome home!</h4>

        <p onClick={() => navigate("/questions/315135")}>click here</p>
        <p onClick={() => navigate("/questions/ask")}>Ask Question</p>
        <h4 onClick={() => navigate("/")}>All Questions</h4>
        <h4 onClick={() => navigate("/tags")}>Tags</h4>
        <h4 onClick={() => navigate("/users")}>Users</h4>
      </div>

    <TagsContainer>

       <div style={{marginTop:"-150px"}}>
          <h1>
             Tags
          </h1>
       </div>

       <div>
           <p> A tag is a keyword or label that categorizes your question with other, similar questions. <br/>
               Using the right tags makes it easier for others to find and answer your question.</p>
       </div>

       <div>
         <input type="text" placeholder="Search.." className="search"/>
         <button type="submit"><img width={50} height={47} src={search}/></button>
       </div>

       <div className="tags-container">
            <TagItem/>
            <TagItem/>
            <TagItem/>
            <TagItem/>
            <TagItem/>
            <TagItem/>
            <TagItem/>
            <TagItem/>

       </div>

    </TagsContainer>
    </>

    )
}
export default Tags;

const TagsContainer = styled.footer`
*
{
   margin-left: 150px;
}

p{
    font-size: 15px;
}

.search
{
    width : 300px;
    height: 50px;
    padding-left: 10px;
}

img{
    border-radius: 6px;
}

button
{
    margin-left: -201px;
    height: 30px;
    background-color: white;
    border: none;
    background: none;
    border-radius: 25px;
}

.tags-container
{
    border-style: none;
    margin-top: 20px;
    margin-left: 140px;
    width: 90%;
    overflow: hidden;
}

`;