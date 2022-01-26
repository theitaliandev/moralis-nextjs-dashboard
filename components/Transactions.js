import {  Text,  Link, Divider, Button } from '@chakra-ui/react'
import { useEffect } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { useState } from "react/cjs/react.development";
import CustomContainer from "./CustomContainer";

export default function Transactions({user}) {
    
  const Web3Api = useMoralisWeb3Api()
  const [transactions, setTransactions] = useState()
  const BASE_URL = "https://rinkeby.etherscan.io/tx/"

  const fetchTransactions = async () => {
        const data = await Web3Api.account.getTransactions({
          chain: "rinkeby",
          address: user.get('ethAddress'),
          limit: 5
        })
        if(data) {
          setTransactions(data.result)
        }
      }

      useEffect(() => {
        fetchTransactions()
      }, [])

    return(
        <CustomContainer>
          <Text fontSize="xl" mb="6" fontWeight="bold">My last 5 transactions</Text>
              {transactions && transactions.map(transaction => (
                <div key={transaction.hash}>
                <Link href={`${BASE_URL}${transaction.hash}`} isExternal>➡️&nbsp; {transaction.hash}</Link>
                <Divider/>
                </div>
              ))}
              <Button mt="4" colorScheme="purple" onClick={fetchTransactions}>✅&nbsp; Refetch Transactions</Button>
        </CustomContainer>
    )
}