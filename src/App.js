import { useState } from "react";
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";

const App = () => {
  const handleChangePage = () => {
    console.log('<App/>');
    setPage('game');
  }
  const handleHome = () => {
    setPage('app');
  }

  const [page, setPage] = useState('app');
  switch (page) {
    case "app":
      return <HomePage onChangePage={handleChangePage}/>
    case "game":
      return <GamePage onChangePage={handleHome}/>
    default:
      return <HomePage />
  }
};

export default App;