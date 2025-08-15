const SecretOverlay = ({text, isVisible, setIsVisible}) => {
  return (
    <>
      {isVisible && (
        <div className="secret-overlay">
          <span>Spoiler Warning:</span>
          <span>{text}</span>
        </div>
      )}
    </>
  );
};

export default SecretOverlay;
