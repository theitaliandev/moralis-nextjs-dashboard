import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Input, Button, useToast } from "@chakra-ui/react";
import Moralis from "moralis";
import { useWeb3Transfer } from "react-moralis";
import CustomContainer from "./CustomContainer";
import React from "react";

export default function Send() {

    const [amount, setAmount] = React.useState(0)
    const [receiver, setReceiver] = React.useState('')

    const toast = useToast()

    const { fetch, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount === '' ? 0 : amount),
        receiver: receiver,
        type: "native",
    });

    const handleChange = (value) => setAmount(value)

    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Send ETH</Text>
            <form onSubmit={async e => {
                e.preventDefault()
                await Moralis.enableWeb3()
                fetch({
                    onSuccess: () => {
                        toast({
                            title: 'ETH succesfully sent.',
                            description: "Fresh ETH are showing up in receiver wallet.",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                          })
                          setAmount(0)
                          setReceiver('')
                    } ,
                    onError: (error) => toast(
                        {
                            title: 'Error.',
                            description: error,
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          }
                    )
                })
            }}>
                <FormControl mt="4">
                    <FormLabel htmlFor='amount'>Amount</FormLabel>
                    <NumberInput step={0.1} onChange={handleChange}>
                        <NumberInputField id='amount' value={amount} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel mt="4" htmlFor="receiver">Send to</FormLabel>
                        <Input id='receiver' type='text' placeholder="Receiver address" value={receiver} onChange={e => setReceiver(e.target.value)} />
                </FormControl>
                <Button mt="4" type="submit" colorScheme="purple" disabled={isFetching}>💸&nbsp; Send ETH</Button>
            </form>
        </CustomContainer>
    )
}