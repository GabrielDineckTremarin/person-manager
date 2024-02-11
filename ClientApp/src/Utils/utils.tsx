import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





   export const showMessage = (message: string, typeMsg: string, autoClose: number = 2000) => {

        let type = 
         typeMsg === 'success' ? 
         'success' :
         typeMsg === 'error' ? 'error' : 'warning'
        const toastOptions: ToastOptions = {
          position: 'bottom-right', 
          autoClose: autoClose, 
          closeButton: true, 
          style: {
            background: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#FFC107',
            color: '#fff',
            fontSize:"18px"
          },
  
          theme: "colored",
        };
      
        (toast as any)[type](message, toastOptions);
      };

