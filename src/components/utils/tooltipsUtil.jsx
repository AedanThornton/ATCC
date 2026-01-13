import Tippy from '@tippyjs/react';
import './utils.css';

import StandardKeywords from '/src/data/JSON/keywords.json';
import TitanAbilities from '/src/data/JSON/titanAbilityData.json';
import PrimordialAbilities from '/src/data/JSON/primordialAbilityData.json'
import FormattedParagraph from '../FormattedParagraph';

const Keywords = {...TitanAbilities, ...StandardKeywords, ...PrimordialAbilities}

const keywordLookup = {};

Object.entries(Keywords).forEach(([key, def]) => {
  keywordLookup[key.toLowerCase()] = key;
  Object.keys(def)
    .filter(k => k.startsWith("subName"))
    .forEach(subKey => {
      keywordLookup[def[subKey].toLowerCase()] = key;
    });
});

const createTooltip = (name, index) => {
  let isAuto = false
  if (name.startsWith("Auto-")) {
    name = name.slice(5)
    isAuto = true
  }

  const keyword =
    keywordLookup[name.toLowerCase()] ||
    keywordLookup[name.toLowerCase() + " x"] ||
    keywordLookup[name.toLowerCase().slice(0, -1) + "x"] ||
    keywordLookup[name.toLowerCase().slice(0, -2) + "x"] ||
    keywordLookup[name.toLowerCase() + " x/+x"] ||
    keywordLookup[name.toLowerCase().slice(0, -1) + "x/+x"] ||
    keywordLookup[name.toLowerCase().slice(0, -2) + "x/+x"] ||
    keywordLookup[name.toLowerCase() + " (x)"] ||
    keywordLookup[name.toLowerCase().split(' ').slice(1).join(' ')] ||
    keywordLookup[name.toLowerCase().split(' ').slice(1).join(' ') + " x"] ||
    (name.toLowerCase().startsWith("ranged") && "ranged y–x") ||
    name;
  if (!Keywords[keyword]) return `${isAuto ? "Auto-" : ""}${name}`

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
          <div className='tooltip-title'>{isAuto && "Auto-"}{keyword}</div>
            <span>
              {isAuto && <>
                <span>"Auto-" makes the following ability trigger during the first ability window instead of the listed timing</span>
                <br />
                <br />
              </>}
              <FormattedParagraph paragraph={keywordData.mainDef} inLineGate={true} />
              {Array.from({ length: 8 }, (_, i) => {
                return<>{keywordData["subName" + i] && 
                  <>
                    <div className='tooltip-subtitle' key={"subtitle-" + i}>{keywordData["subName" + i]}</div>
                    {keywordData["subDef" + i] ? <FormattedParagraph paragraph={keywordData["subDef" + i]} inLineGate={true} /> : <span>Missing definition...</span>}
                  </>
                }</>
              })}
              
            </span>
        </div>
      }
    >
      <span className="tooltip-trigger">{isAuto && "Auto-"}{name}</span>
    </Tippy>
  );
};

export const interpolateTooltips = (str) => <>{str.split(/\b/).map((word, index) => createTooltip(word, index))}</>
export default createTooltip;