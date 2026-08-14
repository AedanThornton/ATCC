import { useEffect } from 'react';
import CardList from '../components/catalog/CardList';
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
    <div className="card-list-main">
      <SavedSets />
      
      <CardList />
    </div>
  );
}
export default CardLibraryPage;