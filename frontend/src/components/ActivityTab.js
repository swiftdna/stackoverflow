import React from "react";
import gLogo from "./Images/user4.png";
import styled from "styled-components";

function ActivityTab()
{
    return(
            <div className="activity-tab">

            <div>
                Answers
            </div>

            <div>
                Questions
            </div>

            <div>
                Tags
            </div>

            <div>
                Badges
            </div>

            <div>
                Bookmarks
            </div>

            <div>
                Reputation
            </div>

        </div>

    );
}

export default ActivityTab;

const ActivityContainer = styled.footer`
.activity-tab
{
    margin-top: 1000px;
}
`;