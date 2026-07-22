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
import { SavedSetsProvider } from '../context/SavedSetsContext';

function CardLibraryPage() {
  const { setLayout } = useLayout()

  useEffect(()=> {
    setLayout({
      main: <CatalogLayoutMain />,
      topbar: <CatalogLayoutTopbar />
    })
  }, [])

  return (
    <DragDropWrapper>
      <div className="card-list-main">
        <SavedSetsProvider>
          <SavedSets />
        </ SavedSetsProvider>
        
        <CardList />
      </div>
    </DragDropWrapper>
  );
}
export default CardLibraryPage;