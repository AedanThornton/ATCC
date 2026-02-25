import "/src/styles/cardsStyle.css"
import "./DoomCard.css"; // Add corresponding CSS for styling
import getIcon from "../../utils/iconUtils.jsx";
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import CardFooter from "../../CardFooter.jsx";

const DoomCard = ({ doom, index, currentSide }) => {
  let side = currentSide
  if (currentSide === 1) side = ""
  
  return (
    <div className={`card doom ${doom.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div style={{display: "flex", height: "500px"}}>
        <div className="doom-book">
          <div className="doom-card-number-banner">
            <div className="doom-card-number-banner__triangle">{doom.cardNumber === "IO" ? "1": doom.cardNumber}{side ? "B" : "A"}</div>
          </div>
          <div className="doom-book-middle-pages">
            <div className="doom-book-top-page">

              <div>
                <div className="doom-title" style={{ fontSize: Math.min(19, 400 / (1.1 * doom.name.length)) }}>
                  {doom["name" + side].toUpperCase()}
                </div>

                <div className="doom-flavor">
                  {doom["flavor" + side] && doom["flavor" + side].map((paragraph, index) => (
                    <p key={index}>{paragraph}.</p>
                  ))}
                </div>
                <span className="doom-rules-title">
                  RULES
                </span>
                <div>
                  {doom["rules" + side] && doom["rules" + side].map((paragraph, index) => (
                    <p key={index}><FormattedParagraph paragraph={paragraph} invertIcons={true} /></p>
                  ))}
                </div>
              </div>
              

              {/* Info */}
              <div>
                <CardFooter cardIDs={doom.cardIDs} bkgdColor="black" />
              </div>


            </div>
          </div>
        </div>
        <div className="doom-panel">{getIcon({name: "Doom", size: "18rem"})}</div>
      </div>
    </div>
  );
};

export default DoomCard;
