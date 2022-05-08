import React from "react";
import styled from "styled-components";

export function TagItem()
{
     return(
         <TagsContainer>

           <div className="tag-item-container">

            <div>
               <span className="tags-name"> react </span>       
            </div>

            <div>
               <p className="tags-desc"> 
               Java is a high-level object oriented programming language. 
               Use this tag when you&#39;re having problems using or understanding the language itself. 
               This tag is frequently used alongside other...
              </p>       
            </div>

            <div>
               <span className="tags-qstns"> 3 questions </span>
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
    border-style: solid;
    border-color: grey;
    width: 310px;
    height: 160px;
    float:left;
    margin :5px 0px 5px 10px; 
    border-radius: 5px
}

.tags-name
{
    color: #4e8bed;
    background-color: var(--powder-100);
    margin-left: -140px;
    padding: 7px;
    font-size: 12px;
    margin-top: 5px;
    display:inline-block;
    border-radius: 4px
}

.tags-desc
{
    margin-left: -140px;
    font-size: 12px;
    margin-top: 8px;
    color: black;
    margin-right: 2px;
}

.tags-qstns
{
    margin-left: -140px;
    color: #505050;
}

.tags-time-stamp
{
    margin-left: 120px;
    color: #505050;
}

`;