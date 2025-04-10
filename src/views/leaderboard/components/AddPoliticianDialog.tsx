import React, { useState, useEffect } from 'react';
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
  SelectChangeEvent
} from '@mui/material';
import { fetchPoliticalSides, fetchParties, createPolitician } from '../../../services/supabaseService';
import { PartyDto } from '../../../services/dto/PartyDto';
import { PoliticalSideDto } from '../../../services/dto/PoliticalSideDto';

const styles = {
  formControl: {
    mt: 2,
    minWidth: '100%'
  },
  dialogContent: {
    minWidth: 400
  },
  photoUrlField: {
    mt: 2
  },
  submitButton: {
    ml: 1
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    my: 2
  }
};

interface AddPoliticianDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddPoliticianDialog: React.FC<AddPoliticianDialogProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [partyId, setPartyId] = useState('');
  const [politicalSideId, setPoliticalSideId] = useState<number | ''>('');
  const [photoUrl, setPhotoUrl] = useState('');
  
  const [parties, setParties] = useState<PartyDto[]>([]);
  const [politicalSides, setPoliticalSides] = useState<PoliticalSideDto[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partiesData, politicalSidesData] = await Promise.all([
          fetchParties(),
          fetchPoliticalSides()
        ]);
        
        setParties(partiesData);
        setPoliticalSides(politicalSidesData);
      } catch (err) {
        setError('Failed to load form data');
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPartyId('');
    setPoliticalSideId('');
    setPhotoUrl('');
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePartyChange = (event: SelectChangeEvent) => {
    const selectedPartyId = event.target.value;
    setPartyId(selectedPartyId);
    
    // Auto-select political side based on party if available
    const selectedParty = parties.find(party => party.id === selectedPartyId);
    if (selectedParty) {
      setPoliticalSideId(selectedParty.political_side_id);
    }
  };

  const handleSubmit = async () => {
    // Validate form
    if (!firstName.trim()) {
      setError('First name is required');
      return;
    }
    
    if (!lastName.trim()) {
      setError('Last name is required');
      return;
    }
    
    if (!partyId) {
      setError('Party is required');
      return;
    }
    
    if (politicalSideId === '') {
      setError('Political side is required');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await createPolitician(
        firstName.trim(),
        lastName.trim(),
        partyId,
        politicalSideId as number,
        photoUrl.trim() || undefined
      );
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          onSuccess();
        }, 1500);
      } else {
        if (result.error?.includes('violates row-level security policy')) {
          setError('Permission denied: You do not have the required permissions to add a politician. Please contact the administrator.');
        } else {
          setError(result.error || 'Failed to create politician');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="add-politician-dialog-title">
      <DialogTitle id="add-politician-dialog-title">Ajouter une personnalité politique</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        {loadingData ? (
          <Box sx={styles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Personnalité politique ajoutée avec succès!</Alert>}
            
            {parties.length === 0 && !error && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Aucun parti politique n'a été trouvé. Veuillez contacter l'administrateur.
              </Alert>
            )}
            
            {politicalSides.length === 0 && !error && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Aucune tendance politique n'a été trouvée. Veuillez contacter l'administrateur.
              </Alert>
            )}
            
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="Prénom"
              type="text"
              fullWidth
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading || success}
            />
            
            <TextField
              margin="dense"
              id="lastName"
              label="Nom"
              type="text"
              fullWidth
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading || success}
            />
            
            <FormControl sx={styles.formControl} disabled={loading || success}>
              <InputLabel id="party-select-label">Parti politique</InputLabel>
              <Select
                labelId="party-select-label"
                id="party-select"
                value={partyId}
                label="Parti politique"
                onChange={handlePartyChange}
                fullWidth
              >
                {parties.map((party) => (
                  <MenuItem key={party.id} value={party.id}>
                    {party.name} ({party.abbreviation})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl sx={styles.formControl} disabled={loading || success}>
              <InputLabel id="political-side-select-label">Tendance politique</InputLabel>
              <Select
                labelId="political-side-select-label"
                id="political-side-select"
                value={politicalSideId}
                label="Tendance politique"
                onChange={(e) => setPoliticalSideId(e.target.value as number)}
                fullWidth
              >
                {politicalSides.map((side) => (
                  <MenuItem key={side.id} value={side.id}>
                    {side.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              margin="dense"
              id="photoUrl"
              label="URL de la photo (optionnel)"
              type="url"
              fullWidth
              variant="outlined"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              disabled={loading || success}
              sx={styles.photoUrlField}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
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
