import { Routes, Route, Navigate } from 'react-router-dom';
import ShortenerPage from './ShortenerPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/url-shortner' />} />
      <Route path='/url-shortner' element={<ShortenerPage />} />
      <Route path='*' element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;