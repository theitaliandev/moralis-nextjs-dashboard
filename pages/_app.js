import { ChakraProvider } from "@chakra-ui/react"
import { MoralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER} appId={process.env.NEXT_PUBLIC_ID}>
      <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>
  )
}

export default MyApp
