import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postQuestion, fetchAllTags, editQuestion, getQuestionDetails } from "../utils";
import { Button, Row, Col, Modal } from 'react-bootstrap';
import { createReactEditorJS } from "react-editor-js";
import { Form } from "react-bootstrap";
import { EDITOR_JS_TOOLS } from "../constants/editortools";
import { Typeahead } from 'react-bootstrap-typeahead';
import { setToast } from '../actions/app-actions';
import { useNavigate, useParams } from 'react-router-dom';
import Data from "./Data";

const ReactEditorJS = createReactEditorJS();

export default function Test({ show, mode, data, extras, fn }) {
    const [editorData, setEditorData] = useState(data);
    const [title, setTitle] = useState(extras.title);
	const [options, setOptions] = useState([]);
    const [multiSelections, setMultiSelections] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const tags = await fetchAllTags();
            setOptions(tags)
            setEditorData(data)
        }
        fetchData();
    }, []);

    useEffect(() => {
    	setEditorData(data);
    }, [data]);

    useEffect(() => {
        if (options) {
        	const filteredOptions = options.filter(opt => {
        		return extras && extras.tags && extras.tags.indexOf(opt.tagName) !== -1
        	})
        	setMultiSelections(filteredOptions);
        }
    	if (extras.title) {
    		setTitle(extras.title);
    	}
    }, [options, extras]);

	const onSave = async (api) => {
	    const outputData = await api.saver.save();
	    // const cleanData = JSON.stringify(outputData);

	    setEditorData(outputData);
	}

	const onInputChange = (e) => {
        setTitle(e.target.value);
    };

	const submitQuestion = async () => {
		const modifiedData = {
			title,
			editorData,
			tags: []
		};
        if (multiSelections && multiSelections.length > 5) {
            dispatch(setToast({
                type: 'Error',
                message: 'You can select only upto 5 tags!'
            }));
            return;
        }
        if (multiSelections) {
            multiSelections.map(selectedTag => modifiedData.tags.push(selectedTag.tagName));
        }
        console.log('modifiedData -> ', modifiedData);
        const successFlag = await editQuestion(extras._id, modifiedData);
        if (successFlag) {
        	getQuestionDetails(dispatch, extras._id);
            navigate(`/questions/${extras._id}`);
            if (fn && fn.handleClose) {
            	fn && fn.handleClose()
            }
        }
    };

	return (
		<Modal show={show} onHide={fn && fn.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Question - {extras._id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
			<div className="ask_question_box">
                <p className="heading">Title</p>
                <p className="hint">Be specific and imagine you’re asking a question to another person</p>
                <input id="title" value={title} onChange={onInputChange} placeholder="e.g. Is there an R function for finding the index of an element in a vector?" />

                <p className="heading">Body</p>
                <p className="hint">Include all the information someone would need to answer your question</p>
                <div className="body_editor">
                    <ReactEditorJS
				        tools={EDITOR_JS_TOOLS}
				        data={data}
				        onChange={onSave}
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
            </div>
			</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={fn && fn.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={()=> submitQuestion()}>
                Save Changes
              </Button>
            </Modal.Footer>
        </Modal>
	);
}