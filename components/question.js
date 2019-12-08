// NPM Dependencies
import React from 'react';

function Question({ lastUpdate, light }) {
    return (
        <div className={light ? 'light' : ''}>
            {format(new Date(lastUpdate))}
            <style jsx>{`
        div {
          padding: 15px;
          display: inline-block;
          color: #82fa58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }
        .light {
          background-color: #999;
        }
      `}</style>
        </div>
    )
}

export default Question
