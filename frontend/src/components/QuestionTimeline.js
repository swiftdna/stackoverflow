import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

//create the Navbar Component
function QuestionTimeline() {
    const navigate = useNavigate();
    const qdetails = useSelector(state => state.questiondetails.data);
    const qactivities = useSelector(state => state.questiondetails.activities);
    
    const back = () => {
        // Take user back
        navigate(`/questions/${qdetails._id}`);
    };

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
                    <h3 className="history_title">Timeline for <a href onClick={() => back()}>{qdetails.title}</a></h3>
                    {
                        qactivities && 
                            <div style={{marginTop: '10px'}}>
                                <h5>{qactivities.length} events</h5>
                                <Table responsive style={{marginTop: '20px'}}>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>when</th>
                                      <th>what</th>
                                      <th>by</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                      {
                                        qactivities && qactivities.map((activity, index) =>
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{activity.created}</td>
                                                <td>{activity.type}</td>
                                                <td>{activity.author ? activity.author.username : 'Unknown'}</td>
                                            </tr>
                                        )
                                      }
                                  </tbody>
                                </Table>
                            </div>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default QuestionTimeline;