import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserPage from './screens/UserPage';
import TrackPage from './screens/TrackPage';
import Layout from './layout/Layout';
import App from './App';
// import './index.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "user",
        element: <UserPage />
      },
      {
        path: "track",
        element: <TrackPage />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
