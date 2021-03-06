// NPM Dependencies
import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';

// UI Dependencies
import { Typography, Row, Modal, Button, Col } from 'antd';

// Component Dependencies
import BaseLayout from '../../components/base-layout';
import Question from '../../components/question';
import CreateQuizFrom from '../../components/create-quiz-form'

// Local Dependencies
import { createInvoice } from '../../actions';

const { Title, Text } = Typography;

class PreviewPage extends React.Component {
    static async getInitialProps(props) {
        const { query, isServer } = props.ctx;
        const { id = null } = query;

        const res = await fetch(`http://138.68.239.62/quiz/${id}`);
        const quizData = res.ok ? await res.json() : 'NOT_FOUND';

        return {
            quizData,
            isServer
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
        // this.props.dispatch(startClock());
    }

    createNewQuiz({ amount, senderName }) {
        console.log(amount, senderName);

        // axios.post('https://api.lightning.gifts/create', {
        //     amount,
        //     senderName
        // })
        //     .then(response => {
        //         console.log('response.data', response.data);
        //     })
        //     .catch(error => console.log(error));
    }

    render() {
        const { quizData, fundedQuiz } = this.props;
        const { showModal } = this.state;


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

        const { name, description, questions, id } = quizData;
        const questionCount = questions.length;
        const sortedQuestions = questions.sort((a, b) => Number(a.order) - Number(b.order));

        return (
            <Row type="flex" justify="start" className="base-layout__row">
                <BaseLayout columns={24} className="quiz-page">
                    <div style={{ background: '#fff', padding: 48, marginTop: 32 }}>
                        <div style={{ textAlign: 'center' }}>
                            <Title style={{ marginBottom: 40 }}>{name}</Title>
                            <Text>In this quiz you will learn about:</Text>
                            <Title level={3} style={{ marginTop: 12 }}>{description}</Title>
                            <Text type="secondary">{questionCount} questions</Text>
                            <div style={{ marginTop: 32 }}>
                                <Button
                                    type="primary"
                                    shape="round"
                                    onClick={() => this.setState({ showModal: true })}
                                >
                                    Make a sharable quiz from this template
                                </Button>
                            </div>
                        </div>
                    </div>
                    {sortedQuestions.map(question =>
                        <Question
                            questionData={question}
                            key={question.order}
                            preview={true}
                        />
                    )}
                </BaseLayout>
                <Modal
                    visible={showModal}
                    onCancel={() => this.setState({ showModal: false })}
                    footer={null}
                    maskClosable={false}
                >
                    <Row type="flex" align="middle" style={{ minHeight: 300 }}>
                        <Col span={16} offset={4}>
                            <CreateQuizFrom
                                quizId={id}
                                quizName={name}
                                createQuiz={this.createNewQuiz}
                            />
                        </Col>
                    </Row>
                </Modal>
            </Row>
        );
    }
}

const mapStateToProps = ({ fundedQuiz }) => ({ fundedQuiz });
export default connect(state => state)(PreviewPage)
