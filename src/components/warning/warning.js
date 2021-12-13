import { MinusIcon, ChevronRightIcon, ChevronLeftIcon} from '@chakra-ui/icons'
import { Link } from 'react-router-dom';
import {
  Heading,
  Stack,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  List,
  ListItem,
  ListIcon,
  Box,
  Button,
  useClipboard,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'
import { UseWalletState } from '../index';

export const Warning = () => {
  const { logOutAccount, secretKey, setIsKeyCopied } = UseWalletState()
  const {hasCopied, onCopy} = useClipboard(secretKey);
  const toast = useToast();

  const inputStyle = {
    fontWeight: '600'
  }

  const handleNextButton = () => {
    if (hasCopied === false) {
      toast({
        title: 'Error!',
        description: "You can't go forward if you don't copy your secret key first.",
        status: 'error',
        duration: 2900,
        isClosable: true,
      })
    } else {
      setIsKeyCopied(true)
      console.log(hasCopied);
    }
  }

  return(
    <Box
      borderWidth='1px'
      p={6}>
      <Stack width='100%' maxWidth='600px' justifyContent='center'>
        <Heading mb={4}>
          Connect with a secret key
        </Heading>
          <Alert status='warning'>
            <Box flex='1'>
            <AlertIcon/>
              <AlertTitle>
                ATTENTION: Entering your secret key on any website is not recommended.
              </AlertTitle>
              <AlertDescription display='flex'>
                <List>
                  <ListItem>
                    <ListIcon as={MinusIcon}/>
                    Copy and pasting your secret key makes you vulnerable to accidents, 
                    attacks, and scams that can result in loss of funds.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MinusIcon}/>
                    If this website were compromised or if you visit a phishing replica of 
                    this site, your secret key may be stolen if you use this method.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MinusIcon}/>
                    It is safer to use connection methods that do not share your 
                    secret key with websites, such as hardware wallets or browser extensions.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MinusIcon}/>
                    Note: Connecting by entering a secret key may be deprecated in a 
                    future version of the Account Viewer.
                  </ListItem>
                </List>
              </AlertDescription>
            </Box>  
          </Alert>
          <InputGroup size='md' mt={4}>
            <Input
              style={inputStyle}
              readOnly
              pr='4.5rem'
              value={secretKey}
            />
            <InputRightElement width='4.5rem'>
              <Button h='38px' size='sm' onClick={onCopy}>
                {hasCopied ? 'Copied!' : 'Copy'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box
            display='flex'
            justifyContent='space-between'
            mt={4}>
            <Link to='/'>
              <Button 
                onClick={logOutAccount} 
                leftIcon={<ChevronLeftIcon/>} 
                colorScheme='red'>Back
              </Button>
            </Link>
            <Link to='/account'>
              <Button 
              onClick={handleNextButton} 
              rightIcon={<ChevronRightIcon/>} 
              colorScheme='blue'>Next</Button>
            </Link>  
          </Box>
        </Stack>  
    </Box>
  )
}