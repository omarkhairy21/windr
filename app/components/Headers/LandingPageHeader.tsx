import { Box, Heading, Text, Center, VStack, HStack, Button, Container } from '@chakra-ui/react'
import Image from 'next/image'
import windrLogo from '../../public/logo.svg'
import Link from 'next/link'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { windrColorDarkBlue, windrColorLightBlue } from 'config/settings'

export function LandingPageHeader() {
  return (
    <Box bg="gray.50" borderTopWidth="10px" borderTopColor={windrColorDarkBlue}>
      <Container maxW="4xl" minH="2xl">
        <VStack>
          <Center>
            <HStack align="center" justify="center" my="12">
              <Box>
                <Image src={windrLogo} alt="Windr Logo" width="80px" height="80px" />
              </Box>
            </HStack>
          </Center>
          <Center>
            <Heading
              fontWeight="bold"
              textAlign="center"
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              color="gray.700"
              lineHeight={'110%'}>
              Mobile first website builder
            </Heading>
          </Center>
          <Center>
            <Heading
              my="8"
              textAlign="center"
              fontFamily="Inter, sans-serif"
              fontSize={{ base: '20px' }}
              fontWeight="normal"
              lineHeight={'160%'}
              color="gray.500">
              Create and publish static websites in seconds form any device,{' '}
              <Text bg={windrColorLightBlue} as="span">
               no code skills required with no learning curve.
              </Text>
            </Heading>
          </Center>
          <Center>
            <VStack>
              <Link href="/auth">
                <Button
                  mt="4"
                  bgColor="blue.900"
                  color="blue.50"
                  size="lg"
                  fontWeight="bold"
                  fontSize="lg"
                  rightIcon={<ArrowForwardIcon />}
                  _hover={{ bg: 'yellow.500' }}>
                  <a>Create Site</a>
                </Button>
              </Link>
              <Text color="blue.900" fontWeight="medium" as="span">
                No Credit card required
              </Text>
            </VStack>
          </Center>
        </VStack>
      </Container>
    </Box>
  )
}
