// NPM Dependencies
import React from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-unfetch';

// UI Dependencies
import { Row } from 'antd';

// Local Dependencies
import BaseLayout from "../components/base-layout";

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
        return (
            <Row type="flex" justify="start" className="base-layout__row">
                <BaseLayout columns={24} className="quiz-page">
                    <div style={{ background: '#fff', padding: 48, marginTop: 32 }}>

                    </div>
                </BaseLayout>
            </Row>
        );
    }
}

export default connect(state => state)(Index)
