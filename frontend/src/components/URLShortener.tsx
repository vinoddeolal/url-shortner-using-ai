import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import { CopyAll as CopyIcon } from '@mui/icons-material';
import axios from 'axios';

interface URLShortenerProps {
  onShortened: (url: string) => void;
}

const URLShortener: React.FC<URLShortenerProps> = ({ onShortened }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/urls', { originalUrl });
      setShortenedUrl(response.data.shortUrl);
      onShortened(response.data.shortUrl);
      setError('');
    } catch (err: unknown) {
      setError((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to shorten URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Enter URL"
          variant="outlined"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button
          variant="contained"
          onClick={handleShorten}
          disabled={!originalUrl || !!shortenedUrl}
        >
          Shorten
        </Button>
      </Box>

      {shortenedUrl && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'background.paper' }}>
          <Typography variant="body1">{shortenedUrl}</Typography>
          <Tooltip title="Copy URL">
            <IconButton onClick={handleCopy}>
              <CopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Paper>
  );
};

export default URLShortener;
