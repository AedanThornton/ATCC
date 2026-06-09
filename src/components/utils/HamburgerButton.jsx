const HamburgerButton = ({clickFunc = ()=>{}}) => {
  return <button className='filters-hamburger-button' onClick={clickFunc}>
    <div className='hamburger-bar'></div>
    <div className='hamburger-bar'></div>
    <div className='hamburger-bar'></div>
  </button>
}

export default HamburgerButton