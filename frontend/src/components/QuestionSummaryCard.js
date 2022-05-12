import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Output from 'editorjs-react-renderer';
import UserCard from './UserCard';
import { formatShortDate } from '../utils';

export default function QuestionSummaryCard({data}) {
    const navigate = useNavigate();

    const openQuestion = (id) => {
        navigate(`/questions/${id}`);
    }

    const openTagQuestions = (tag) => {
        navigate(`/questionTag/${tag}`);
      }

	return (
		<Row>
            <Col xs={1}>
                <div className="statscontainer">
                    <div className="stats">
                        <div className="vote">
                            <div className="votes">
                                {data.score && <span className="vote-count-post"><strong>{data.score}</strong></span>}
                                <div className="viewcount">votes</div>
                            </div>
                        </div>
                        <div className="status answered-accepted">
                            {data.answers && <><strong>{data.answers.length}</strong>answers</>}
                        </div>
                        <p className="views">{data.views} views</p>
                    </div>
                </div>
            </Col>
            <Col xs={11}>
                <div className="summary">
                    <div className="result-link">
                        <h3>
                            <a href onClick={() => openQuestion(data._id)} title={data.title} className="question-hyperlink">{data.title}</a>
                        </h3>
                    </div>
                    <div className="excerpt">
                        {data.isMultiMedia ? <Output data={ data.text } /> : <p>{data.text}</p>}
                    </div>
                    <div className="tags d-flex gs4 fw-wrap mt2 t-java t-string t-random">

              {data.tags.map((_tag) => (                       
                       <a href onClick={() => openTagQuestions(_tag)} className="post-tag flex--item" title="" rel="tag">{_tag}</a> 
            ))}
                    </div>
                    <div className="started float-right">
                        {data.author ? <UserCard source="list" data={{ ...data.author, modified: formatShortDate(data.modified) }} owner={true} /> : ''}
                    </div>
                </div>
            </Col>
            <hr style={{ backgroundColor: 'rgb(188 188 188)', height: '1px'}} />
        </Row>
	);
}