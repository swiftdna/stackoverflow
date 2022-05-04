import React, { useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Sidebar from './Sidebar';
import QuestionSummaryCard from './QuestionSummaryCard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Row, Button, Col } from 'react-bootstrap';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { searchQuestions } from '../utils';

//create the Navbar Component
function Search() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchKeyword = searchParams.get('q');
    const searchItems = useSelector(state => state.questionssearch.data);
    const qsearchLoading = useSelector(state => state.questionssearch.loading);

    // console.log('searchKeyword - ', searchKeyword);

    useEffect(() => {
        searchQuestions(dispatch, searchKeyword);
    }, [searchKeyword]);

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
                {qsearchLoading ? <Loader /> : 
                <>
                    <Row>
                        <Col xs={9}>
                            <h1>Search results for {searchKeyword}</h1>
                        </Col>
                        <Col xs={3}>
                            <button className="btn btn-register" style={{float: 'right'}} onClick={() => navigate('/questions/ask')}>Ask Question</button>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '20px'}}>
                        <Row style={{marginTop: '10px', marginBottom: '20px'}}>
                        <Col xs={8}>
                            {searchItems && searchItems.length && <h4>{searchItems.length} results</h4>}
                        </Col>
                        <Col>
                            <div className="d-flex s-btn-group js-filter-btn">
                                <a className="js-sort-preference-change youarehere is-selected flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=relevance&amp;q=xyz" data-nav-xhref="" title="Search results with best match to search terms" data-value="relevance" data-shortcut="">
                                    Relevance</a>
                                <a className="js-sort-preference-change flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=newest&amp;q=xyz" data-nav-xhref="" title="Newest search results" data-value="newest" data-shortcut="">
                                    Newest</a>
                            </div>
                        </Col>
                        </Row>
                        <hr />
                        {searchItems && searchItems.map(searchItem => <QuestionSummaryCard data={searchItem} />)}
                    </Row>
                </>}
                </Col>
            </Row>
        </div>
    )
}

export default Search;