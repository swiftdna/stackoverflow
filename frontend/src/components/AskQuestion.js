import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { createReactEditorJS } from "react-editor-js";
import { Form } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import { EDITOR_JS_TOOLS } from "../constants/editortools";
import { postQuestion, fetchAllTags } from "../utils";
import { setToast } from "../actions/app-actions";
import gLogo from "./Images/g.png";

const ReactEditorJS = createReactEditorJS();

//Create a AskQuestion Component
export function AskQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [questionForm, setQuestionForm] = useState({
        title: '',
        text: {
          blocks: []
        },
        tags: []
    });
    const [options, setOptions] = useState([]);
    const [title, setTitle] = useState('');
    const [multiSelections, setMultiSelections] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const tags = await fetchAllTags();
            setOptions(tags)
        }
        fetchData();
    }, []);

    const onEditorChange = async (api) => {
        const body = await api.saver.save();
        setQuestionForm({
            ...questionForm,
            text: {
                blocks: body
            }
        })
    }

    const onInputChange = (e) => {
        setTitle(e.target.value);
    };

    const submitQuestion = () => {
        if (multiSelections && multiSelections.length > 5) {
            dispatch(setToast({
                type: 'Error',
                message: 'You can select only upto 5 tags!'
            }));
            return;
        }
        if (multiSelections) {
            multiSelections.map(selectedTag => {
                if (questionForm.tags && selectedTag.tagName && questionForm.tags.indexOf(selectedTag.tagName) === -1) {
                    questionForm.tags.push(selectedTag.tagName)
                }
            });
        }
        questionForm.title = title;
        if (questionForm.text && questionForm.text.blocks && questionForm.text.blocks.blocks && questionForm.text.blocks.blocks.length) {
            const imageContentArr = questionForm.text.blocks.blocks.filter(block => block.type === 'image');
            if (imageContentArr.length) {
                questionForm.status = 'pending';
            } else {
                questionForm.status = 'approved';
            }
            console.log('imageContentArr => ', imageContentArr);
        }
        postQuestion(dispatch, questionForm, (err, successFlag) => {
            console.log(successFlag);
            if (successFlag) {
                navigate('/');
            }
        });
    };

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <h2>Ask a public question</h2>
            <div className="ask_question_box">
                <p className="heading">Title</p>
                <p className="hint">Be specific and imagine you’re asking a question to another person</p>
                <input id="title" value={title} onChange={onInputChange} placeholder="e.g. Is there an R function for finding the index of an element in a vector?" />

                <p className="heading">Body</p>
                <p className="hint">Include all the information someone would need to answer your question</p>
                <div className="body_editor">
                    <ReactEditorJS
                        tools={EDITOR_JS_TOOLS}
                        defaultValue={questionForm.blocks}
                        onChange={onEditorChange}
                      />
                </div>

                <p className="heading">Tags</p>
                <p className="hint">Add up to 5 tags to describe what your question is about</p>
                <Form.Group>
                    <Typeahead
                      id="basic-typeahead-multiple"
                      labelKey="tagName"
                      multiple
                      onChange={setMultiSelections}
                      options={options}
                      placeholder="e.g. (ios vba django)"
                      selected={multiSelections}
                    />
                </Form.Group>

                <button className="btn btn-register" style={{marginTop: '15px'}} onClick={()=> submitQuestion()}>Submit</button>
            </div>
        </div>
    )
}
//Export The AskQuestion Component
export default AskQuestion;
