import { useEffect, useState } from 'react';
import CardList from '../components/catalog/CardList';
import Backpack from '../components/backpack/Backpack';
import DragDropWrapper from '../components/backpack/DragDropWrapper';
import { useLayout } from '../context/LayoutContext';
import { CatalogLayoutMain, CatalogLayoutTopbar } from '../components/catalog/CatalogLayout';
import { BackpackLayoutTopbar } from '../components/backpack/BackpackLayout';
import PageArrow from "../components/pagearrow/PageArrow";
import getIcon from '../components/utils/iconUtils';

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
    <DragDropWrapper>
      <div className="card-list-main">
        {subpage === "backpack" && <PageArrow icon={getIcon({ name: "Catalog", invert: true })} funcTrigger={() => setSubpage("cardlist")} variant={"catalog-arrow"} />}

        {subpages[subpage]}

        {subpage === "cardlist" && <PageArrow icon={getIcon({ name: "Backpack", invert: true })} funcTrigger={() => setSubpage("backpack")} variant={"backpack-arrow"} />}
      </div>
    </DragDropWrapper>
  );
}
export default CardLibraryPage;