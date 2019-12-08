// NPM Dependencies
import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';

// UI Dependencies
import { Typography, Row, Button } from 'antd';

// Component Dependencies
import BaseLayout from "../../components/base-layout";
import Question from "../../components/question";

// Local Dependencies
import { resetCorrectQuestions } from '../../actions';

const { Title, Text } = Typography;

class QuizPage extends React.Component {
    static async getInitialProps(props) {
        const { query, isServer } = props.ctx;
        const { id = null } = query;

        const quiz = await fetch(`http://138.68.239.62/fundedquiz/${id}`);
        const quizData = quiz.ok ? await quiz.json() : 'NOT_FOUND';

        let quizTemplateData = {};
        let giftData = {};
        if (quiz.ok) {
            const quizTemplate = await fetch(`http://138.68.239.62/quiz/${quizData.quiz}`);
            quizTemplateData = quizTemplate.ok ? await quizTemplate.json() : {};
        }
        return {
            quizData,
            quizTemplateData,
            giftData,
            isServer
        };
    }

    componentDidMount() {
        this.props.dispatch(resetCorrectQuestions());
    }

    render() {
        const { quizData, quizTemplateData, correctQuestions } = this.props;

        if (quizData === 'NOT_FOUND') {
            return (
                <Row type="flex" justify="start" className="base-layout__row">
                    <BaseLayout columns={24} className="quiz-page">
                        <div style={{ background: '#fff', padding: 48, marginTop: 32, height: '100%' }}>
                            <div style={{ textAlign: 'center' }}>
                                <Title>404 Quiz not found</Title>
                            </div>
                        </div>
                    </BaseLayout>
                </Row>
            );
        }

        const { name, description, questions } = quizTemplateData;
        const questionCount = questions.length;
        const sortedQuestions = questions.sort((a, b) => Number(a.order) - Number(b.order));
        const allQuestionsCorrect = correctQuestions.length === questions.length;

        return (
            <Row type="flex" justify="start" className="base-layout__row">
                <BaseLayout columns={24} className="quiz-page">
                    <div style={{ background: '#fff', padding: 48, marginTop: 32 }}>
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <Title>{name}</Title>
                            <Text>In this quiz you will learn how to:</Text>
                            <Title level={4} style={{ marginTop: 12 }}>{description}</Title>
                            <Text type="secondary">{questionCount} questions</Text>
                        </div>
                    </div>
                    {sortedQuestions.map(question =>
                        <Question
                            questionData={question}
                            key={question.order}
                            preview={false}
                        />
                    )}
                    {allQuestionsCorrect &&
                        <div style={{ background: '#fff', padding: 48, marginTop: 32 }}>
                            <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 40  }}>
                                <Title>🎉 You did it! 🎉</Title>
                                <Title level={4} style={{ marginBottom: 40}}>
                                    You answered all questions correctly, now it's time for your prize 😉
                                </Title>
                                <a
                                    href={`https://lightning.gifts/redeem/${quizData.lightning_gift_order_id}`}
                                    target="_blank"
                                >
                                    <Button
                                        size="large"
                                        type="primary"
                                        shape="round"
                                        onClick={() => this.updateQuiz}
                                    >
                                        Receive your Bitcoin prize
                                    </Button>
                                </a>
                            </div>
                        </div>
                    }
                </BaseLayout>
            </Row>
        );
    }
}

export default connect(state => state)(QuizPage)
