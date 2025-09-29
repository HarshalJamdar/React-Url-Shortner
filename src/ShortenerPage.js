import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShortenerPage() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_BASE}/url/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || 'Failed to shorten URL');
      else setShortUrl(`${process.env.REACT_APP_BACKEND_API_BASE}/${data?.data?.urlCode}`);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Short URL copied to clipboard!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleClear = () => {
    setLongUrl('');
    setShortUrl('');
    setError('');
  };

  return  (
    <div className='container'>
      <h1 className='title'>
        <img 
          src='https://m.media-amazon.com/images/I/31Aq0p5SI-L.png' 
          alt='Logo' 
          style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }}
        />
         URL Shortener
      </h1>

      <form className='form' onSubmit={handleSubmit}>
        <input
          type='url'
          placeholder='Enter your long URL...'
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <div className="button-group">
          <button type='submit' disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
          <button
            type='button'
            onClick={handleClear}
            className='clear-btn'
            disabled={!longUrl && !shortUrl}
          >
            Clear
          </button>
        </div>
      </form>

      {error && <p className='error'>{error}</p>}

      {shortUrl && (
        <div className='result'>
          <p>Your Short URL:</p>
          <a href={shortUrl} target='_blank' rel='noopener noreferrer'>
            {shortUrl}
          </a>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default ShortenerPage;