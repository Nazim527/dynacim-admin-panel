import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, useLocation } from 'react-router-dom';

function ScrollToTopOnPageChange() {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ScrollToTopOnPageChange />
      <App />
    </BrowserRouter>
  );