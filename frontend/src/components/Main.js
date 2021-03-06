import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Question from "./Question";
import QuestionTimeline from "./QuestionTimeline";
import AskQuestion from "./AskQuestion";
import Search from "./Search";
import Messages from "./Messages";
import Test from "./Test";
import Stats from "./Stats";
import "../Main.css";
import { useLocation } from "react-router-dom";
import { checkSession } from "../utils";
import { Toast, ToastContainer } from "react-bootstrap";
import {
  selectAlertFlag,
  selectToastFlag,
  selectAlertMessage,
  selectAlertType,
  selectIsLoggedIn,
} from "../selectors/appSelector";
import { clearToast } from "../actions/app-actions";
import { loadQuestions } from "../utils";
import Register from "./Register";
import Tags from "./Tags";
import Users from "./Users";
import UserProfile from "./UserProfile";
import AdminReview from "./AdminReview";
import QuestionTag from "./QuestionTag";
import AdminAddTag from "./AdminAddTag";

//Create a Main Component
export function Main() {
  const alert = useSelector(selectAlertFlag);
  const toast = useSelector(selectToastFlag);
  const alertMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const dispatch = useDispatch();
  const alertMapping = {
    error: "alert alert-danger",
    success: "alert alert-success",
    warning: "alert alert-warning",
    info: "alert alert-info",
  };

  useEffect(() => {
    checkSession(dispatch);
    loadQuestions(dispatch);
  }, []);

  return (
    <>
      {location.pathname !== "/login" && <Header />}
      {alert ? (
        <div className="container pull-down">
          <div
            className={
              alertMapping && alertMapping[alertType]
                ? alertMapping[alertType]
                : "alert alert-danger"
            }
            role="alert"
          >
            {alertMessage}
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer
        className="p-3"
        position={"bottom-end"}
        style={{ zIndex: 10, fontSize: '15px !important' }}
      >
        <Toast
          onClose={() => dispatch(clearToast())}
          show={toast}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{alertType}</strong>
          </Toast.Header>
          <Toast.Body>{alertMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:questionID" element={<Question />} />
        <Route
          path="/questions/:questionID/timeline"
          element={<QuestionTimeline />}
        />
        <Route path="/questions/ask" element={<AskQuestion />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/test" element={<Test />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/userProfile/:id/:email" element={<UserProfile />} />
        <Route path="/adminReview/" element={<AdminReview />} />
        <Route path="/questionTag/:tag" element={<QuestionTag />} />
        <Route path="/adminAddTag/" element={<AdminAddTag />} />
      </Routes>
    </>
  );
}
//Export The Main Component
export default Main;
