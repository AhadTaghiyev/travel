import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import { UserProvider } from './store/UserContext';

import {
  RouterProvider,
} from 'react-router-dom';
import router from './routes/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
)
