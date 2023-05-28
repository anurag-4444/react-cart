import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/app.scss'
import Home from "./components/Home";
import Cart from "./components/Cart";
import Header from "./components/Header";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/cart'} element={<Cart />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
