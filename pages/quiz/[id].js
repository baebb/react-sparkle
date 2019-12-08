// NPM Dependencies
import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';

// UI Dependencies
import { Typography, Row } from 'antd';

// Component Dependencies
import BaseLayout from "../../components/base-layout";
import Question from "../../components/question";

const { Title, Text } = Typography;

class QuizPage extends React.Component {
    static async getInitialProps(props) {
        const { query, isServer } = props.ctx;
        const { id = null } = query;
        // store.dispatch(tickClock(isServer));
        //
        // if (!store.getState().placeholderData) {
        //     store.dispatch(loadData());
        // }

        const res = await fetch(`http://138.68.239.62/quiz/${id}`);
        const quizData = res.ok ? await res.json() : 'NOT_FOUND';

        return {
            quizData,
            isServer
        };
    }

    componentDidMount() {
        // this.props.dispatch(startClock());
    }

    render() {
        const { quizData } = this.props;

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

        const { name, description, questions } = quizData;
        const questionCount = questions.length;
        const sortedQuestions = questions.sort((a, b) => Number(a.order) - Number(b.order));

        return (
            <Row type="flex" justify="start" className="base-layout__row">
                <BaseLayout columns={24} className="quiz-page">
                    <div
                        style={{ background: '#fff', padding: 24, marginTop: 32, height: '100%' }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <Title>{name}</Title>
                            <Text>In this quiz you will learn how to:</Text>
                            <Title level={4} style={{ marginTop: 12 }}>{description}</Title>
                            <Text type="secondary">{questionCount} questions</Text>
                        </div>
                        <div>
                            {sortedQuestions.map(question =>
                                <Question questionData={question} key={question.order} />
                            )}
                        </div>
                    </div>
                </BaseLayout>
            </Row>
        );
    }
}

export default connect(state => state)(QuizPage)
