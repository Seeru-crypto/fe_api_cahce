// toastManager.ts
import { toast, ToastContent, ToastOptions } from 'react-toastify';

class ToastManager {
    notify = (message: ToastContent, options?: ToastOptions) => {
        toast(message, options);
    };
}

export const toastManager = new ToastManager();

export const successOption: ToastOptions = {
    type:'success'
}

export const errorOption: ToastOptions = {
    type:'error'
}

export const warningOption: ToastOptions = {
    type: 'warning'
}

