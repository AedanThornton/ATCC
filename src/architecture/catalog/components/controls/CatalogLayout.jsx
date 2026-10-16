import { useState } from 'react';
import { useSpoilers } from "../../../../context/SpoilerContext.jsx";
import SearchBar from './SearchBar.jsx';
import ControlBar from './ControlBar.jsx';
import HamburgerButton from '../../../../components/utils/HamburgerButton.jsx';
import FilterSidebar from '../searchfilters/FilterSidebar.jsx'
import { useSavedSetsContext } from '../../../savedsets/hooks/SavedSetsContext.jsx';

export const CatalogLayoutTopbar = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const { savedSetsOpen } = useSavedSetsContext()
  const isNotMobile = window.matchMedia('(hover: hover)').matches;

  return <>
    <ControlBar />

    <div className='top-menu'>
      {!(savedSetsOpen && !isNotMobile) && <div className='filters-menu'>
        <HamburgerButton clickFunc={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)} />

        {isFilterSidebarOpen && <FilterSidebar />}
      </div>}
    </div>
  </>
}

export const CatalogLayoutMain = () => {
  const { spoilersEnabled } = useSpoilers();

  return <>
    <SearchBar />

    {!spoilersEnabled && <div className='layout-spoiler-warning-banner'>!! Warning: Spoilers are NOT hidden. !!</div>}
  </>

}