// NPM Dependencies
import React from 'react'
import { connect } from 'react-redux'

// UI Dependencies
import { Layout, Row } from 'antd';

// Local Dependencies
import BaseLayout from "../components/base-layout";

class Index extends React.Component {
    static async getInitialProps(props) {
        const { isServer } = props.ctx;

        return { isServer };
    }

    componentDidMount() {

    }

    render() {
        return (
            <Row type="flex" justify="start" className="base-layout__row">
                <BaseLayout columns={24} className="quiz-page">
                    <div
                        style={{ background: '#fff', padding: 24, marginTop: 32, height: '100%' }}
                    >
                        Test content and questions would go here
                    </div>
                </BaseLayout>
            </Row>
        );
    }
}

export default connect(state => state)(Index)
