// NPM Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';

// UI Dependencies
import { Typography, Form, Input, Button, Spin } from 'antd';

// Local Dependencies
import InputCopyButton from './input-copy-button';
import { createInvoice } from '../actions';

const { Title, Text } = Typography;

class CreateQuizFrom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    componentDidUpdate = (prevProps) => {
        const { invoiceStatus } = this.props;

        if (invoiceStatus !== prevProps.invoiceStatus) {
            this.setState({
                loading: false
            });
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { amount, senderName } = values;
                const { quizId } = this.props;
                const forceNumber = Number(amount);

                this.props.dispatch(createInvoice({ amount: forceNumber, senderName, quizId }));
                this.setState({ loading: true });
            }
        });
    };

    validateAmount = (rule, value, callback) => {
        if (value < 100) {
            callback('Gifts must over 100 sats');
        } else if (value % 1 !== 0) {
            callback('Decimals not supported');
        } else if (value > 100000) {
            callback('Only gifts under 100,001 sats supported');
        } else {
            callback();
        }
    };

    validateSenderName = (rule, value, callback) => {
        if (value && value.length > 15) {
            callback('Recipient name must be under 15 characters.');
        } else {
            callback();
        }
    };

    numbersOnly = (value, prevValue = '') => {
        const reg = /^[0-9]+$/;
        if (reg.test(value) || value === '') {
            return value;
        }
        return prevValue;
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { quizId, quizName, invoiceStatus, fundedQuiz } = this.props;
        const { loading } = this.state;

        if (loading) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Spin tip="loading..." size="large" />
                </div>
            );
        }

        if (Object.keys(invoiceStatus).length !== 0) {
            const {
                lightningInvoice, status, orderId
            } = invoiceStatus;

            if (status === 'paid') {
                if (Object.keys(fundedQuiz).length !== 0) {
                    return (
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: 20 }}>
                                🎊 <b>Payment received!</b> 🎊
                            </p>
                            <p style={{ marginBottom: 20 }}>
                                <b>Your personal quiz link is below</b> 👇
                            </p>
                            <p style={{ marginBottom: 20 }}>
                                <InputCopyButton text={`https://react-sparkle.now.sh/quiz/${fundedQuiz.id}`} />
                            </p>
                        </div>
                    );
                }

                return (
                    <div style={{ textAlign: 'center' }}>
                        <Spin tip="loading..." size="large" />
                    </div>
                );
            }

            return (
                <div style={{ textAlign: 'center' }}>
                    <p>Pay invoice with a Lightning compatible wallet to complete your quiz</p>
                    <a href={`lightning:${lightningInvoice.payreq}`}>
                        <QRCode
                            value={lightningInvoice.payreq}
                            size={128}
                            style={{ marginBottom: 12 }}
                            renderAs="svg"
                        />
                    </a>
                    <InputCopyButton text={lightningInvoice.payreq} />
                </div>
            );

        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: 12 }}>
                        <Text strong>Your quiz template:</Text>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Text strong style={{ fontSize: 18 }}>"{quizName}"</Text>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <Text strong>Specify a prize for completing your quiz:</Text>
                    </div>
                </div>
                <Form.Item>
                    {getFieldDecorator('amount', {
                        rules: [{ validator: this.validateAmount }],
                        normalize: this.numbersOnly,
                        validateTrigger: 'onBlur'
                    })(
                        <Input
                            style={{ width: '100%' }}
                            placeholder="Quiz reward amount (satoshi)"
                            size="large"
                            addonAfter="sats"
                            min={1}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('senderName', {
                        rules: [{ validator: this.validateSenderName }]
                    })(
                        <Input
                            style={{ width: '100%' }}
                            placeholder="Sender name (optional)"
                            size="large"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        size="large"
                        style={{ width: '100%' }}
                        type="primary"
                        htmlType="submit"
                        shape="round"
                    >
                        Create Quiz
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedCreateQuizFrom = Form.create()(CreateQuizFrom);

const mapStateToProps = ({ invoiceStatus, fundedQuiz }) => ({ invoiceStatus, fundedQuiz });
export default connect(mapStateToProps)(WrappedCreateQuizFrom);
