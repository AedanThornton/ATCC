import * as React from 'react';
import Tippy from '@tippyjs/react';
import Keywords from '/src/data/JSON/keywords.json';

const createTooltip = (name, index) => {
  if (!Keywords[name]) return name;

  return (
    <Tippy key={index} className="tooltip">
      <h3>{name}</h3>
      {Keywords[name].text?.map((t, index2) => (
        <span key={index2} style={t.formatting}>
          {t.subtype && <h5>{t.subtype}</h5>}
          {t.text}
        </span>
      ))}
    </Tippy>
  );
};

const utils = {
  interpolateTooltips: (str) => {
    return <>{str.split(/\b/).map((word, index) => createTooltip(word, index))}</>
  }
};

export default utils;