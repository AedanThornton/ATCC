import React, { useState } from 'react';
import icon from '/src/assets/icons/Blindspot.svg';

const SecretOverlay = ({text}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <div className="secret-overlay">
          <span>Spoiler Warning:</span>
          <span>{text}</span>
        </div>
      )}
      <img className="secret-toggle" src={icon} style={{height: "25px"}} onClick={() => setIsVisible(!isVisible)}/>
    </>
  );
};

export default SecretOverlay;
