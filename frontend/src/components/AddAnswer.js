import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { createReactEditorJS } from "react-editor-js";

import { EDITOR_JS_TOOLS } from "../constants/editortools";
import { postQuestion } from "../utils";

const ReactEditorJS = createReactEditorJS();

//Create a AskQuestion Component
export function AddAnswer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [answerForm, setAnswerForm] = useState({
        title: '',
        text: {
          blocks: []
        },
        tags: ''
    });

    const onEditorChange = async (api) => {
        // console.log(event);
        // console.log(event.target);
        const body = await api.saver.save();
        setAnswerForm({
            ...answerForm,
            text: {
                blocks: body
            }
        })
    }

    const submitAnswer = () => {
        console.log(answerForm);
        // postQuestion(dispatch, questionForm, (err, successFlag) => {
        //     console.log(successFlag);
        //     if (successFlag) {
        //         navigate('/');
        //     }
        // });
    };

    return(
        <div className="container" style={{marginTop: '40px'}}>
            <h3 style={{marginBottom: '10px'}}>Your Answer</h3>
            <div className="answer_editor">
                <ReactEditorJS
                    tools={EDITOR_JS_TOOLS}
                    defaultValue={answerForm.blocks}
                    onChange={onEditorChange}
                  />
            </div>
            <button className="btn btn-register" style={{marginBottom: '10px'}} onClick={()=> submitAnswer()}>Post Your Answer</button>
        </div>
    )
}
//Export The AskQuestion Component
export default AddAnswer;