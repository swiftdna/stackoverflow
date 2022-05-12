import React from "react";
import styled from "styled-components";

export function TagItem({data})
{
     return(
         <TagsContainer>

           <div className="tag-item-container">

            <div>
               <span className="tags-name"> {data.tagName} </span>       
            </div>

            <div>
               <p className="tags-desc"> 
                  {data.tagDescription}
              </p>       
            </div>

            <div>
               <span className="tags-qstns"> {data.tagQuestionsAsked} questions </span>
               <span className="tags-time-stamp">asked 2 months ago</span>

            </div>

           </div>

         </TagsContainer>
     )
}

export default TagItem;

const TagsContainer = styled.footer`
.tag-item-container
{
    border: 1px solid #DEDEDE;
    width: 310px;
    height: 150px;
    float:left;
    margin :5px 0px 5px 10px; 
    border-radius: 5px;
    padding: 10px
}

.tags-name
{
    color: #4e8bed;
    background-color: var(--powder-100);
    padding: 7px;
    font-size: 12px;
    margin-top: 5px;
    display:inline-block;
    border-radius: 4px
}

.tags-desc
{
    font-size: 12px;
    margin-top: 8px;
    color: black;
    margin-right: 2px;
}

.truncate {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.tags-qstns
{
    color: #505050;
}

.tags-time-stamp
{
    float: right;
    color: #505050;
}

`;
