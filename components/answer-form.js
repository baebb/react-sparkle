// NPM Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI Dependencies
import { Form, Radio, Button } from 'antd';

// Local Dependencies
import { addCorrectQuestion } from '../actions';

const radioStyle = {
    display: 'block',
    lineHeight: '30px',
    fontSize: '18px',
    marginBottom: '8px'
};

class AnswerForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.checkAnswer(values);
            }
        });
    };

    checkAnswer = ({ answer }) => {
        const { answers, questionOrder } = this.props;
        const correctAnswer = answers.find(answer => answer.correct).content;

        if (answer !== correctAnswer) {
            this.props.form.setFields({
                answer: {
                    errors: [new Error('Incorrect answer. Rewatch the video and try again')],
                }
            });
        } else {
            this.props.dispatch(addCorrectQuestion(questionOrder));
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { answers, preview } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('answer', {
                        rules: [{ required: true, message: 'Select your answer before continuing' }],
                    })(
                        <Radio.Group size="large">
                            {answers.map(({ content }) =>
                                <Radio style={radioStyle} className="answer-radio" key={content} value={content}>
                                    {content}
                                </Radio>
                            )}
                        </Radio.Group>
                    )}
                </Form.Item>
                {!preview &&
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Check your answer
                        </Button>
                    </Form.Item>
                }
            </Form>
        );
    }
}

const WrappedAnswerForm = Form.create()(AnswerForm);

export default connect()(WrappedAnswerForm);
