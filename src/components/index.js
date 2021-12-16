import { useState } from 'react'
import { useEffect } from 'react'
import {loadAccount} from '../utils/load-account';
import { activateAccount } from '../utils/create-account';

export const UseWalletState = () => {
  const [secretKey, setSecretKey] = useState(localStorage.secretKey);
  const [publicKey, setPublickKey] = useState(localStorage.publicKey);
  const [isKeyCopied, setIsKeyCopied] = useState(false);
  const [account, setAccount] = useState(undefined)
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${publicKey}`

  const logOutAccount = () => {
    setSecretKey('');
    setPublickKey('');
    setIsKeyCopied(false)
    localStorage.clear()
  }

  // const updateAccount = () => {
  //   const getData = async () => {
  //     const accountToSet = await loadAccount(publicKey);
  //     console.log(accountToSet)
  //     console.log(publicKey);
  //     setAccount(accountToSet)
  //   }
  //   getData()
  // }
  
  // useEffect(updateAccount, [publicKey])

  return {
    qrCode, 
    setSecretKey, 
    setPublickKey, 
    logOutAccount, 
    secretKey, 
    setIsKeyCopied,  
    publicKey,
    // updateAccount
  }
}