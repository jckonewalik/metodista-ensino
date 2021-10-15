import Stack from '@mui/material/Stack';
import axios from 'axios';
import { ReactElement, useState } from 'react';
import AppAlert from '../components/AppAlert';
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
        <div className="bg-white">
          <Stack className="mb-2 flex items-center" spacing={1}>
            {
              // @ts-ignore
              err.response?.data?.errors?.map((err: CustomException) => (
                <AppAlert key={err.message} variant="filled" severity="error">
                  {err.message}
                </AppAlert>
              ))
            }
          </Stack>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
