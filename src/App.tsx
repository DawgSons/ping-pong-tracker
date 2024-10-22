import { useState } from 'react';
import './App.css';
import { AppLayoutComponent } from './components/app-layout';

function App() {
  navigator.geolocation.getCurrentPosition((position) => {}, (error) => {}, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
  
  return (
    <AppLayoutComponent />
  )
}

export default App;
