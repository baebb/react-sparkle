// NPM Dependencies
import React from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-unfetch';
import Link from 'next/link'

// UI Dependencies
import { Row, Typography, Button } from 'antd';

// Local Dependencies
import BaseLayout from "../components/base-layout";

const { Title, Text } = Typography;

class Index extends React.Component {
    static async getInitialProps(props) {
        const { query, isServer } = props.ctx;

        const res = await fetch(`http://138.68.239.62/quiz/`);
        const quizes = res.ok ? await res.json() : 'NOT_FOUND';

        return {
            quizes,
            isServer
        };
    }

    componentDidMount() {

    }

    render() {
        const { quizes } = this.props;

        console.log('quizes', quizes);

        return (
            <Row type="flex" justify="start" className="base-layout__row">
                <BaseLayout columns={24} className="quiz-page">
                    <div style={{ background: '#fff', padding: 48, marginTop: 32, height: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Title style={{ marginBottom: 40 }}>
                                Build quizes with bitcoin prizes using SparkleSlap
                            </Title>
                            <div>
                                <Text strong>Get started with one of our templates:</Text>
                            </div>
                            {quizes.map(quiz =>
                                <Link key={quiz.id} href={`https://react-sparkle.now.sh/quiz/${quiz.id}`}>
                                    <Title level={4}>{quiz.title}</Title>
                                </Link>
                            )}
                        </div>
                    </div>
                </BaseLayout>
            </Row>
        );
    }
}

export default connect(state => state)(Index)
