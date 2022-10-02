import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import EditProfile from './routes/EditProfile';
import SignOut from './routes/SignOut';
import PublicProfile from './routes/PublicProfile';
import ChooseUserName from './routes/ChooseUserName';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<EditProfile />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/u/:username" element={<PublicProfile />} />
        <Route path="choose-username" element={<ChooseUserName />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
