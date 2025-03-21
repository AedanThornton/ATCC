import React from "react";
import utils from "../utils/index";

const PatternTable = ({table, type}) => (
    <div className={`pattern-table ${type.toLowerCase()}-table`}>
        {type === "Kratos"
        ? table.map((row, index) => (
            <div className="kratos-full-row">
            <div className="kratos-rage-box"><div className="kratos-rage-number">{index}</div></div>
            <div key={index} className="kratos-row">
                {row.map((option, index) =>
                <div key={index} className="kratos-option">
                    {option[0].x_value && `${option[0].x_value} `}{utils.getIcon(option[0].name, option[0].x_value ? undefined : "Power", undefined, "1.3em")}
                    {option[1]?.name && (<>{option[1].x_value && ` + ${option[1].x_value} `}{utils.getIcon(option[1].name, option[1].x_value ? undefined : "Power", undefined, "1.3em")}</>)}
                    {option[2]?.name && (<>{option[2].x_value && ` + ${option[2].x_value} `}{utils.getIcon(option[2].name, option[2].x_value ? undefined : "Power", undefined, "1.3em")}</>)}
                </div>
                )}
            </div>
            <div className="kratos-rage-box"><div className="kratos-rage-number">{index}</div></div>
            </div>
        ))
        : table.map((row, index) => (
            <div key={index} className="trauma-row">{row.range}{/*put the threshold symbol here*/}</div> 
        ))
        }
    </div>
)

export default PatternTable