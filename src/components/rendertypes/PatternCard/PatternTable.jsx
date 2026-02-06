import getIcon from "../../utils/iconUtils"

const PatternTable = ({table, type}) => (
    <div className={`pattern-table ${type.toLowerCase()}-table`} key={type}>
        {type === "Kratos"
        ? table.map((row, index) => (
            <div key={index} className="kratos-full-row">
                <div style={{flex: 1}}></div>
                <div className="kratos-rage-box"><div className="kratos-rage-number">{index+1}</div></div>
                <div key={index} className="kratos-row" style={{justifyContent: (row.length === 1 && 'center')}}>
                    {row.map((option, index) =>
                    <div key={index} className="kratos-option">
                        {option[0].x_value && `${option[0].x_value} `}{getIcon({name: option[0].name, type: option[0].x_value ? undefined : "Power", size: "1.3rem", invert: true})}
                        {option[1]?.name && (<>{" +"}{option[1].x_value && `${option[1].x_value} `}{getIcon({name: option[1].name, type: option[1].x_value ? undefined : "Power", size: "1.3rem", invert: true})}</>)}
                        {option[2]?.name && (<>{" +"}{option[2].x_value && `${option[2].x_value} `}{getIcon({name: option[2].name, type: option[2].x_value ? undefined : "Power", size: "1.3rem", invert: true})}</>)}
                    </div>
                    )}
                </div>
                <div className="kratos-rage-box"><div className="kratos-rage-number">{index+1}</div></div>
                <div style={{flex: 1}}></div>
            </div>
        ))
        : table.map((row, index) => (
            <div key={index} className="trauma-row">
                <div>{row.range}</div>
                <div style={{width: "2rem", display: "flex", justifyContent: "center"}}>
                    {getIcon({name: row.type, size: "2.5rem"})}
                </div>
            </div> 
        ))
        }
    </div>
)

export default PatternTable