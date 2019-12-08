// NPM Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Form, Radio, Button } from 'antd';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
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
        const { answers } = this.props;
        const correctAnswer = answers.find(answer => answer.correct).content;

        if (answer !== correctAnswer) {
            this.props.form.setFields({
                answer: {
                    errors: [new Error('Incorrect answer. Rewatch the video and try again')],
                }
            });
        } else {

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
                        <Radio.Group>
                            {answers.map(({ content }) =>
                                <Radio style={radioStyle} key={content} value={content}>
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

export default WrappedAnswerForm;
