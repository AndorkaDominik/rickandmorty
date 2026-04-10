import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Profile from './page/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App