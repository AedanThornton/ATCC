const SecretOverlay = ({text, subText = "", isVisible}) => {

  return (
    <>
      {isVisible && (
        <div className="secret-overlay">
          <span>Spoiler Warning:</span>
          <span>{text}</span>
          {subText && <span>{subText}</span>}
        </div>
      )}
    </>
  );
};

export default SecretOverlay;
