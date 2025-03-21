import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import './utils.css';

import StandardKeywords from '/src/data/JSON/keywords.json';
import TitanAbilities from '/src/data/JSON/titanAbilityData.json';

const Keywords = {...TitanAbilities, ...StandardKeywords}

const createTooltip = (name, index, textParser) => {  
  let keyword="";
  if (Keywords[name]) keyword = name;
  else if (Keywords[name + " X"]) keyword = name + " X";
  else if (Keywords[name + " Y-X"]) keyword = name + " Y-X";
  else if (Keywords[name + " X/+X"]) keyword = name + " X/+X";
  else if (Keywords[name.split(' ').slice(1).join(' ')]) keyword = name.split(' ').slice(1).join(' ');
  else if (Keywords[name.split(' ').slice(1).join(' ') + " X"]) keyword = name.split(' ').slice(1).join(' ') + " X";
  else return name;

  const keywordData = Keywords[keyword];

  return (
    <Tippy 
      key={index} 
      interactive 
      duration={0} 
      offset={[0,0]}
      appendTo={document.body}
      content={
      <div className="tooltip">
        <div className='tooltip-title'>{keyword}</div>
        {keywordData.map((entry, index2) => (
          <span key={index2} style={entry.formatting || {}}>
            {entry.subtype && <div className='tooltip-subtitle'>{entry.subtype}</div>}
            {textParser ? textParser(entry.text) : entry.text}
          </span>
        ))}
      </div>
    }>
      <span className="tooltip-trigger">{name}</span>
    </Tippy>
  );
};

const utils = {
  interpolateTooltips: (str) => <>{str.split(/\b/).map((word, index) => createTooltip(word, index))}</>,
  createTooltip: createTooltip
};

export default utils;