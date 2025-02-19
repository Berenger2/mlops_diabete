import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;