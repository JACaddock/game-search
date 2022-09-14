import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search'
//import GameContent from './components/GameContent';

function App() {
  return (
    <div className="app">
      <header>  
        <Navbar />
      </header>

      <div className="main">
        <Search />
      </div>

      <footer>

      </footer>

    </div>
  );
}

export default App;
