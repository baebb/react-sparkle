// NPM Dependencies
import React from 'react'
import { connect } from 'react-redux'

// UI Dependencies
import { Layout, Menu  } from 'antd';

// Local Dependencies
import { loadData, tickClock } from '../actions'

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
        // this.props.dispatch(startClock());
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo">
                        <img
                            src="./sparkle_logo_grn.png"
                            width={120}
                        />
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">Home</Menu.Item>
                        {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                        {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div
                        style={{ background: '#fff', padding: 24, marginTop: 32, minHeight: 280 }}
                    >
                        Test content and questions would go here
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Sparkle ©2019 Created with ⚡ & ❤️️
                </Footer>
            </Layout>
        );
    }
}

export default connect(state => state)(Index)
