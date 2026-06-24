import { useEffect, useState } from 'react';
import CardList from '../components/catalog/CardList';
import Backpack from '../components/backpack/Backpack';
import DragDropWrapper from '../components/backpack/DragDropWrapper';
import { useLayout } from '../context/LayoutContext';
import { CatalogLayoutMain, CatalogLayoutTopbar } from '../components/catalog/CatalogLayout';
import { BackpackLayoutTopbar } from '../components/backpack/BackpackLayout';

function CardLibraryPage() {
  const [subpage, setSubpage] = useState("cardlist")
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
    <div className="card-list-main">
      <DragDropWrapper subpage={subpage} setSubpage={setSubpage}>
        {subpages[subpage]}
      </DragDropWrapper>
    </div>
  );
}
export default CardLibraryPage;