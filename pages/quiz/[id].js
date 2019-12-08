// NPM Dependencies
import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';

// UI Dependencies
import { Typography, Row } from 'antd';

// Component Dependencies
import BaseLayout from "../../components/base-layout";

const { Title } = Typography;

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

        return (
            <Row type="flex" justify="start" className="base-layout__row">
                <BaseLayout columns={24} className="quiz-page">
                    <div
                        style={{ background: '#fff', padding: 24, marginTop: 32, height: '100%' }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <Title>{quizData.name}</Title>
                            <Title level={4}>{quizData.description}</Title>
                        </div>
                        {quizData.questions.map = ({ youtube_url, question_text, answer }) => (
                            <div></div>
                        )}
                    </div>
                </BaseLayout>
            </Row>
        );
    }
}

export default connect(state => state)(QuizPage)
