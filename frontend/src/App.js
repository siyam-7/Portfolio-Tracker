import React, { useState } from 'react';
import './App.css';
import StockDataComponent from './StockDataComponent';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    },
  },
});

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState('');

  return (
    <ThemeProvider theme={theme}>
    <div>
      <div className='home-btns'>
       <Button className='user' variant='text'
       sx={{
        height: 75,
        width: 75,
        borderRadius:'50%'}}>
      <AccountCircleIcon color='primary' sx={{
         fontSize: 75
      }}/>
       </Button>
       <Button className='user' variant='text'
       sx={{
        height: 75,
        width: 75,
        borderRadius:'50%'}}>
      <SettingsIcon color='primary' sx={{
         fontSize: 75
      }}/>
       </Button>
      </div>
      <div className='logo'></div>

    </div>
    </ThemeProvider>
  );
}

export default App;
