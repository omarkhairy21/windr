import { Spinner, Center } from '@chakra-ui/react'

interface LoadingSpinnerProps {
  marginTop?: number
}

export function LoadingSpinner({ marginTop }: LoadingSpinnerProps) {
  return (
    <>
      <Center mt={marginTop ? marginTop : 60}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    </>
  )
}
