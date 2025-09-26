import { Routes, Route, Navigate } from 'react-router-dom';
import ShortenerPage from './ShortenerPage';

function App() {
  return (
    <Routes>
            {/* Redirect "/" to "/url-shortner" */}
      <Route path="/" element={<Navigate to="/url-shortner" />} />

      {/* Your URL shortener page */}
      <Route path="/url-shortner" element={<ShortenerPage />} />

      {/* Optional catch-all for unmatched routes */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;