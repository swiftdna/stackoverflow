import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import search from "./Images/search.png";
import { useNavigate } from "react-router-dom";
import { TagItem } from './TagItem';
import Sidebar from './Sidebar';
import { FaSearch } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

export function Tags() {
    const navigate = useNavigate();
    const [allTags, SetAllTags] = useState([]);
    const [length, SetLength] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
       axios.get(`/api/tags/getAllTags`)
       .then(response => 
        {
           SetAllTags(response.data.data);
           SetLength(response.data.data.length);
        })
       .catch(err => {
      });
     }, []);

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
                <TagsContainer>
                    <h1>Tags</h1>
                    <div>
                       <p> A tag is a keyword or label that categorizes your question with other, similar questions. <br/>
                           Using the right tags makes it easier for others to find and answer your question.</p>
                    </div>
                    <div className="search-container" style={{width: '250px', marginTop: '10px'}}>
                        <FaSearch style={{fontSize: '14px'}} />
                        <input type="text" placeholder="Filter by tags"
                                onChange={(e) => setSearchTitle(e.target.value)}
                        />
                        
                    </div>

                   <div className="tags-container">

          {allTags.filter((value) => 
           {
             if (searchTitle === "") 
             {
               return  value;
             } 
             else if (  value.tagName && (value.tagName.toLowerCase().includes(searchTitle.toLowerCase())) )  
             {
               return value;
             }
           })
          .map((userItem) => <TagItem data={userItem} />)}

                   </div>

                </TagsContainer>
                </Col>
            </Row>
        </div>
    )
}
export default Tags;

const TagsContainer = styled.footer`

p{
    font-size: 15px;
}

.search {
    width : 300px;
    height: 50px;
    padding-left: 10px;
}

.tags-container {
    margin-left: -10px;
    border-style: none;
    margin-top: 20px;
    overflow: hidden;
}

`;
