import {
  Box,
  Heading,
  Text,
  Center,
  VStack,
  HStack,
  Button,
  Container,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react'
import Image from 'next/image'
import IphoneMockUp from '../../public/mockup.jpg'
import Link from 'next/link'
import { ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'
import { windrColorDarkBlue, windrColorLightBlue } from 'config/settings'

const features = [
  'Blazing fast static website',
  'Easy to use like google docs or notion',
  'Sob-domains from wind.co',
  'Custom domains supported',
  'No coding experience required',
  'All features supported on mobile and desktop',
  'Editor with rich text editor',
  'Markdown commands supported',
]

export function LandingPageHeader() {
  return (
    <Box bg="gray.50" borderTopWidth="10px" borderTopColor={windrColorDarkBlue}>
      <Container maxW={{ base: 'none', md: '80%' }} h="auto" minH="100vh">
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <Container
            mt={{ base: '6', md: '20' }}
            p={{ base: '2', md: '4' }}
            textAlign={{ base: 'center', md: 'left' }}>
            <Heading
              fontWeight="bold"
              fontSize={{ base: '4xl', md: '5xl' }}
              color="gray.700"
              mt="4"
              lineHeight={'110%'}>
              Mobile first website builder
            </Heading>
            <Heading
              mt="6"
              fontFamily="Inter, sans-serif"
              fontSize={{ base: '20px' }}
              fontWeight="normal"
              lineHeight={'130%'}
              color="gray.500">
              Create and publish static websites in seconds form any device,{' '}
              <Box>
                <Text bg={windrColorLightBlue} as="span">
                  no code skills required with no learning curve.
                </Text>
              </Box>
            </Heading>
            <VStack align={{ base: 'center', md: 'flex-start' }} mt="4">
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
          </Container>
          <Container maxW="lg" my="6">
            <Image src={IphoneMockUp} alt="mockup" objectFit="cover" />
          </Container>
        </SimpleGrid>
        <VStack>
          <Center mt="8">
            <VStack>
              <Heading mb="4">Main Features</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="2" p="4">
                {features.map((feature, index) => (
                  <HStack key={index} m="1">
                    <Icon as={CheckIcon} color="cyan.500" />
                    <Text
                      fontSize={{ base: '15', sm: '18' }}
                      fontWeight="semibold"
                      color="gray.500"
                      lineHeight={'110%'}>
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </SimpleGrid>
              <Text fontSize="md" color="gray.600">
                {' '}
                *More features coming*
              </Text>
            </VStack>
          </Center>
        </VStack>
      </Container>
    </Box>
  )
}
