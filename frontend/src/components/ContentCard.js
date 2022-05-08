import { Button, Row, Col } from 'react-bootstrap';
import { FaCaretUp, FaCaretDown, FaRegBookmark, FaHistory } from 'react-icons/fa';
import UserCard from './UserCard';
import Output from 'editorjs-react-renderer';

export default function ContentCard({ data, type}) {
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
                <FaCaretUp className="vote_ctrl" />
                <p className="vote_counter">{data.total_votes}</p>
                <FaCaretDown className="vote_ctrl" />
                {data.bookmarks && <><FaRegBookmark className="bookmark_ctrl" />
                <p className="bookmark_counter">{data.bookmarks.length}</p></>}
                <FaHistory className="history_ctrl" />
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
                            {comment.body} - <span className="q_comment_author">{comment.author}</span> <span className="q_comment_time">{comment.created}</span>
                            <hr />
                        </li>
                    )}
                    </ul>
                </div>
            </Col>
        </Row>
        </>
	);
}