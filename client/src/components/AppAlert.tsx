import React, { useState } from 'react';
import Alert from '@mui/material/Alert';

interface Props {
  severity: 'success' | 'info' | 'warning' | 'error';
  variant: 'standard' | 'filled' | 'outlined';
  children?: React.ReactNode;
}

export default function AppAlert({ severity, variant, children }: Props) {
  const [open, setOpen] = useState(true);
  return open ? (
    <Alert onClose={() => setOpen(false)} variant={variant} severity={severity}>
      {children}
    </Alert>
  ) : null;
}
