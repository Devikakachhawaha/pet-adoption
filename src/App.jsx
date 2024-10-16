import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import PetAdoptionForm from './components/PetAdoptionForm';
import TableData from './components/TableData'; 

function App() {
  return (
    <Router>
      <div className="bg-[url('https://i.pinimg.com/originals/1d/80/4c/1d804c63cfc28f501c98a599db2142af.png')] h-screen">
        <Header />
        
        <Routes>
          <Route path="/" element={<PetAdoptionForm />} />
          <Route path="/submissions" element={<TableData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
