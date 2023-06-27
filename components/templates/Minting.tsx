import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { useMint } from '../../hooks/useMint'
import { Fade } from '../elements/Fade'
import { NftImagesSlideShow } from '../elements/NftImagesSlideShow'

import { useAddress } from '@thirdweb-dev/react'

const Component: React.FC = () => {
  const store = useContext(NftContractContext)
  const address = useAddress()

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 0 : value);
  
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const { mint } = useMint(quantity)
  const { connectWallet } = useConnectWallet()

  return (
    <Flex
      maxW={'8xl'}
      justifyContent="center"
      h="100%"
      alignItems="center"
      mx="auto"
    >
      <Fade>
        <VStack spacing={6}>
          <Box width="240px" height="240px">
            <NftImagesSlideShow />
          </Box>

          <div>

      <label>
        Quantity:
        <Flex>
                <Button onClick={handleDecreaseQuantity}>-</Button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <Button onClick={handleIncreaseQuantity}>+</Button>
              </Flex>
      </label>
            {address ? (
              <Button onClick={mint} disabled={store.isClaiming}>
                {store.isClaiming
                  ? 'claiming...'
                  : `MINT (${store.claimPrice} ETH)`}
              </Button>
            ) : (
              <Button onClick={connectWallet}>
                <Text fontSize="xs">Connect Wallet</Text>
              </Button>
            )}
            <Text pt={2} fontSize="xs" textAlign={'center'}>
              {store.claimedSupply} / {store.totalSupply}
            </Text>
            <Text pt={2} fontSize="xs" textAlign={'center'}>
              goerli testnet
            </Text>
          </div>
        </VStack>
      </Fade>
    </Flex>
  )
}

export { Component as Minting }
