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
  InputLeftElement,
  Spinner
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons';
import {FiSend} from 'react-icons/fi'
import {ImQrcode} from 'react-icons/im'
import {AiOutlineUser} from 'react-icons/ai'
import { sendPayment } from '../../utils/send-payment';
import { useState } from 'react';

export const LayoutContent = ({secretKey, publicKey, qrCode, updateAccount}) => {
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState();
  const toast = useToast();
  const {hasCopied, onCopy} = useClipboard(publicKey);
  const { 
    isOpen: isFirstModalOpen, 
    onOpen: onFirstModal, 
    onClose: onFirstModalClose } = useDisclosure()
  const { 
    isOpen: isSecondModalOpen, 
    onOpen: onSecondModal, 
    onClose: onSecondModalClose } = useDisclosure()
  
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

  const sendTransfer = async () => {
    const SECRET_KEY_LENGTH = 56;
    if (destination.length === SECRET_KEY_LENGTH && amount > 0) {
      try {
        const result = await sendPayment(
          secretKey,
          destination,
          amount.toString()
        );
        toast({
          title: `${amount} has been sent!`,
          description: `Transaction hash: ${result.hash}`,
          status: 'success',
          duration: 2900,
          isClosable: true,
        })
        // updateAccount();
      } catch (error) {
        toast({
          title: 'Hmmm, something went wrong!',
          description: error.message,
          status: 'error',
          duration: 2900,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: 'Invalid data',
        description: 
        "Make sure you are entering the correct account ID and sending a valid amount",
        status: 'error',
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
          <Center>
            <InputGroup size='md' mt={4} w='32%'>
              <Input style={inputStyle} readOnly value={publicKey}/>
            </InputGroup>
          </Center>
          <Button
            onClick={onSecondModal}
            h='42px' 
            mr={2} 
            leftIcon={<FiSend size='25px'/>} 
            colorScheme='teal'>Send</Button>
            <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose} size='xl'>
            <ModalOverlay />
              <ModalContent textAlign='center'>
                <ModalHeader fontSize='40px'>Send XLM</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.300'
                      fontSize='1.2em'
                      children='$'
                    />
                    <Input 
                    placeholder='Enter amount'
                    type='number'
                    value={amount}
                    onChange={({target: value}) => setAmount(value.value)}/>
                  </InputGroup>
                  <InputGroup my={6}>                  
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.300'
                      fontSize='1.2em'
                      children={<AiOutlineUser/>}
                    />
                    <Input 
                    placeholder='Destination' 
                    type='text' 
                    value={destination}
                    onChange={({target: {value}}) => setDestination(value)}/>
                  </InputGroup>
                  <Button
                    onClick={sendTransfer}
                    h='42px' 
                    mr={2} 
                    leftIcon={<FiSend size='25px'/>} 
                    colorScheme='teal'>Send
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
          <Button
            onClick={onFirstModal}
            h='42px' 
            ml={2} 
            leftIcon={<ImQrcode size='20px'/>} 
            colorScheme='teal'>Recieve</Button>
            <Modal isOpen={isFirstModalOpen} onClose={onFirstModalClose} size='xl'>
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