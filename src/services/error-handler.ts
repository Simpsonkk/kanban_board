import request from 'axios';
import { toast } from 'react-toastify';

export const errorHandler = (error: unknown): void => {
  if (request.isAxiosError(error)) {
    toast.info(error.message);
    throw error;
  }
};
