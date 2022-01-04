import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import { HiPlus } from 'react-icons/hi'
import windrLogo from '../../public/logo.png'

interface DashboardHeaderProps {
  onOpen: () => void
}

export function DashboardHeader({ onOpen }: DashboardHeaderProps) {
  const justify = useBreakpointValue({ base: 'space-between', lg: 'end' })
  return (
    <Flex justify={justify} align="center">
      <Box display={{ base: 'block', lg: 'none' }}>
        <Image
          src={windrLogo}
          alt="Windr Logo"
          width="50px"
          height="50px"
          loading="lazy"
        />
      </Box>
      <Button
        rightIcon={<HiPlus />}
        color="white"
        bgGradient="linear(to-r, red.500, yellow.500)"
        _hover={{
          bgGradient: 'linear(to-r, yellow.600, red.400)',
        }}
        size="lg"
        onClick={onOpen}>
        Create Site
      </Button>
    </Flex>
  )
}
