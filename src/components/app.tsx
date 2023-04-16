import { Route, Routes } from 'react-router-dom';

import { AppRoute } from '../enums';
import KanbanBoardPage from '../pages/kanban-board-page';

function App() {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<KanbanBoardPage />} />
    </Routes>
  );
}

export default App;
