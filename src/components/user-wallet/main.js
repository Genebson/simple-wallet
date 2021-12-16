// import { useState } from 'react';
// import { useEffect } from 'react';
// import * as StellarSdk from 'stellar-sdk'
import {Header} from './header';
import {LayoutContent} from './layout-content';
import {LayoutFooter} from './layout-footer';

export const Main = ({updateAccount, logOutAccount, secretKey, publicKey, qrCode, hash}) => {
  return(
    <>
      <Header logOutAccount={logOutAccount} secretKey={secretKey}/>
      <LayoutContent  updateAccount={updateAccount} secretKey={secretKey} publicKey={publicKey} qrCode={qrCode} hash={hash}/>
      {/* <LayoutFooter/> */}
    </>  
  )
}