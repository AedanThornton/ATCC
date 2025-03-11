import * as React from 'react';
import Tippy from '@tippyjs/react';
import Keywords from '/src/data/JSON/keywords.json';
import './utils.css';

const createTooltip = (name, index) => {
  const keywordData = Keywords[name];

  if (!keywordData) {
    return <span key={index}>{name}</span>; 
  }

  return (
    <Tippy key={index} content={
      <div className="tooltip">
        <div className='tooltip-title'>{name}</div>
        {keywordData.map((entry, index2) => (
          <span key={index2} style={entry.formatting || {}}>
            {entry.subtype && <div className='tooltip-subtitle'>{entry.subtype}</div>}
            {entry.text}
          </span>
        ))}
      </div>
    }>
      <span className="tooltip-trigger">{name}</span>
    </Tippy>
  );
};

const utils = {
  interpolateTooltips: (str) => {
    return <>{str.split(/\b/).map((word, index) => createTooltip(word, index))}</>
  }
};

export default utils;