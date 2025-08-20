import React from "react";
import utils from "../../utils/index";

const PatternTable = ({table, type}) => (
    <div className={`pattern-table ${type.toLowerCase()}-table`} key={type}>
        {type === "Kratos"
        ? table.map((row, index) => (
            <div key={index} className="kratos-full-row">
                <div className="kratos-rage-box"><div className="kratos-rage-number">{index+1}</div></div>
                <div key={index} className="kratos-row">
                    {row.map((option, index) =>
                    <div key={index} className="kratos-option">
                        {option[0].x_value && `${option[0].x_value} `}{utils.getIcon(option[0].name, option[0].x_value ? undefined : "Power", undefined, "1.3rem")}
                        {option[1]?.name && (<>{" + "}{option[1].x_value && `${option[1].x_value} `}{utils.getIcon(option[1].name, option[1].x_value ? undefined : "Power", undefined, "1.3rem")}</>)}
                        {option[2]?.name && (<>{" + "}{option[2].x_value && `${option[2].x_value} `}{utils.getIcon(option[2].name, option[2].x_value ? undefined : "Power", undefined, "1.3rem")}</>)}
                    </div>
                    )}
                </div>
                <div className="kratos-rage-box"><div className="kratos-rage-number">{index+1}</div></div>
            </div>
        ))
        : table.map((row, index) => (
            <div key={index} className="trauma-row">
                <div>{row.range}</div>
                <div style={{width: "2rem", display: "flex", justifyContent: "center"}}>
                    {utils.getIcon(row.type, undefined, undefined, "2.5rem")}
                </div>
            </div> 
        ))
        }
    </div>
)

export default PatternTable