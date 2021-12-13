import {
  WrapItem,
  Wrap,
  Avatar,
  Center,
  Image,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  Text,
  Button,
  Stack,
  Heading,
  useClipboard,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link,
  Container
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons';
import {FiSend} from 'react-icons/fi'
import {ImQrcode} from 'react-icons/im'
import { UseWalletState } from '..';

export const LayoutContent = ({publicKey, qrCode, createAccount, callState}) => {
  const {hasCopied, onCopy} = useClipboard(publicKey);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  
  const inputStyle = {
    fontWeight: '600'
  }
  
  const linkStyle = {
    textDecorationLine:'none'
  }
  const handleCopyKey = () => {
    if (!hasCopied) {
      onCopy()
      toast({
        title: 'Great!',
        description: "You have copied your secret key correctly!",
        status: 'success',
        duration: 2900,
        isClosable: true,
      })

    }
  }

  return (
    <>
      <Stack width='100%'>
        <Box>
          <Heading>Your Balance</Heading>
          <Text fontSize='4xl'>0 Lumens (XLM)</Text>
          <Text fontSize='3xl'>Your Stellar Public Key</Text>
          <InputGroup size='md' mt={4} w='32%'>
            <Input style={inputStyle} readOnly/>
            <InputRightElement width='4.5rem'>
              <Button h='38px' size='sm' onClick={handleCopyKey}>
                {hasCopied ? 'Copied!' : 'Copy'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button 
            h='42px' 
            mr={2} 
            leftIcon={<FiSend size='25px'/>} 
            colorScheme='teal'>Send</Button>
          <Button
            onClick={onOpen}
            h='42px' 
            ml={2} 
            leftIcon={<ImQrcode size='20px'/>} 
            colorScheme='teal'>Recieve</Button>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
              <ModalContent textAlign='center'>
                <ModalHeader fontSize='40px'>Your account QR code</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontSize='20px'>
                    Scan this QR code using a Stellar wallet app
                    to make a payment to your account.
                  </Text>
                  <Center>
                    <Image my={12} src={qrCode} alt='qr-code'/>
                  </Center>
                  <Wrap justify='center'>
                    <WrapItem>
                      <Button borderRadius='100px' w='50px' cursor='default' pointerEvents='none'>
                        <Avatar
                          size={'sm'}
                          src={'https://avatars.dicebear.com/api/male/username.svg'}
                        />
                      </Button>
                      <Text
                        fontWeight='500'
                        fontSize='15px'
                        lineHeight='1.5'
                        width='266px'
                        wordBreak='break-all'
                      >{publicKey}</Text>
                    </WrapItem>
                  </Wrap>
                  <Link style={linkStyle} onClick={handleCopyKey}>
                    <Text
                    fontWeight='600'
                    mt={4}
                    mb={6}
                    fontSize='18px'
                    color='teal'>Copy public key <CopyIcon color='teal'/></Text>
                  </Link>
                </ModalBody>
              </ModalContent>
            </Modal>
        </Box>
      </Stack>
    </>
  )
}