import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import { signIn } from '../../../services/authService';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  submitButton: {
    marginTop: '16px',
  },
};

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await signIn(email, password);

      if (response.success) {
        onLoginSuccess();
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      <Typography variant="h5" component="h1" align="center">
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        required
        autoFocus
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={styles.submitButton}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
}
