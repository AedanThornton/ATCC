import { useState } from 'react';
import CardList from '../components/catalog/CardList';
import Backpack from '../components/backpack/Backpack';
import DragDropWrapper from '../components/backpack/DragDropWrapper';

function CardLibraryPage() {
  const [subpage, setSubpage] = useState("cardlist")

  const subpages = {
    "cardlist": <CardList />,
    "backpack": <Backpack />,
  };

  return (
    <div className="card-list-main">
      <DragDropWrapper subpage={subpage} setSubpage={setSubpage}>
        {subpages[subpage]}
      </DragDropWrapper>
    </div>
  );
}
export default CardLibraryPage;