import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/provider';
import {Box} from '@chakra-ui/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Setup} from './components/setup/setup'
import {Warning} from './components/warning/warning'
import {Main} from './components/user-wallet/main'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems='center'
          textAlign='center'>
          <Routes>
              <Route exact path='/' element={<Setup />}>
              </Route>
              <Route exact path='/warning' element={<Warning />}>
              </Route>
              <Route exact path='/account' element={<Main />}>
              </Route>
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>  
  );
}

export default App;
