 import React from "react";
 import styled from "styled-components";
 import goldImage from  "./Images/gold.png"
 import silverImage from "./Images/silver.png";
 import bronzeImage from "./Images/bronze.png";

function UserProfileTab({data, bronze, silver, gold, topTags, about})
 {
    return(
        <UserProfileTabContainer>
        <div className="userProfileTabs">
            
            <div>
               <h2>Stats</h2>
                <div className="stats-tab">
                    <div className="user-reputation">
                        <p>{data.reputationcount}</p>
                        <p>reputation</p>
                    </div>

                    <div className="user-reached">
                        <p>{data.viewscount}</p>
                        <p>reached</p>
                    </div>

                    <div className="user-answers">
                        <p>{data.answerscount}</p>
                        <p>answers</p>
                    </div>

                    <div className="user-questions">
                        <p>{data.questionscount}</p>
                        <p>questions</p>
                    </div>
                  
                </div>
            </div>

            <div className="aboutMeTab">
                   <h2>About Me</h2>
                   <div className="aboutMe" style={{paddingLeft:"15px", paddingTop:"20px"}}>
                     {about}
                   </div>
            
            </div>

           < div className="badges-tab">
               <h2>Badges</h2>
               <div className="badges-inner-tab">

                    <div className="badges-gold-tab">
                     <div style={{display:"flex"}}>
                        <img src={goldImage} width={55} height={55} style={{marginLeft: "10px", marginTop: "5px"}}/>
                        <p style={{marginLeft:"10px", marginTop: "20px"}}>
                            <span style={{fontWeight: "bold", fontSize:"23px"}}>{gold.length}</span> Badges</p>
                    </div>

                    <div>
                    
                    {
                      gold.map(function(element){
                          return <div style={{ marginLeft:"20px", backgroundColor: "black", color: "white",
                                               marginTop: "5px", paddingLeft: "20px", width: "150px", fontSize:"13px",
                                               height:"20px", borderRadius: "5px"}}>
                                  {element}
                                 </div>
                    })}

                    </div>

                 </div>

                 <div className="badges-silver-tab">
                    
                    <div style={{display:"flex"}}>
                        <img src={silverImage} width={55} height={55} style={{marginLeft: "10px", marginTop: "5px"}}/>
                        <p style={{marginLeft:"10px", marginTop: "20px"}}>
                            <span style={{fontWeight: "bold", fontSize:"23px"}}>{silver.length}</span> Badges</p>
                    </div>

                    <div>
                    
                    {
                      silver.map(function(element){
                          return <div style={{ marginLeft:"20px", backgroundColor: "black", color: "white",
                                               marginTop: "5px", paddingLeft: "20px", width: "150px", fontSize:"13px",
                                               height:"20px", borderRadius: "5px"}}>
                                 {element}
                                 </div>
                    })}

                    </div>

                 </div>

                 <div className="badges-bronze-tab">

                    <div style={{display:"flex"}}>
                        <img src={bronzeImage} width={55} height={55} style={{marginLeft: "10px", marginTop: "5px"}}/>
                        <p style={{marginLeft:"10px", marginTop: "20px"}}>
                            <span style={{fontWeight: "bold", fontSize:"23px"}}>{bronze.length}</span> Badges</p>
                    </div>

                <div>    
                    {
                      bronze.map(function(element)
                      {
                          return <div style={{ marginLeft:"20px", backgroundColor: "black", color: "white",
                                               marginTop: "5px", paddingLeft: "20px", width: "150px", fontSize:"13px",
                                               height:"20px", borderRadius:"5px"}}>
                                  {element}
                                 </div>
                     })
                    }
                    </div>
                 </div>
                 
                 <div className="top-tags">
                 <h2>Top Tags</h2>                       

                 <div className="top-tags-innertab">
                 {( topTags  ) &&
                   topTags.map(item => 

           <div>

               <p style={{display:"flex", marginLeft:"20px", marginTop:"15px"}}> 
                  <div style={{width:"50px"}}> 
                      <span className="question-tags"> { item[0]}  </span>
                  </div> 

                  <div style={{marginLeft:"450px", width:"70px"}}> 
                      <span style={{fontWeight:"bold", fontSize:"23px"}}>{ item[1]}</span>  score
                  </div> 

                  <div style={{marginLeft:"30px"}}> 
                      <span style={{fontWeight:"bold", fontSize:"23px"}}>{ item[2]}</span>  posts
                  </div> 
               </p>

              <hr></hr>
            </div>
        )}
                 </div>
                 </div>

             </div>
            </div>

        </div>
        </UserProfileTabContainer>
    )
 }

 export default UserProfileTab;

 const UserProfileTabContainer = styled.footer`

 .stats-tab
 {
    width: 190px;
    height: 160px;
    border-style: solid;
    border-color: #888888;
    border-radius: 10px;
 }

.user-reputation
{
    margin-left: 10px;
    margin-top: 5px;
}

 .user-reached
 {
    margin-left: 120px;
    margin-top: -61px;
 }

 .user-answers
 {
    margin : 8px;
    margin-top: 50px;
    width: 70px;
 }

.user-questions
{
    margin-left: 120px;
    margin-top: -60px;
}
.badges-tab
{
   margin-top: 15px;
}

.badges-tab
{
    width: 2000px;
}

.badges-inner-tab
{
    display: flex;
}

.badges-gold-tab,
.badges-silver-tab,
.badges-bronze-tab
{
    width: 270px;
    height: 250px;
    border-style: solid;
    border-color: #888888;
    border-radius: 10px;
}

.badges-silver-tab
{
    margin-left: 20px;
}

.badges-bronze-tab
{
    margin-left: 20px;
}

.aboutMeTab
{
    margin-left: 200px;
    margin-top: -190px;
}

.aboutMe
{
    border-style: solid;
    border-color: #888888;
    border-radius: 10px;
    width: 650px;
    height: 162px;
}

.top-tags
{
    margin-top: 270px;
    margin-left: -850px;
}

.top-tags-innertab
{
    margin-top: 10px;
    width: 850px;
    height: 400px;
    border-style: solid; 
    border-radius: 10px;
}

.question-tags
  {
      margin : 10px 5px;
      padding: 5px 10px;
      background-color: var(--powder-100);
      border-radius: blue;
      cursor: pointer;
  }

  .question-tags:hover
  {
    color: blue;
    border-radius:3px;
  }

`;

