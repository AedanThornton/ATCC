import Tippy from '@tippyjs/react';
import './utils.css';

import StandardKeywords from '/src/data/JSON/keywords.json';
import TitanAbilities from '/src/data/JSON/titanAbilityData.json';
import FormattedParagraph from '../FormattedParagraph';

const Keywords = {...TitanAbilities, ...StandardKeywords}

const createTooltip = (name, index) => {
  let keyword="";
  if (Keywords[name]) keyword = name;
  else if (Keywords[name + " X"]) keyword = name + " X";
  else if (Keywords[name + " X/+X"]) keyword = name + " X/+X";
  else if (Keywords[name.split(' ').slice(1).join(' ')]) keyword = name.split(' ').slice(1).join(' ');
  else if (Keywords[name.split(' ').slice(1).join(' ') + " X"]) keyword = name.split(' ').slice(1).join(' ') + " X";
  else if (Keywords[name.slice(0, -1) + "X"]) keyword = name.slice(0, -1) + "X";
  else if (name.slice(0, -1).endsWith("Limit ") && Keywords[name.slice(0, -1) + "X/+X"]) keyword = name.slice(0, -1) + "X/+X";
  else if (name.slice(0, -2).endsWith("Limit ") && Keywords[name.slice(0, -2) + "X/+X"]) keyword = name.slice(0, -2) + "X/+X";
  else if (name.startsWith("Ranged")) keyword = "Ranged Y\u2013X";
  else if (name === "Commit") keyword = "Commit (X)";
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
            <span>
              <FormattedParagraph paragraph={keywordData.mainDef} inLineGate={true} />
              {Array.from({ length: 8 }, (x, i) => {
                {keywordData["subName" + x] && 
                  <>
                    <div className='tooltip-subtitle' key={"subtitle-" + i}>{keywordData["subName" + x]}</div>
                    {keywordData["subDef" + x] ? <FormattedParagraph paragraph={keywordData["subDef" + x]} inLineGate={true} /> : <span>Missing definition...</span>}
                  </>
                }
              })}
              
            </span>
        </div>
      }
    >
      <span className="tooltip-trigger">{name}</span>
    </Tippy>
  );
};

export const interpolateTooltips = (str) => <>{str.split(/\b/).map((word, index) => createTooltip(word, index))}</>
export default createTooltip;