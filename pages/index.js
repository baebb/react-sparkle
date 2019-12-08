// NPM Dependencies
import React from 'react'
import { connect } from 'react-redux'

// UI Dependencies
import { Layout, Menu, Row } from 'antd';

// Local Dependencies
import { loadData, tickClock } from '../actions'
import BaseLayout from "../components/base-layout";

const { Header, Content, Footer } = Layout;

class Index extends React.Component {
    static async getInitialProps(props) {
        const { store, isServer } = props.ctx;
        store.dispatch(tickClock(isServer));

        if (!store.getState().placeholderData) {
            store.dispatch(loadData());
        }

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
