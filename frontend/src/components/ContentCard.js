import { Button, Row, Col } from 'react-bootstrap';
import { FaCaretUp, FaCaretDown, FaRegBookmark, FaHistory } from 'react-icons/fa';
import UserCard from './UserCard';

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
            	<span className="mini-heading">Asked</span> 1 year, 5 months ago <span className="mini-heading">Modified</span> 4 days ago <span className="mini-heading">Viewed</span> 606k times
        	</p>
        	<hr />
        	</>
        }
        <Row>
            <Col xs={1}>
                <FaCaretUp className="vote_ctrl" />
                <p className="vote_counter">246</p>
                <FaCaretDown className="vote_ctrl" />
                <FaRegBookmark className="bookmark_ctrl" />
                <p className="bookmark_counter">36</p>
                <FaHistory className="history_ctrl" />
            </Col>
            <Col xs={11}>
                <p className="q_desc" style={{marginTop: type==='question' ? '5px' : '20px'}}>{data.content}</p>
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
                        <UserCard />
                        <UserCard owner={true} />
                    </Col>
                </Row>
                <hr />
                <div className="q_comments">
                    <ul>
                    {data.comments && data.comments.map((comment, index) => 
                        <li key={index} className="q_comment">
                            {comment.content} - <span className="q_comment_author">{comment.author}</span> <span className="q_comment_time">{comment.created}</span>
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