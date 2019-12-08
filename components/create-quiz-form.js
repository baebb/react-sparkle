// NPM Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI Dependencies
import { Typography, Form, Input, Button, Spin } from 'antd';

// Local Dependencies
import { createInvoice } from '../actions';

const { Title, Text } = Typography;

class CreateQuizFrom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

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
        const { quizId, quizName } = this.props;
        const { loading } = this.state;

        if (loading) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Spin tip="loading..." size="large" />
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

const mapStateToProps = ({ invoiceStatus }) => ({ invoiceStatus });
export default connect(mapStateToProps)(WrappedCreateQuizFrom);
