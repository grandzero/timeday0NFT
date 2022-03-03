import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function InputModal({setInput, handleMint, open, handleClose, input}) {

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Mint With Your Price</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your price below. Don't forget. This price will define your rarity and will be investment for your future !
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            min="1"
            label="Mint Price (MATIC)"
            type="number"
            fullWidth
            variant="standard"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()}>Cancel</Button>
          <Button onClick={handleMint}>Subscribe</Button>
        </DialogActions>
      </Dialog>
  );
}
