import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Route } from 'react-router-dom'

import App from './App';
import Home from './app/Home';
import Auth from './features/Auth/Auth'
import ErrorPage from './error-text';
import store from './app/store'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      { 
        index: true, 
        element: <Home/>,
      },
      {
        path: 'auth',
        element: <Auth/>
      }
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>
);
