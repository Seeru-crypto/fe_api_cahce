// toastManager.ts
import { toast, ToastContent, ToastOptions } from 'react-toastify';
import {Id} from "react-toastify/dist/types";

class ToastManager {
    notify = (message: ToastContent, options?: ToastOptions):Id => {
        return toast(message, options);
    };

    removeToast = (toastId: Id) => {
        toast.dismiss(toastId.current);
    }
}

export const toastManager = new ToastManager();

export const successOption: ToastOptions = {
    type:'success'
}

export const errorOption: ToastOptions = {
    type:'error',
    autoClose: false
}

export const warningOption: ToastOptions = {
    type: 'warning'
}

