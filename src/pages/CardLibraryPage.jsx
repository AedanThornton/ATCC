import { useEffect, useState } from 'react';
import CardList from '../components/catalog/CardList';
import Backpack from '../components/backpack/Backpack';
import DragDropWrapper from '../components/backpack/DragDropWrapper';
import { useLayout } from '../context/LayoutContext';
import { CatalogLayoutMain, CatalogLayoutTopbar } from '../components/catalog/CatalogLayout';
import { BackpackLayoutTopbar } from '../components/backpack/BackpackLayout';
import PageArrow from "../components/pagearrow/PageArrow";
import getIcon from '../components/utils/iconUtils';
import SavedSets from '../components/savedsets/SavedSets';

function CardLibraryPage() {
  const [subpage, setSubpage] = useState("cardlist")
  const [savedSetsOpen, setSavedSetsOpen] = useState(false)
  const { setLayout } = useLayout()

  const subpages = {
    "cardlist": <CardList />,
    "backpack": <Backpack />,
  };

  const layouts = {
    "cardlist": {
      main: <CatalogLayoutMain />,
      topbar: <CatalogLayoutTopbar />
    },
    "backpack": {
      main: null,
      topbar: <BackpackLayoutTopbar />
    }
  }

  useEffect(() => {
    setLayout(layouts[subpage])
  }, [subpage])

  return (
    <DragDropWrapper>
      <div className="card-list-main">

        <div className='backpack__setslist-sidebar__container' style={{ transform: `translateX(${savedSetsOpen ? "-100%" : "0"})`, width: savedSetsOpen ? "0" : "initial", flex: savedSetsOpen ? "0" : "1"}}>
          <div className='backpack__setslist-sidebar' style={{display: savedSetsOpen ? "none" : "initial"}}>
            <SavedSets />
          </div>

          <div className='backpack__setslist-sidebar__thumb' onClick={() => setSavedSetsOpen(!savedSetsOpen)}>
            {getIcon({name: "Options", invert: true, size: "1.4em"})}
          </div>
        </div>
        
        {subpages[subpage]}

      </div>
    </DragDropWrapper>
  );
}
export default CardLibraryPage;