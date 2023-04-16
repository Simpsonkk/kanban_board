import request from 'axios';
import { toast } from 'react-toastify';

export const errorHandler = (error: unknown): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }
  toast.info(error.message);
};
