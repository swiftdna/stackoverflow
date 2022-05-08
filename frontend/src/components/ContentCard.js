import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FaCaretUp, FaCaretDown, FaRegBookmark, FaHistory } from 'react-icons/fa';
import UserCard from './UserCard';
import { addQuestionComment, addAnswerComment, voteQuestion, voteAnswer } from '../utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Output from 'editorjs-react-renderer';

export default function ContentCard({ data, type, questionID}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const viewHistory = () => {
        navigate(`/questions/${data._id}/timeline`);
    };
    const [comment, setComment] = useState('');

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const _handleKeyDown = (e) => {
        const commentType = type === 'question' ? type : 'answer';
        const elementID = data._id;
        const qID = questionID ? questionID : data._id;
        if (e.key === 'Enter' && comment) {
            // Add the comment here
            if (qID === elementID) {
                // Question comment
                console.log('q comment');
                addQuestionComment(dispatch, qID, comment, (err, successFlag) => {
                    setComment('');
                });
            } else {
                addAnswerComment(dispatch, {
                    qid: qID,
                    answerID: elementID,
                    data: comment
                }, (err, successFlag) => {
                    setComment('');
                });
                console.log('a comment');
            }
            // console.log(commentType, comment, qID, elementID);
        }
    }

    const vote = (type) => {
        const commentType = type === 'question' ? type : 'answer';
        const elementID = data._id;
        const qID = questionID ? questionID : data._id;
        const voteValue = type === 'upvote' ? 1 : -1;

        if (qID === elementID) {
            // Question vote
            voteQuestion(dispatch, qID, voteValue);
        } else {
            voteAnswer(dispatch, qID, elementID, voteValue);
        }
    }

	return (
		<>
		<Row>
			<Col xs={9}>
				<h1>{data.title}</h1>
			</Col>
			<Col xs={3}>
				{
        			type==='question' && <button className="btn btn-register" style={{float: 'right'}}>Ask Question</button>
        		}
			</Col>
		</Row>
        {
        	type==='question' && 
        	<>
        	<p className="q_subheading">
            	<span className="mini-heading">Asked</span> {data.createdText} <span className="mini-heading">Modified</span> {data.modifiedText} <span className="mini-heading">Viewed</span> {data.views} times
        	</p>
        	<hr />
        	</>
        }
        <Row>
            <Col xs={1}>
                <FaCaretUp className="vote_ctrl" onClick={() => vote('upvote')}/>
                <p className="vote_counter">{data.score}</p>
                <FaCaretDown className="vote_ctrl" onClick={() => vote('downvote')}/>
                {data.bookmarks && <><FaRegBookmark className="bookmark_ctrl" />
                <p className="bookmark_counter">{data.bookmarks.length}</p></>}
                {
                    type==='question' && <FaHistory className="history_ctrl" onClick={() => viewHistory()} />
                }
            </Col>
            <Col xs={11}>
                <div className="q_desc" style={{marginTop: type==='question' ? '5px' : '20px'}}>{data.isMultiMedia ? <Output data={ data.text } /> : <p>{data.text}</p>}</div>
                <p className="q_tags">
                    {data.tags && data.tags.map((tag, index) => <span key={index} className="q_tag">{tag}</span>)}
                </p>
                <Row className="share_author_panel">
                    <Col xs={6}>
                        <span className="other_ctrls">Share</span>
                        <span className="other_ctrls">Improve this question</span>
                        <span className="other_ctrls">Follow</span>
                    </Col>
                    <Col xs={6} style={{minHeight: '30px', display: 'flex', justifyContent: 'flex-end'}}>
                        <UserCard owner={true} data={{...data.author, modified: data.modifiedFullText}} />
                    </Col>
                </Row>
                <hr />
                <div className="q_comments">
                    <ul>
                    {data.comments && data.comments.map((comment, index) => 
                        <li key={index} className="q_comment">
                            {comment.body} - <span className="q_comment_author">{data.author.username}</span> <span className="q_comment_time">{comment.created}</span>
                            <hr />
                        </li>
                    )}
                    </ul>
                    <input className="comment_input" value={comment} placeholder="Add a comment.." onChange={handleComment} onKeyDown={_handleKeyDown} />
                </div>
            </Col>
        </Row>
        </>
	);
}