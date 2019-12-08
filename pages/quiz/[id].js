// NPM Dependencies
import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';

// UI Dependencies
import { Layout, Menu, Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

class Index extends React.Component {
    static async getInitialProps(props) {
        // console.log('props', props);

        const { query, isServer } = props.ctx;
        const { id = null } = query;
        // store.dispatch(tickClock(isServer));
        //
        // if (!store.getState().placeholderData) {
        //     store.dispatch(loadData());
        // }
        //
        const res = await fetch(`http://138.68.239.62/quiz/${id}`);
        let quizData;
        if (res.ok) {
            quizData = await res.json();
        } else {
            quizData = 'NOT_FOUND';
        }

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

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo">
                        <img
                            src="../sparkle_logo_grn.png"
                            width={120}
                        />
                    </div>
                    {/*<Menu*/}
                    {/*    theme="light"*/}
                    {/*    mode="horizontal"*/}
                    {/*    defaultSelectedKeys={['2']}*/}
                    {/*    style={{ lineHeight: '64px' }}*/}
                    {/*>*/}
                    {/*    <Menu.Item key="1">Home</Menu.Item>*/}
                    {/*    /!*<Menu.Item key="2">nav 2</Menu.Item>*!/*/}
                    {/*    /!*<Menu.Item key="3">nav 3</Menu.Item>*!/*/}
                    {/*</Menu>*/}
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div
                        style={{ background: '#fff', padding: 24, marginTop: 32, height: '100%' }}
                    >
                        {quizData === 'NOT_FOUND' ?
                            <div style={{ textAlign: 'center' }}>
                                <Title>404 Quiz not found</Title>
                            </div>
                            :
                            <div style={{ textAlign: 'center' }}>
                                <Title>200 Quiz found</Title>
                            </div>
                        }
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
