import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface Props {
  severity: 'success' | 'info' | 'warning' | 'error';
  variant: 'standard' | 'filled' | 'outlined';
  messages: string[];
  onClose: () => void;
}

export default function AppAlert({
  severity,
  variant,
  messages,
  onClose,
}: Props) {
  const [open, setOpen] = useState(true);
  const handleOnClose = () => {
    setOpen(false);
    onClose();
  };
  return open ? (
    <div className="bg-white">
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleOnClose}
        open={open}
      >
        <div>
          {messages.map((msg) => (
            <MuiAlert
              className="mb-2"
              key={msg}
              onClose={handleOnClose}
              severity={severity}
              sx={{ width: '100%' }}
              variant={variant}
            >
              {msg}
            </MuiAlert>
          ))}
        </div>
      </Snackbar>
    </div>
  ) : null;
}
