import { Button, Text } from "@chakra-ui/react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";
import React from "react";

export default function NftPrivateTab({ user }) {
    const { getNFTBalances, data } = useNFTBalances();
    console.log(data)
    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Private Lounge</Text>
             <Button mt="4" type="submit" colorScheme="purple">🔒&nbsp; Enter</Button>
        </CustomContainer>
    )
}
