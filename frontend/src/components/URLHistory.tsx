import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress
} from '@mui/material';
import { CopyAll as CopyIcon, OpenInNew as OpenIcon } from '@mui/icons-material';
import axios, { AxiosResponse } from 'axios';

interface URLHistoryProps {
  urls: string[];
}

interface URLStats {
  shortCode: string;
  originalUrl: string;
  clicks: number;
  lastAccessed: string | null;
}

const URLHistory: React.FC<URLHistoryProps> = ({ urls }: URLHistoryProps) => {
  const [stats, setStats] = useState<URLStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsPromises = urls.map((url: string) => {
          const shortCode = url.split('/').pop();
          if (!shortCode) return null;
          return axios.get(`http://localhost:3000/api/urls/${shortCode}/stats`);
        });

        const responses = await Promise.all(statsPromises);
        const stats = responses
          .filter((response): response is AxiosResponse<URLStats> => response !== null)
          .map((response: AxiosResponse<URLStats>) => response.data);
        
        setStats(stats);
        setError('');
      } catch (err) {
        setError('Failed to fetch URL statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [urls]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handleOpen = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        URL History
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Last Accessed</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((stat: URLStats, index: number) => (
                <TableRow key={stat.shortCode}>
                  <TableCell>
                    <Typography noWrap>
                      <a href={urls[index]} target="_blank" rel="noopener noreferrer">
                        {urls[index]}
                      </a>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography noWrap>
                      {stat.originalUrl}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography noWrap>
                      {stat.shortCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {stat.clicks}
                  </TableCell>
                  <TableCell>
                    {stat.lastAccessed ? new Date(stat.lastAccessed).toLocaleString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Copy Short URL">
                        <IconButton onClick={() => handleCopy(urls[index])}>
                          <CopyIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Copy Original URL">
                        <IconButton onClick={() => handleCopy(stat.originalUrl)}>
                          <CopyIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Open URL">
                        <IconButton onClick={() => handleOpen(stat.originalUrl)}>
                          <OpenIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default URLHistory;
