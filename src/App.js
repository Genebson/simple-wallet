import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/provider';
import {Box} from '@chakra-ui/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Setup} from './components/setup/setup'
import {Warning} from './components/warning/warning'
import {Main} from './components/user-wallet/main'
import {UseWalletState} from './components/index'
function App() {
  const {
    setSecretKey, 
    setPublickKey, 
    logOutAccount, 
    secretKey, 
    publicKey, 
    setIsKeyCopied, 
    qrCode,
    updateAccount} = UseWalletState()
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
              <Route exact path='/' element={<Setup setSecretKey={setSecretKey} setPublickKey={setPublickKey}/>}>
              </Route>
              <Route exact path='/warning' element={
              <Warning 
              publicKey={publicKey}
              secretKey={secretKey} 
              logOutAccount={logOutAccount} 
              setIsKeyCopied={setIsKeyCopied} />}>
              </Route>
              <Route exact path='/account' element={
              <Main 
              updateAccount={updateAccount}
              logOutAccount={logOutAccount}
              secretKey={secretKey}
              publicKey={publicKey}
              qrCode={qrCode}/>}>
              </Route>
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>  
  );
}

export default App;
