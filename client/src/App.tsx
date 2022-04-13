import React from 'react';
import HomePage from "./components/HomePage";

import './App.scss';

export const sum = (a: number, b: number) => {
    return a + b;
}

function App() {
    return (
        <div className='App'>
            <HomePage />
        </div>
    );
}

export default App;
