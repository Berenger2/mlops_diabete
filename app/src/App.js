import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './components/pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
