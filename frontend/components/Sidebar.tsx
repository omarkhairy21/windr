import { Box, Center, BoxProps } from '@chakra-ui/layout'
import Image from 'next/image'
import windrLogo from '../public/logo.png'
import { NavItems } from './NavItems'

export function Sidebar(props: BoxProps) {
  return (
    <Box w="20%" minH="100vh" h="full" bg={'gray.100'} overflowX="hidden" {...props}>
      <Center m={10}>
        <Image src={windrLogo} alt="Windr Logo" width="100px" height="100px" />
      </Center>
      <NavItems />
    </Box>
  )
}
