import axios from 'axios';
import { ReactElement, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CustomException } from '../exceptions/custom.exception';

interface Props {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  body: any;
  onSuccess?: (response: any) => void;
}

const useRequest = ({ url, method, body, onSuccess }: Props) => {
  const [errors, setErrors] = useState<ReactElement | null>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setErrors(
        <ErrorSnackbar
          // @ts-ignore
          errors={err.response?.data?.errors}
        />
      );
    }
  };

  return { doRequest, errors };
};

interface ErrorSnackbarProps {
  errors: CustomException[];
}

const ErrorSnackbar = ({ errors }: ErrorSnackbarProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="bg-white">
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleClose}
        open={open}
      >
        <div>
          {errors?.map((error) => (
            <MuiAlert
              className="mb-2"
              key={error.message}
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
              variant="filled"
            >
              {error.message}
            </MuiAlert>
          ))}
        </div>
      </Snackbar>
    </div>
  );
};

export default useRequest;
