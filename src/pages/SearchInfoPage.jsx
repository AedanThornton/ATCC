import "../styles/searchInfoPage.css"

function SearchInfoPage() {
  return (
    <div className='search-info-page'>
      <div className="search-info__title-section">
        <h2>Advanced Search Documentation</h2>
        <p>The search functionality on this site is powerful, providing a wide array of capabilities. Below is a guide on how to use its different features</p>
      </div>

      <div className="search-info__documentation">
        <h3>Search Tags</h3>
        <p>By default, the search bar assumes you are looking for the name of a card, but there are several pre-built search tags 
          capable of expanding or narrowing your search parameters:</p>
        <ul>
          <li>
            <b>'any:'</b>
            <p className="search-info__element-description">The 'any:' tag is the most versatile tag, searching for the following parameter within <i>any</i> field of the card (which may result in showing cards without a displayed version of that search term).</p>
            <p className="search-info__element-example">'any:shark'</p>
          </li>
          <li>
            <b>'id:'</b>
            <p className="search-info__element-description">The 'id:' tag can be used to search for any card ID that contains the following parameter (if an entire ID is specified, that will be the only card displayed).</p>
            <p className="search-info__element-example">'id:AA0003'</p>
          </li>
          <li>
            <b>'traits:'</b>
            <p className="search-info__element-description">The 'traits:' tag can be used to search for the following parameter within the Traits of cards.</p>
            <p className="search-info__element-example">'traits:wood', 'traits:voyage'</p>
          </li>
          <li>
            <b>'slot:'</b>
            <p className="search-info__element-description">This tag can be used to narrow the search to only look for Gear cards that have the specified Slot type.</p>
            <p className="search-info__element-example">"slot:3 hands", "slot:2 1 hands", "slot:support"</p>
          </li>
          <li>
            <b>No tag</b>
            <p className="search-info__element-description">The default functionality without a tag specified is to search for any card whose name contains the parameter specified.</p>
          </li>
        </ul>

        <h3>And/Or usage</h3>
        <p>All search types can be combined together in the following ways to create complex searches:</p>
        <ul>
          <li>
            <b>AND (',')</b>
            <p className="search-info__element-description">Search parameters can be combined together by comma-separating them. Cards will only display if they meet all requirements simultaneously.</p>
            <p className="search-info__element-example">'slot:1 hand, traits:wood' - this will display all cards that have both 1 hand slot and a wood trait.</p>
          </li>
          <li>
            <b>OR ('||')</b>
            <p className="search-info__element-description">Search parameters can be differentiated by placing a double-pipe between them ('||'). Cards will display if they meet any of the search parameter groups separated this way.</p>
            <p className="search-info__element-example">'slot:1 hand, traits:wood || slot:2 hands, teeth' - this will display all cards that have both 1 hand slot and a wood trait as well as all two-handed cards with 'teeth' anywhere in the name.</p>
          </li>
        </ul>
      </div>


    </div>
  );
}

export default SearchInfoPage;