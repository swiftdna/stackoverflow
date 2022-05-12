import React, { useEffect, useState, PureComponent } from 'react';
import './Stats.css';
import { Row, Col, Card } from 'react-bootstrap';
import Loader from './Loader';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mostViewedQuestions, fetchPopularTags, fetchTopUserReputation, fetchLeastUserReputation, fetchQuestionsPostedToday } from '../utils';

export default function Stats() {

	const [loading, setLoading] = useState(false);
	const [mvData, setMVData] = useState([]);
	const [ptData, setPTData] = useState([]);
	const [turData, setTURData] = useState([]);
	const [lurData, setLURData] = useState([]);
	const [qPostedToday, setQPostedToday] = useState(0);
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
            const mostViewedQ = await mostViewedQuestions();
            const popularTags = await fetchPopularTags();
            const topUsersRep = await fetchTopUserReputation();
            const leastUsersRep = await fetchLeastUserReputation();
            const questionsPostedToday = await fetchQuestionsPostedToday();
            console.log(questionsPostedToday);
            setMVData(mostViewedQ);
			setPTData(popularTags);
			setTURData(topUsersRep);
			setLURData(leastUsersRep);
			setQPostedToday(questionsPostedToday);
			setLoading(false);
            // setUsers(usersData);
        }
        fetchData();
	}, []);

	return (
        <div className="container" style={{marginTop: '60px'}}>
			<h3>Platform Analytics</h3>
			{loading ? <Loader /> : 
			<Row className="statistics">
				<Row>
					<Card className="dashboard-cards ds2">
			          <Card.Body>
			            <Card.Text>
			              {qPostedToday} questions posted today
			            </Card.Text>
			          </Card.Body>
			        </Card>
				</Row>
				<Row style={{marginTop: '20px'}}>
					<Col xs={6}>
						<h4>Top 10 most viewed questions</h4>
						<BarChart width={550} height={330} data={mvData}>
				          <Bar dataKey="views" fill="#4e00b8" />
				          <XAxis dataKey="title" />
				          <YAxis />
				          <Tooltip />
				        </BarChart>
					</Col>
					<Col xs={6}>
						<h4>Top 10 most used tags</h4>
						<BarChart width={550} height={330} data={ptData && ptData.slice(0,10)}>
				          <Bar dataKey="tagQuestionsAsked" fill="#0070BA" />
				          <XAxis dataKey="tagName" />
				          <YAxis />
				          <Tooltip />
				        </BarChart>
					</Col>
				</Row>
				<Row style={{marginTop: '20px'}}>
					<Col xs={6}>
						<h4>Top 10 users with highest reputation</h4>
						<BarChart width={550} height={330} data={turData}>
				          <Bar dataKey="Reputation" fill="#0070BA" />
				          <XAxis dataKey="username" />
				          <YAxis />
				          <Tooltip />
				        </BarChart>
					</Col>
					<Col xs={6}>
						<h4>Top 10 users with lowest reputation</h4>
						<BarChart width={550} height={330} data={lurData}>
				          <Bar dataKey="Reputation" fill="#0070BA" />
				          <XAxis dataKey="username" />
				          <YAxis />
				          <Tooltip />
				        </BarChart>
					</Col>
				</Row>
				{/* Array(12).fill().map(ar => <Col xs={3}>
					<div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
			            <i className="uil-envelope-shield fs-2 text-center bg-primary rounded-circle"></i>
			            <div className="ms-3">
			              <div className="d-flex align-items-center">
			                <h3 className="mb-0">1,245</h3> <span className="d-block ms-2">Emails</span>
			              </div>
			              <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
			            </div>
			        </div>
			    </Col>) */}
		    </Row>}
		</div>
	);
}