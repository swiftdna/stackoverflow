import { Button, Row, Col } from 'react-bootstrap';

export default function QuestionSummaryCard() {
	return (
		<Row>
            <Col xs={1}>
                <div className="statscontainer">
                    <div className="stats">
                        <div className="vote">
                            <div className="votes">
                                <span className="vote-count-post"><strong>1859</strong></span>
                                <div className="viewcount">votes</div>
                            </div>
                        </div>
                        <div className="status answered-accepted">
                            <strong>15</strong>answers
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs={11}>
                <div className="summary">
                    <div className="result-link">
                        <h3>
                <a href="/questions/15182496/why-does-this-code-using-random-strings-print-hello-world?r=SearchResults" data-searchsession="/questions/15182496/why-does-this-code-using-random-strings-print-hello-world?r=SearchResults&amp;s=1|384.1867" title="Why does this code using random strings print &quot;hello world&quot;?" className="question-hyperlink">
        Q: Why does this code using random strings print "hello world"?        </a>
        </h3>
                    </div>
                    <div className="excerpt">
                        The following print statement would print "<span className="fw-bold">hello</span> world".
        Could anyone explain this? … 
                    </div>
                    <div className="tags d-flex gs4 fw-wrap mt2 t-java t-string t-random">
                        <a href="/questions/tagged/java" className="post-tag flex--item" title="" rel="tag">java</a> <a href="/questions/tagged/string" className="post-tag flex--item" title="" rel="tag">string</a> <a href="/questions/tagged/random" className="post-tag flex--item" title="" rel="tag">random</a> 
                    </div>
                    <div className="started float-right">
        asked <span title="2013-03-03 04:38:06Z" className="relativetime">Mar 3, 2013</span> by <a href="/users/1031797/0x56794e">0x56794E</a>            </div>
                </div>
            </Col>
            <hr style={{ backgroundColor: 'rgb(188 188 188)', height: '1px'}} />
        </Row>
	);
}