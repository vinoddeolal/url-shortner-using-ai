import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Container, Box } from '@mui/material';
import URLShortener from './components/URLShortener';
import URLHistory from './components/URLHistory';

function App() {
  const [shortenedUrls, setShortenedUrls] = useState<string[]>([]);

  const handleNewShortenedUrl = (url: string) => {
    setShortenedUrls(prev => [url, ...prev]);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <URLShortener onShortened={handleNewShortenedUrl} />
        <URLHistory urls={shortenedUrls} />
      </Box>
    </Container>
  );
}

export default App;
