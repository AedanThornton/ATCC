import { useEffect } from 'react';
import CardList from './CardList';
import { useLayout } from "../layout/LayoutContext"
import { CatalogLayoutMain, CatalogLayoutTopbar } from './components/controls/CatalogLayout';
import SavedSets from '../savedsets/SavedSets';

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