// NPM Dependencies
import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';

// UI Dependencies
import { Typography, Row } from 'antd';

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
        if (quiz.ok) {
            const quizTemplate = await fetch(`http://138.68.239.62/quiz/${quizData.quiz}`);
            quizTemplateData = quizTemplate.ok ? await quizTemplate.json() : {};
        }

        return {
            quizData,
            quizTemplateData,
            isServer
        };
    }

    componentDidMount() {
        this.props.dispatch(resetCorrectQuestions());
    }

    render() {
        const { quizData, quizTemplateData } = this.props;

        if (quizData === 'NOT_FOUND') {
            return (
                <Row type="flex" justify="start" className="base-layout__row">
                    <BaseLayout columns={24} className="quiz-page">
                        <div style={{ background: '#fff', padding: 24, marginTop: 32, height: '100%' }}>
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

        return (
            <Row type="flex" justify="start" className="base-layout__row">
                <BaseLayout columns={24} className="quiz-page">
                    <div style={{ background: '#fff', padding: 24, marginTop: 32, height: '100%' }}>
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
                </BaseLayout>
            </Row>
        );
    }
}

export default connect(state => state)(QuizPage)
