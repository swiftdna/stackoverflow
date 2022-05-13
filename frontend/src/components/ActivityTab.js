import React from "react";
import styled from "styled-components";
import UserAnswersTab from "./UserAnswersTab";
import UserQuestionTab from "./UserQuestionTab";
import UserTagsTab from './UserTagTab';
import UserBookmarksTab from "./UserBookmarksTab";
import UserBadgesTab from "./UserBadgesTab";
import UserReputationTab from "./UserReputationTab";

function ActivityTab({ userId }) {
  const btns = document.querySelectorAll("[data-target-tab]");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((btn) => btn.classList.remove("active"));

      const items = document.querySelectorAll(".item");

      items.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      document.querySelector(btn.dataset.targetTab).classList.add("active");
    });
  });

  return (
    <ActivityContainer>
      <div class="vertical-tab">
        <div class="row">
          <div class="col-3">
            <button class="btn active" data-target-tab="#answers">
              Answers
            </button>
            <button class="btn" data-target-tab="#questions">
              Questions
            </button>
            <button class="btn" data-target-tab="#tags">
              Tags
            </button>
            <button class="btn" data-target-tab="#badges">
              Badges
            </button>
            <button class="btn" data-target-tab="#bookmarks">
              Bookmarks
            </button>
            <button class="btn" data-target-tab="#reputation">
              Reputation
            </button>
          </div>
          <div class="col-9">
            <div class="item active" id="answers">
              <UserAnswersTab userId={userId} />
            </div>

            <div class="item" id="questions">
              <UserQuestionTab userId={userId} />
            </div>

            <div class="item" id="tags">
              <UserTagsTab userId={userId} />
            </div>

            <div class="item" id="badges">
              <UserBadgesTab userId={userId} />
            </div>

            <div class="item" id="bookmarks">
            <UserBookmarksTab userId={userId} />
            </div>

            <div class="item" id="reputation">
              <UserReputationTab userId={userId}/>              
            </div>
          </div>
        </div>
      </div>
    </ActivityContainer>
  );
}

export default ActivityTab;

const ActivityContainer = styled.footer`
  .vertical-tab {
    width: 992px;
    margin-left: -20px;
  }

  .row {
    display: flex;
  }

  .col-3 {
    width: 24.9%;
  }

  .col-9 {
    width: 75.1%;
  }

  .btn {
    display: block;
    width: 40%;
    height: 15px;
    border: none;
    border-radius: 20px;
    font-size: 1.25rem;
    margin: 0.5rem 0;
    outline: none;
    cursor: pointer;
    padding-bottom: 25px;
  }

  .btn.active {
    background-color: #ffffff;
  }

  .item {
    display: none;
    padding: 0.75rem;
    font-size: 1.25rem;
  }

  .item.active {
    display: block;
  }
`;
