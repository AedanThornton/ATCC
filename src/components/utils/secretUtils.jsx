import React, { useState } from 'react';
import icon from '/src/assets/icons/Blindspot.svg';

const SecretOverlay = (text, index) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <div key={index} className="secret-overlay">
          <span>Spoiler Warning:</span>
          <span>{text}</span>
        </div>
      )}
      <img className="secret-toggle" src={icon} style={{height: "25px"}} onClick={() => (isVisible ? setIsVisible(false) : setIsVisible(true))}/>
    </>
  );
};

export default SecretOverlay;
