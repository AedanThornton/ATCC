import { useEffect, useState } from 'react';
import CardList from '../components/catalog/CardList';
import Backpack from '../components/backpack/Backpack';
import DragDropWrapper from '../components/backpack/DragDropWrapper';
import { useLayout } from '../context/LayoutContext';
import { CatalogLayoutMain, CatalogLayoutTopbar } from '../components/catalog/CatalogLayout';

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
    "backpack": null
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