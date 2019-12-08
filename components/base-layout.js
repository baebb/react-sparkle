// NPM Dependencies
import React from 'react';

// UI Dependencies
import { Layout, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const BaseLayout = ({
    className,
    children,
    style,
    columns
}) => (
    <Col span={columns}>
        <Layout
            theme="light"
            className={`base-layout ${className}`}
            style={{ ...style }}
        >
            <Header theme="light">
                <div className="logo">
                    <img src="../sparkle_logo_grn.png" width={120} />
                </div>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Sparkle ©2019 Created with ⚡ & ❤️️
            </Footer>
        </Layout>
    </Col>
);

export default BaseLayout;
