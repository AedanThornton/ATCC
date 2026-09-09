const PlusButton = ({ clickFunc = ()=>{} }) => {
  return <div onClick={() => clickFunc()} className="plus-button">+</div>
}

export default PlusButton