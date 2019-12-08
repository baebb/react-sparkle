// NPM Dependencies
import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

// UI Dependencies
import { Typography, Row, Col, Alert } from 'antd';

// Component Dependencies
import AnswerForm from './answer-form';

const { Title, Text } = Typography;

const Question = ({ questionData, preview, correctQuestions }) => {
    const { youtube_url, question_text, answers, order } = questionData;
    const correctAnswer = answers.find(answer => answer.correct).content;
    const isCorrect = correctQuestions.some(question => question === order);

    return (
        <div className="question-item" style={{ background: '#fff', padding: 24, marginTop: 32 }}>
            <Row>
                <Col span={16}>
                    <Title level={2}>Question {order}</Title>
                    <Text strong>👇 Watch the video below before answering the question 👇</Text>
                    <div style={{ marginTop: 24, marginBottom: 24 }}>
                        <ReactPlayer
                            url={youtube_url}
                            playing={false}
                            controls={true}
                            light={true}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ marginTop: 112 }}>
                        <>
                            <Title level={4}>{question_text}</Title>
                            {isCorrect ?
                                <>
                                    <Title level={4}>{correctAnswer}</Title>
                                    <Alert message="You answered correctly!" type="success" />
                                </>
                                :
                                <AnswerForm
                                    answers={answers}
                                    preview={preview}
                                    questionOrder={order}
                                />
                            }
                        </>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = ({ correctQuestions }) => ({ correctQuestions });
export default connect(mapStateToProps)(Question);
