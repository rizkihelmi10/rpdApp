import logo from './logo.svg';
import './App.css';
import RadioPlayer from './radioPlayer';
import ChatBox from './chatango';
import Schedule from './schedule';
import { Analytics } from "@vercel/analytics/react"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/radio" element={<RadioPlayer />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
