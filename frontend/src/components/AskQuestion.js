import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { createReactEditorJS } from "react-editor-js";

import { EDITOR_JS_TOOLS } from "../constants/editortools";

const ReactEditorJS = createReactEditorJS();

//Create a AskQuestion Component
export function AskQuestion() {

    const [blocks, setBlocks] = useState({
      time: 1635603431943,
      blocks: []
    });

    const onEditorChange = async (api) => {
        // console.log(event);
        // console.log(event.target);
        const body = await api.saver.save();
        // console.log(body);
        setBlocks({
            ...blocks,
            blocks: body
        })
    }

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <h2>Ask a public question</h2>
            <div className="ask_question_box">
                <p className="heading">Title</p>
                <p className="hint">Be specific and imagine you’re asking a question to another person</p>
                <input placeholder="e.g. Is there an R function for finding the index of an element in a vector?" />

                <p className="heading">Body</p>
                <p className="hint">Include all the information someone would need to answer your question</p>
                <div className="body_editor">
                    <ReactEditorJS
                        tools={EDITOR_JS_TOOLS}
                        defaultValue={blocks}
                        onChange={onEditorChange}
                      />
                </div>

                <p className="heading">Tags</p>
                <p className="hint">Add up to 5 tags to describe what your question is about</p>
                <input placeholder="e.g. (ios vba django)" />

                <button className="btn btn-register" onClick={()=> console.log(blocks)}>Submit</button>
            </div>
        </div>
    )
}
//Export The AskQuestion Component
export default AskQuestion;