import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import gLogo from "./Images/user4.png";
import UserProfileTab from "./UserProfileTab";
import ActivityTab from "./ActivityTab";

function UserProfile() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const navigate = useNavigate();

  return (
      <>
        <div
        className="container"
        style={{ marginTop: "80px", border: "1px solid red;" }}
        >
        <h4>Welcome home!</h4>

        <p onClick={() => navigate("/questions/315135")}>click here</p>
        <p onClick={() => navigate("/questions/ask")}>Ask Question</p>
        <h4 onClick={() => navigate("/")}>All Questions</h4>
        <h4 onClick={() => navigate("/tags")}>Tags</h4>
        <h4 onClick={() => navigate("/Users")}>Users</h4>
      </div>

    <UserProfileContainer>

    <div className="user-image">
          <img style={{borderRadius: "5px;"}}src={gLogo} width={150} height={150}/>           
    </div>

    <div className="user-join-details">
    <div className="user-name">
        <p>Sunnyhithreddy k</p>
    </div>
        <p> Member for 8 months</p>
        <p> Last seen this week</p>
    </div>

    <div>
    </div>

    <div className="user-location">
        <p> Hyderabad, India</p>
    </div>

    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}>
          Profile
        </button>

        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}>
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
       
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >

          <UserProfileTab/>

        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
            <ActivityTab/>

        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>

      </div>
    </div>
    </UserProfileContainer>
    </>
  );
}

export default UserProfile;

const UserProfileContainer = styled.footer`
*, ::before, ::after {
    box-sizing: border-box;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 300px;
    margin-left: 220px;
    margin-top: 40px;
    font-size: 13px;
  }
  
  .bloc-tabs{
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
  
  .active-tabs  {
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

  button:hover
  {
    background-color: 	#E0E0E0;
  }

  .content-tabs {
    flex-grow : 1;
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

  .user-image
  {
    margin-left: 250px;
    margin-top: -140px;
  }

  .user-join-details
  {
      margin-left: 450px;
      margin-top: -150px;
      font-size: 12px;
      color: #888888;
  }
  .user-location
  {
    margin-left: 450px;
    font-size: 12px;
    color: #888888;
  }

  .user-name
  {
      font-size: 40px;
      margin-left: 0px;
      color: black
  }
`;