import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CommitFeedList} from "./components/CommitFeedList";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path=':userName/:repoName' element={<CommitFeedList />} />
              <Route path='*' element={
                  <main style={{ display: 'flex', justifyContent: 'center', fontSize: '35px', alignItems: 'center', height: '100vh'}}>
                      <strong >The Repo doesn't exist</strong>
                  </main>
              } />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
