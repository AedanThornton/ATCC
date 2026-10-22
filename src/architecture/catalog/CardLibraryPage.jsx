import { useEffect } from 'react';
import CardList from './CardList';
import { useLayout } from "../layout/LayoutContext"
import { CatalogLayoutMain, CatalogLayoutTopbar } from './components/controls/CatalogLayout';
import Collections from '../collections/Collections';

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
      <Collections />
      
      <CardList />
    </div>
  );
}
export default CardLibraryPage;