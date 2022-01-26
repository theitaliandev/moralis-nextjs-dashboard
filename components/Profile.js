import {  Button, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import CustomContainer from "./CustomContainer";
import React from "react";

export default function Profile({user}) {
    const [input, setInput] = React.useState('')
    const { setUserData, isUserUpdating } = useMoralis();
    return (
            <CustomContainer>
            <Text><b>🤓&nbsp; Username:</b> {user.getUsername()}</Text>
            <Text><b>💵&nbsp; Wallet address:</b> {user.get("ethAddress")}</Text>
            <form onSubmit={e => {
                e.preventDefault()
                if(input.trim() !== '') {
                   setUserData({
                       username: input
                   }).then(() => setInput(''))
                }
            }}>
            <FormControl mt="6" mb="6">
                <FormLabel htmlFor='username'>Set a new username</FormLabel>
                <Input id='username' type='text' placeholder="ex. theItalianDev" value={input} onChange={e => setInput(e.target.value)}/>    
            </FormControl>
            <Button colorScheme="purple" type="submit" disabled={isUserUpdating}>✅&nbsp; Change username</Button>
            </form>
        </CustomContainer>
    )
}