import { useEffect } from 'react';
import CardList from '../components/catalog/CardList';
import DragDropWrapper from '../components/backpack/DragDropWrapper';
import { useLayout } from '../context/LayoutContext';
import { CatalogLayoutMain, CatalogLayoutTopbar } from '../components/catalog/CatalogLayout';
import SavedSets from '../components/savedsets/SavedSets';

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
        <SavedSets />
        
        <CardList />
      </div>
    </DragDropWrapper>
  );
}
export default CardLibraryPage;