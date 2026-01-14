import "/src/styles/cardsStyle.css"
import "./StoryCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../FormattedParagraph.jsx";
import getIcon from "../../utils/iconUtils.jsx";

const StoryCard = ({ story, index, currentSide }) => {
  let side = currentSide
  if (currentSide === 1) side = ""
  
  return (
    <div className={`card story ${story.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div style={{display: "flex", height: "500px"}}>
        <div className="story-panel">{getIcon("Progress", undefined, undefined, "18rem")}</div>
        <div className="story-book">
          <div className="story-card-number-banner">
            <div className="story-card-number-banner__triangle">{story.cardNumber === "IO" ? "1": story.cardNumber}{side ? "B" : "A"}</div>
          </div>
          <div className="story-book-middle-pages">
            <div className="story-book-top-page">

              <div>
                <div className="story-title" style={{ fontSize: Math.min(19, 400 / (1.1 * story.name.length)) }}>
                  {story["name" + side].toUpperCase()}
                </div>

                <div className="story-flavor">
                  {story["flavor" + side] && story["flavor" + side].map((paragraph, index) => (
                    <p key={index}>{paragraph}.</p>
                  ))}
                </div>
                <span className="story-rules-title">
                  RULES
                </span>
                {story["rulesTitle" + side] && (<p><b>{story["rulesTitle" + side].replace(".", "")}</b></p>)}
                <div>
                  {story["rules" + side] && story["rules" + side].map((paragraph, index) => (
                    <p key={index}><FormattedParagraph paragraph={paragraph} /></p>
                  ))}
                </div>
              </div>
              

              {/* Info */}
              <div>
                <div className="story-info">Card Info</div>
                <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
                  <div className="card-info-header">ID(s)</div>
                  <div className="card-info-detail">{story.cardIDs.join(", ")}</div>
                </div>
                <div className="card-info centered">
                  <div className="card-info-header">Cycle</div>
                  <div className="card-info-detail">{story.cycle}</div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
