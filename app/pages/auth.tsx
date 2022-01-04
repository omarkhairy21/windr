import { Flex, Stack, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { signIn, signOut, getProviders } from 'next-auth/react'
import { Provider } from 'next-auth/providers'
import { useAuth } from '@hooks/useAuth'
import Router from 'next/router'
import { useEffect } from 'react'

type AuthProps = {
  providers: Provider
  authSession: any
}

export default function Auth({ providers }: AuthProps) {
  const { authToken, userId, userEmail } = useAuth(false)

  useEffect(() => {
    if (authToken) {
      Router.push('/dashboard')
    }
  }, [authToken])

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} color="blue.900">
              Sign in to your account
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features✌️
            </Text>
          </Stack>
          {!authToken && renderAuthProviders(providers)}
          {userId && (
            <>
              <Text fontSize="xl" color="lightslategray" align="center">
                Hello, {userEmail}
              </Text>
              <Button color="gray.50" bg="lightcoral" onClick={() => signOut()}>
                {' '}
                Sign-Out
              </Button>
            </>
          )}
        </Stack>
      </Flex>
    </>
  )
}

function renderAuthProviders(providers: Provider) {
  return Object.values(providers).map((provider, i) => {
    return (
      <Button
        key={i}
        onClick={() => signIn(provider.id)}
        colorScheme={provider.id === 'google' ? 'gray' : 'facebook'}
        leftIcon={provider.id === 'google' ? <FcGoogle /> : <FaFacebook />}>
        Sing In With {provider.name}
      </Button>
    )
  })
}

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  }
}
