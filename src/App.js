import React from 'react';
import './App.css';
import ChartComponent from './components/ChartComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Chart Application</h1>
      </header>
      <main className="App-main">
        <ChartComponent />
      </main>
      <footer className="App-footer">
        <p>Footer content here</p>
      </footer>
    </div>
  );
}

export default App;
