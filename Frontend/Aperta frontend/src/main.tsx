import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.tsx';
import { Provider } from 'react-redux';
import './index.css'
import store from "./Redux/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
