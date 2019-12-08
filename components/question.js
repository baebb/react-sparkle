// NPM Dependencies
import React from 'react';
import ReactPlayer from 'react-player';

// UI Dependencies
import { Typography } from 'antd';

const { Title, Text } = Typography;

const Question = ({ questionData }) => {
    const { youtube_url, question_text, answer, order } = questionData;

    return (
        <div className="question-item">
            <Title level={4}>Question {order}:</Title>
            <Text strong>👇 Watch the video below before answering the question 👇</Text>
            <div style={{ marginTop: 24, marginBottom: 24 }}>
                <ReactPlayer
                    url={youtube_url}
                    playing={false}
                />
            </div>
            <Title level={4}>{question_text}</Title>
        </div>
    )
};

export default Question
