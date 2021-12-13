// import { useState } from 'react';
// import { useEffect } from 'react';
// import * as StellarSdk from 'stellar-sdk'
import {Header} from './header';
import {LayoutContent} from './layout-content';
import {LayoutFooter} from './layout-footer';
import { UseWalletState } from '../index';

export const Main = () => {
  const {logOutAccount, secretKey, publicKey, qrCode} = UseWalletState()

  return(
    <>
      <Header logOutAccount={logOutAccount} secretKey={secretKey}/>
      <LayoutContent publicKey={publicKey} qrCode={qrCode}/>
      {/* <LayoutFooter/> */}
    </>  
  )
}