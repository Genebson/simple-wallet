import {Heading, Text, Button, InputGroup, Input, useToast} from '@chakra-ui/react';
import { useState } from 'react';
import * as StellarSdk from 'stellar-sdk';
import { Link } from 'react-router-dom';
import { UseWalletState } from '../index';
import * as createTestAccount from '../../utils/create-account';

export const Setup = () => {
  const {setSecretKey, setPublickKey} = UseWalletState()
  const [importSecretKey, setImportSecretKey] = useState('')
  const toast = useToast();
  const inputStyle = {
    fontWeight: '600'
  }
  
  const createAccount = () => {
    const keys = createTestAccount();
    console.log(keys);
    setSecretKey(keys.secretKey)
    setPublickKey(keys.publicKey)

    localStorage.setItem('public', keys.publicKey)
    localStorage.setItem('secret', keys.secretKey)
    toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2900,
          isClosable: true,
        })
  }
  
  const importAccount = () => {
    const SECRET_KEY_LENGTH = 56;

    if (importSecretKey.length === SECRET_KEY_LENGTH) {
      const keyPair = StellarSdk.Keypair.fromSecret(importSecretKey);

      localStorage.setItem('public', keyPair.publicKey());
      localStorage.setItem('secret', importSecretKey);

      setPublickKey(keyPair.publicKey);
      setSecretKey(importSecretKey);
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2900,
          isClosable: true,
        })
    } else {
        toast({
          title: 'Invalid Secret Key.',
          description: "The key it's incorrect.",
          status: 'error',
          duration: 2900,
          isClosable: true,
        })
      }
    }


  const handleSecretKey = e => {
    setImportSecretKey(e.target.value)
  }
  return(
    <>
      <Heading mb={4}>
        Welcome to your Stellar Wallet
      </Heading>
      <Link to='/warning'>
        <Button onClick={createAccount} mb={4} colorScheme='teal' size='md'>
          Create Account
        </Button>
      </Link>  
      <Text fontSize='md'>
        If you already have an account import your secret key
      </Text>
      <InputGroup>
        <Input 
        style={inputStyle}
        mt={4}
        placeholder='Enter your secret key' 
        size='sm'
        onChange={handleSecretKey}
        value={importSecretKey}/>
        {/* <Link to='/warning'> */}
          <Button 
            onClick={importAccount} 
            colorScheme='teal' 
            size='sm' 
            mt={4} 
            ml={1}>Import
          </Button>
        {/* </Link>   */}
      </InputGroup>
    </>
  )
}