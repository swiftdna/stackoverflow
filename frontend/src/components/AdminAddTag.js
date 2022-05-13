import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createReactEditorJS } from "react-editor-js";
import axios from "axios";

export function AdminAddTag() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tagName, SetTagName] = useState("");
    const [tagDescription, SetTagDesc] = useState("");
    const [tagScore, SetTagScore] = useState(0);
    const [tagQuestionsAsked, SetTagQuestionsAsked] = useState(0);

    const SubmitTag =()=>
    {
        const data = {
            tagName,
            tagDescription,
            tagQuestionsAsked,
            tagScore
          };

          axios.post(`/api/tags/addTag`, data)
          .then(response => 
            {
                 console.log(response.data.data)
            })
          .catch(err => {
          });
     
    }

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <h2>Add a Tag</h2>
            <div className="ask_question_box">
                <p className="heading">Title</p>
                <p className="hint">Add a meaning Tag, which helps user while adding questions</p>
              
                <input type="text"
                    onChange={(event) => 
                    {
                        SetTagName(event.target.value);
                    }}
                />

                <p className="heading">Body</p>
                <p className="hint">Include all the description which helps someone while including the tag</p>
              
                <input type="text" className="tagDesc"
                    onChange={(event) => 
                      {
                        SetTagDesc(event.target.value);
                      }}
                />


                <button className="btn btn-register" 
                         onClick={ () => SubmitTag() } >Submit</button>
            </div>
        </div>
    )
}

export default AdminAddTag;
