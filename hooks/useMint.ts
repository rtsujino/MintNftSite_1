import { useContract, useNFTDrop } from '@thirdweb-dev/react'
import { useContext } from 'react'

import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
} from '@thirdweb-dev/react'

import { NftContractContext } from '../contexts/NftContractProvider'
import { Minting } from '../components/templates/Minting'

export const useMint = (quantity: number)  => {
  const { data: nftDrop } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    'nft-drop'
  )
  const store = useContext(NftContractContext)

  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const [, switchNetwork] = useNetwork()
  const isOnWrongNetwork = useNetworkMismatch()

  const mint = async () => {
    if (!address) {
      connectWithMetamask()
      return
    }

    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))
      return
    }

    store.setIsClaiming && store.setIsClaiming(true)

    try {
      console.log(quantity)
      const minted = await nftDrop?.claim(quantity)
      alert(`Successfully minted NFT!`)
    } catch (error) {
      console.error(error)
      alert(error)
    } finally {
      store.setIsClaiming && store.setIsClaiming(false)
    }
  }

  return { mint }
}
