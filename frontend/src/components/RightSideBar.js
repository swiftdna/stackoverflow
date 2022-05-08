import React from "react";
import go from "./Images/go.png"
import cloud from "./Images/cloud.png"
import git from "./Images/githubLab.png"
import styled from "styled-components";

const RightSidebar = () => {
  return (
    <RightBarContainer>
      {/* Blog card started */}
      <div className="card shadow-sm" style={{marginTop:"0px"}}>
        <div
          className="card-header"
          style={{ backgroundColor: "rgb(241, 229, 188)" }}
        >
          <b>The Overflow Blog</b>
        </div>
        <div
          className="card-body"
          style={{ backgroundColor: "rgb(251, 243, 213)" }}
        >
          {blog.map((content) => {
            return (
              <div className="d-flex">
                <p>{content}</p>
              </div>
            );
          })}
        </div>
        <div
          className="card-header"
          style={{ backgroundColor: "rgb(241, 229, 188)" }}
        >
          <b>Featured on Meta</b>
        </div>
        <div
          className="card-body border-bottom"
          style={{ backgroundColor: "rgb(251, 243, 213)" }}
        >
          {meta.map((content) => {
            return (
              <div className="d-flex">
                <p>{content}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Blog card ends */}

      {/* Collectives card started */}
      <div className="card my-3 shadow-sm">
        <div className="card-header" style={{paddingLeft: "0px"}}>
            <h3>Collectives</h3></div>
        {apps.map((app) => {
          return (
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <img
                    src={app.img}
                    alt="img"
                    width="35px"
                    height="30px"
                    className="mr-2"
                  />
                  <div>
                    <p style={{ fontSize: "18px", fontWeight: "100" }}>
                      <b>{app.name}</b>
                    </p>
                    <p>{app.member}</p>
                  </div>
                </div>
                <button className="btn btn-outline-info btn-sm mb-4 ">
                  Search
                </button>
              </div>
              <p>{app.content}</p>
            </div>
          );
        })}
      </div>
      {/* Collectives card ends */}

      {/* Relative Tags part added */}

      {/* Network Questions added */}
    </RightBarContainer>
  );
};

export default RightSidebar;

const meta = [
  `Providing a JavaScript API for userscripts`,
  `Congratulations to the 59 sites that just left Beta`,
];

const blog = [
  `Best practices for writing code comments`,
  ` Sequencing your DNA with a USB dongle and open source code`,
];

const apps = [
  {
    img: go,
    name: "Go Language",
    member: "16k Members",
    content: `The official Q&A channel for Google's Go Programming Language.`,
  },
  {
    img: cloud,
    name: "Google Cloud",
    member: "14k Members",
    content: `Google Cloud provides organizations with leading infrastructure, platform capabilities`,
  },
  {
    img: git,
    name: "GitLab",
    member: "6k Members",
    content: `GitLab is the open DevOps platform, delivered as a single application. Our open source`,
  },
];


const RightBarContainer = styled.footer`

*
{
    width : 310px;
    padding-left: 5px;
}

`;