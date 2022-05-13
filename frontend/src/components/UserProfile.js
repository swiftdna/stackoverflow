import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import gLogo from "./Images/user4.png";
import UserProfileTab from "./UserProfileTab";
import ActivityTab from "./ActivityTab";
import axios from "axios";
import UserEditProfile from "./UserEditProfile";
import Sidebar from "./Sidebar";
import { Row, Col } from 'react-bootstrap';
import Loader from "./Loader";
import {formatEasyDate} from '../utils';

function UserProfile() {
  const urlParams = useParams();
  const { id, email } = urlParams;
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const navigate = useNavigate();
  const [userProfile, SetUserProfile] = useState({});
  const [userBadges, SetBadges] = useState([]);
  const [userTopTag, SetUserTopTag] = useState([]);
  const [userPersonalDetails, SetUserPersonalDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const data = {
    id: id,
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/getUserDetails?search=${email}`)
      .then((response) => {
        SetUserPersonalDetails(response.data.data[0]);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`/api/getUserStats`, data)
      .then((response) => {
        SetUserProfile(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let bronzeBages = [];
  let silverBadges = [];
  let goldBadges = [];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/badges/getAllbadges/${id}`)
      .then((response) => {
        SetBadges(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`/api/topUserTags`, data)
      .then((response) => {
        SetUserTopTag(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  for (let i = 0; i < userBadges.length; i++) {
    if (userBadges[i].badgeValue == "Bronze") {
      bronzeBages.push(userBadges[i].badgeName);
    } else if (userBadges[i].badgeValue == "Silver") {
      silverBadges.push(userBadges[i].badgeName);
    } else {
      goldBadges.push(userBadges[i].badgeName);
    }
  }

  const [toggleState, setToggleState] = useState(1);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
      <div className="container" style={{marginTop: '80px'}}>
        <Row>
          <Sidebar />
          <Col xs={10} style={{paddingLeft: '20px'}}>

          <UserProfileContainer>
            <div className="user-image">
              <img
                style={{ borderRadius: "5px;" }}
                src={userPersonalDetails.profilePhoto}
                width={150}
                height={150}
              />
            </div>

            <div className="user-join-details">
              <div className="user-name">
                <p>{userPersonalDetails.username}</p>
              </div>
              <p style={{margin: 0}}>Member since {formatEasyDate(userPersonalDetails.created)}</p>
              <p style={{margin: 0}}>Last seen at {formatEasyDate(userPersonalDetails.lastseen)}</p>
            </div>

            <div></div>

            <div className="user-location">
              <p> {userPersonalDetails.location}</p>
            </div>

            <div>
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Profile
                </button>

                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Activity
                </button>

                <button
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  Edit
                </button>
              </div>

              <div className="content-tabs">
                {userProfile ? (
                  <div
                    className={
                      toggleState === 1 ? "content  active-content" : "content"
                    }
                  >
                    <UserProfileTab
                      id={id}
                      data={userProfile}
                      bronze={bronzeBages}
                      silver={silverBadges}
                      gold={goldBadges}
                      topTags={userTopTag}
                      about={userPersonalDetails.about}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  <ActivityTab userId={id} />
                </div>

                <div
                  className={
                    toggleState === 3 ? "content  active-content" : "content"
                  }
                >
                  <UserEditProfile pic={userPersonalDetails.profilePhoto}/>
                </div>
              </div>
            </div>
          </UserProfileContainer>
          </Col>
        </Row>
      </div>
      )}
    </>
  );
}

export default UserProfile;

const UserProfileContainer = styled.footer`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  .bloc-tabs {
    display: flex;
  }

  .tabs {
    padding: 8px;
    border-radius: 20px;
    text-align: center;
    width: 10%;
    cursor: pointer;
    box-sizing: content-box;
    outline: none;
    margin-left: 5px;
  }

  .active-tabs {
    background: var(--theme-primary-color);
    color: white;
  }

  .active-tabs::before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    width: calc(100% + 2px);
    height: 5px;
  }

  button {
    border: none;
    background-color: white;
    height: 18px;
    padding: 15px;
    border-radius: 18px;
    margin-left: -19px;
  }

  button:hover {
    background-color: #e0e0e0;
  }

  .content-tabs {
    flex-grow: 1;
  }
  .content {
    background: white;
    padding: 20px;
    width: 100%;
    height: 100%;
    display: none;
  }

  .content p {
    width: 100%;
    height: 100%;
  }
  .active-content {
    display: block;
  }

  .user-image {
  }

  .user-join-details {
    font-size: 12px;
    color: #888888;
  }
  .user-location {
    font-size: 12px;
    color: #888888;
  }

  .user-name {
    font-size: 40px;
    margin-left: 0px;
    color: black;
  }
`;
