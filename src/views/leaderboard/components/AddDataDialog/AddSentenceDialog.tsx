import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
  SelectChangeEvent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { createSentence } from '../../../../services/supabaseService';
import { PoliticianDto } from '../../../../services/dto/PoliticianDto';
import { supabase } from '../../../../utils/supabase';

const styles = {
  formControl: {
    mt: 2,
    minWidth: '100%'
  },
  dialogContent: {
    minWidth: { xs: '100%', sm: 400 },
    padding: { xs: '16px', sm: '24px' }
  },
  sourceUrlField: {
    mt: 2
  },
  submitButton: {
    ml: 1
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    my: 2
  },
  dialogPaper: {
    margin: { xs: '16px', sm: '32px' },
    width: { xs: 'calc(100% - 32px)', sm: 'auto' },
    maxWidth: { xs: '100%', sm: '600px' }
  },
  dialogTitle: {
    fontSize: { xs: '1.1rem', sm: '1.25rem' },
    padding: { xs: '16px', sm: '24px' }
  },
  dialogActions: {
    padding: { xs: '8px 16px', sm: '16px 24px' }
  },
  numberField: {
    mt: 2
  },
  dateField: {
    mt: 2
  }
};

interface AddSentenceDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddSentenceDialog: React.FC<AddSentenceDialogProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const [politicianId, setPoliticianId] = useState('');
  const [type, setType] = useState('');
  const [fine, setFine] = useState<number | ''>('');
  const [prisonTime, setPrisonTime] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  
  const [politicians, setPoliticians] = useState<PoliticianDto[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchData = useCallback(async () => {
    try {
      const { data: politiciansData, error: politiciansError } = await supabase
        .from('politicians')
        .select('*');
      
      if (politiciansError) {
        throw new Error('Failed to load politicians');
      }
      
      setPoliticians(politiciansData as PoliticianDto[]);
    } catch (err) {
      setError('Failed to load form data');
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchData();
      // Initialize date field with today's date in YYYY-MM-DD format
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      setDate(`${year}-${month}-${day}`);
    }
  }, [open, fetchData]);

  const resetForm = () => {
    setPoliticianId('');
    setType('');
    setFine('');
    setPrisonTime('');
    setDate('');
    setSourceUrl('');
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePoliticianChange = (event: SelectChangeEvent) => {
    setPoliticianId(event.target.value);
  };

  const handleSubmit = async () => {
    // Validate form
    if (!politicianId) {
      setError('Politician is required');
      return;
    }
    
    if (!type.trim()) {
      setError('Type of sentence is required');
      return;
    }
    
    if (fine === '' && prisonTime === '') {
      setError('At least one of Fine or Prison Time must be provided');
      return;
    }
    
    if (!date) {
      setError('Date is required');
      return;
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      setError('Date must be in the format YYYY-MM-DD');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await createSentence(
        politicianId,
        type.trim(),
        typeof fine === 'number' ? fine : 0,
        typeof prisonTime === 'number' ? prisonTime : 0,
        date,
        sourceUrl.trim() || undefined
      );
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          onSuccess();
        }, 1500);
      } else {
        if (result.error?.includes('violates row-level security policy')) {
          setError('Permission denied: You do not have the required permissions to add a sentence. Please contact the administrator.');
        } else {
          setError(result.error || 'Failed to create sentence');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="add-sentence-dialog-title"
      fullScreen={isMobile}
      PaperProps={{ sx: styles.dialogPaper }}
    >
      <DialogTitle id="add-sentence-dialog-title" sx={styles.dialogTitle}>
        Ajouter une condamnation
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        {loadingData ? (
          <Box sx={styles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Condamnation ajoutée avec succès!</Alert>}
            
            {politicians.length === 0 && !error && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Aucune personnalité politique n'a été trouvée. Veuillez d'abord ajouter un politicien.
              </Alert>
            )}
            
            <FormControl sx={styles.formControl} disabled={loading || success}>
              <InputLabel id="politician-select-label">Personnalité politique</InputLabel>
              <Select
                labelId="politician-select-label"
                id="politician-select"
                value={politicianId}
                label="Personnalité politique"
                onChange={handlePoliticianChange}
                fullWidth
              >
                {politicians.map((politician) => (
                  <MenuItem key={politician.id} value={politician.id}>
                    {politician.first_name} {politician.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              margin="dense"
              id="type"
              label="Type de condamnation"
              type="text"
              fullWidth
              variant="outlined"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={loading || success}
              sx={{ mt: 2 }}
            />
            
            <TextField
              margin="dense"
              id="fine"
              label="Amende (€)"
              type="number"
              fullWidth
              variant="outlined"
              value={fine}
              onChange={(e) => {
                const value = e.target.value;
                setFine(value === '' ? '' : Number(value));
              }}
              disabled={loading || success}
              sx={styles.numberField}
              inputProps={{ min: 0 }}
            />
            
            <TextField
              margin="dense"
              id="prisonTime"
              label="Durée d'emprisonnement (mois)"
              type="number"
              fullWidth
              variant="outlined"
              value={prisonTime}
              onChange={(e) => {
                const value = e.target.value;
                setPrisonTime(value === '' ? '' : Number(value));
              }}
              disabled={loading || success}
              sx={styles.numberField}
              inputProps={{ min: 0 }}
            />
            
            <TextField
              margin="dense"
              id="date"
              label="Date de condamnation (YYYY-MM-DD)"
              type="date"
              fullWidth
              variant="outlined"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading || success}
              sx={styles.dateField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <TextField
              margin="dense"
              id="sourceUrl"
              label="URL de la source (optionnel)"
              type="url"
              fullWidth
              variant="outlined"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              disabled={loading || success}
              sx={styles.sourceUrlField}
            />
          </>
        )}
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button onClick={handleClose} disabled={loading}>Annuler</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary" 
          disabled={loading || loadingData || success}
          sx={styles.submitButton}
        >
          {loading ? <CircularProgress size={24} /> : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
