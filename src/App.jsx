import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import ChildProfile from './pages/ChildProfile'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/child-profile" element={<ChildProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
