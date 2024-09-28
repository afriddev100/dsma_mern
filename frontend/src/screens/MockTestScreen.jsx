import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";
import FormContainer from "../components/FormContainer";

function MockTestScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [currentScreen, setCurrentScreen] = useState("INIT");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 20 minutes = 1200 seconds
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);


  const startQuiz = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setQuestions([]);
      setAnswers({})
      const { data } = await axios.get("api/questions/random");
      setQuestions([]);
    
      setQuestions(data);
      setIsLoading(false);
      setShowResults(false);
      setCurrentScreen("STARTED");
      setCurrentQuestionIndex(0);
      setScore(0); 
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  // Timer logic
  useEffect(() => {
    let timer;

    // Start the timer when the quiz is started and results are not shown
    if (currentScreen === "STARTED" && !showResults && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Stop the quiz when the timer reaches zero
    if (timeLeft === 0) {
      submitQuiz();
    }

    // Cleanup interval when the component unmounts or when the quiz is finished
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentScreen, showResults, timeLeft]);

  // Timer logic
  //  useEffect(() => {
  //     if (timeLeft > 0 && !showResults) {
  //         const timer = setInterval(() => {
  //             setTimeLeft((prevTime) => prevTime - 1);
  //         }, 1000);
  //         return () => clearInterval(timer);
  //     } else if (timeLeft === 0) {
  //         submitQuiz();
  //     }
  // }, [timeLeft, showResults]);

  // Handle answer selection
  const handleAnswerSelect = (e) => {
    const answer = e.target.value;
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer,
    });
  };

  // Submit quiz and calculate score
  const submitQuiz = () => {
    let totalScore = 0;
    let correct = 0;
    let wrong = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.rightAnswer) {
        totalScore += 1; // Assuming 4 marks per correct answer
        correct++;
      } else {
        wrong++;
      }
    });
    setScore(totalScore);
    setCorrectAttempts(correct);
    setWrongAttempts(wrong);
    setShowResults(true);

  };

  // Navigation between questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (isLoading) return <Loader />;
  if (error)
    return <Message variant="danger">{error?.data?.message || Error}</Message>;
  if (currentScreen == "INIT")
    return (
      <Container>
        <Row className="shadow-box mt-4">
          <h1 className="text-center">
            Welcome to the Learner's License Mock Test!
          </h1>

          <Row>
            <Col md={12}>
              <p class="lead text-center">
                Before you begin, here are a few important points to note:
              </p>

              <ul class="list-group mb-3">
                <li class="list-group-item">
                  <strong>Purpose of the Test:</strong> This mock test is
                  designed to help you practice and familiarize yourself with
                  the format and types of questions you may encounter in the
                  actual learner's license test. It will cover important topics
                  like traffic signs, road rules, and safe driving practices.
                </li>
                <li class="list-group-item">
                  <strong>Test Format:</strong>
                  <ul>
                    <li>
                      The test consists of{" "}
                      <strong>multiple-choice questions</strong>.
                    </li>
                    <li>
                      You will have <strong>X minutes</strong> to complete the
                      test.
                    </li>
                    <li>
                      There are <strong>X questions</strong> in total, and you
                      need to select the most appropriate answer for each.
                    </li>
                  </ul>
                </li>
                <li class="list-group-item">
                  <strong>Scoring:</strong>
                  <ul>
                    <li>
                      Each correct answer will earn you <strong>1 point</strong>
                      .
                    </li>
                    <li>There is no negative marking for incorrect answers.</li>
                  </ul>
                </li>
                <li class="list-group-item">
                  <strong>Important Tips:</strong>
                  <ul>
                    <li>
                      Read each question carefully before selecting an answer.
                    </li>
                    <li>
                      Manage your time efficiently. You can track the remaining
                      time on the screen.
                    </li>
                    <li>
                      Once the test is completed, you will receive your score
                      along with the correct answers.
                    </li>
                  </ul>
                </li>
                <li class="list-group-item">
                  <strong>Disclaimer:</strong> This mock test is for practice
                  purposes only. Success in this test does not guarantee passing
                  the official learner's license exam.
                </li>
              </ul>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center text-center">
            <Col md={6}>
              <Button onClick={startQuiz}>Start the test </Button>
            </Col>
          </Row>
        </Row>
      </Container>
    );

  if (currentScreen == "STARTED")
    return (
      <Container>
        <div className="container mt-4 shadow-box">
          {!showResults ? (
            <>
              {/* Timer */}
              <Row>
                <Col className="d-flex justify-content-between">
                  <h4 
                className={`d-inline ${timeLeft <= 120 ? "blink-red" : ""}`} 
                  >
                    Time Left:{" "}
                    {`${Math.floor(timeLeft / 60)
                      .toString()
                      .padStart(2, "0")}:${(timeLeft % 60)
                      .toString()
                      .padStart(2, "0")}`}
                  </h4>

                  {/* Submit Button */}
                  <Button
                    variant="success"
                    className="ml-4"
                    onClick={submitQuiz}
                  >
                    Finish Test
                  </Button>
                </Col>
              </Row>
              <hr></hr>

              <Col md={6}></Col>

              <Col md={6}></Col>

              {/* Question and Options */}
              {questions.length > 0 && (
                <div className="mt-4">
                  <h5>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h5>
                  <hr></hr>
                  <Row>
                    <Col md={6}>
                      <p className="text-primary">
                        {questions[currentQuestionIndex].question}
                      </p>

                      {questions[currentQuestionIndex].imageUrl && (
                        //   <img
                        //   src={questions[currentQuestionIndex]?.imageUrl}
                        //   alt="Question Visual"
                        //   style={{ width: "100px" }}
                        // />

                        <Image
                          src={questions[currentQuestionIndex]?.imageUrl}
                          alt="Question Visual"
                          fluid
                        />
                      )}

                      {!questions[currentQuestionIndex].imageUrl && (
                        //   <img
                        //   src={questions[currentQuestionIndex]?.imageUrl}
                        //   alt="Question Visual"
                        //   style={{ width: "100px" }}
                        // />
                        <div style={{ width: "128px", height: "128px" }}></div>
                      )}
                    </Col>
                    <Col md={6} className="d-flex align-items-center ">
                      <Form>
                        {questions[currentQuestionIndex].options
                          .split(",")
                          .map((option, idx) => (
                            <React.Fragment key={idx}>
                              <Form.Check
                                type="radio"
                                label={option}
                                name={`question-${currentQuestionIndex}`}
                                value={option}
                                onChange={handleAnswerSelect}
                                checked={
                                  answers[currentQuestionIndex] === option
                                }
                              />
                              {/* Add an <hr> only if it's not the last option */}
                              {idx <
                                questions[currentQuestionIndex].options.split(
                                  ","
                                ).length -
                                  1 && <hr />}
                            </React.Fragment>
                          ))}
                      </Form>
                    </Col>
                  </Row>
                  <hr></hr>
                  {/* Next and Previous Buttons */}
                  <div className="mt-3">
                    <Button
                      variant="secondary"
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="primary"
                      onClick={goToNextQuestion}
                      className="ms-2"
                      disabled={currentQuestionIndex === questions.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
              <hr></hr>
              {/* Question Navigation */}
              <FormContainer size={10}>
                <div>
                  <Row>
                    {questions.map((_, idx) => (
                      <Col xs={1} key={idx} className="text-center mb-2">
                        <Button
                          variant={answers[idx] ? "success" : "light"}
                          onClick={() => jumpToQuestion(idx)}
                        >
                          {idx + 1}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </div>
              </FormContainer>
            </>
          ) : (




                     <div className="text-center">
              <h3>Hi, You Scored {score}/20</h3>
              <h4>Your scorecard details</h4>
              <Row>
                <Col md={6} className="offset-md-3">
                  <ul className="list-group">
                    <li className="list-group-item">Total questions: {questions.length}</li>
                    <li className="list-group-item">Total attempts: {correctAttempts + wrongAttempts}</li>
                    <li className="list-group-item">Correct attempts: {correctAttempts}</li>
                    <li className="list-group-item">Wrong attempts: {wrongAttempts}</li>
                    <li className="list-group-item">Total marks: 20</li>
                    <li className="list-group-item">Obtained marks: {score}</li>
                    <li className="list-group-item">Percentage marks: {((score / 20) * 100).toFixed(1)}%</li>
                  </ul>
                </Col>
              </Row>
              <div className="mt-4">
                <Button variant="primary" onClick={startQuiz}>
                  Retake Test
                </Button>
                <Button variant="secondary" className="ms-3" href="/">
                  Go Home
                </Button>
              </div>
            </div>

          )}
        </div>
      </Container>
    );
}

export default MockTestScreen;
