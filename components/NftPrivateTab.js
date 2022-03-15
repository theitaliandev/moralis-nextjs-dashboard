import { Button, Text } from "@chakra-ui/react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";
import React, { useEffect, useState } from "react";

export default function NftPrivateTab({ user }) {
    const { getNFTBalances, data, isFetching } = useNFTBalances();
    const [allowed, setAllowed] = useState(false)
      
    const TOKEN_ADDRESS_REQUIRED = "0x80926696acbf135e3d8fee72a7b602017fe289a7"
    
  
    useEffect(() => {
      getNFTBalances({ 
        params: {
        chain: 'rinkeby',
        address: user.get('ethAddress')
      }
    })  
  }, [])

    const checkIfOwnNft = () => {
    if(!data) {
      setAllowed(false)
      alert("You can not join the private lounge...I am sorry!")
      return
    }
    const found = data.result?.filter((nft) => {
     return nft.token_address === TOKEN_ADDRESS_REQUIRED
    })
    if(found.length > 0) {
      setAllowed(true)
    }else{
      setAllowed(false)
      alert("You need to own a specific NFT to enter the private lounge")
    }
    }
    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Private Lounge</Text>
            {!allowed && <Button mt="4" type="button" colorScheme="purple" disabled={isFetching} onClick={checkIfOwnNft}>🔒&nbsp; Enter</Button>}
            {allowed && <p>You are in because you own this NFT: {TOKEN_ADDRESS_REQUIRED}</p>}
        </CustomContainer>
    )
}
