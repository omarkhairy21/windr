import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormHelperText,
  Input,
  Flex,
  useToast,
  Button,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'

import { useSites } from 'hooks/useSites'
import { useAuth } from '@hooks/useAuth'
import { createSite } from '@lib/api'
import { useSite } from '@hooks/useSite'

interface ISiteForm {
  name: string
  subDomain: string
}

const checkIfSubDomainUsed = async (subDomain: string) => {
  const response = await fetch(`api/check-sub-domain?subDomain=${subDomain}`)
  if (response.status === 200) return false
  if (response.status === 403) return true
  return true
}

interface ISiteFormProps {
  onCloseDrawer: () => void
  siteId?: string
}

export function SiteFom({ onCloseDrawer, siteId }: ISiteFormProps) {
  const { authToken, userId } = useAuth()
  console.log('siteId', siteId)
  const { site } = useSite(siteId)
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting, isValidating, isValid },
  } = useForm<ISiteForm>({ reValidateMode: 'onChange', mode: 'onChange' })
  const subDomainValue = watch('subDomain')
  const { mutate } = useSites()

  const onSubmit: SubmitHandler<ISiteForm> = async data => {
    const response = await createSite<ISiteForm>({ site: data, token: authToken, owner: userId })
    if (response.status !== 201 && !response.ok) {
      return toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    reset()
    toast({
      title: 'Site created',
      description: 'You can now add content to your site',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    mutate()
    onCloseDrawer()
  }

  const checkSubDomain = useCallback(
    debounce(async (subDomain: string) => {
      const isUsed = await checkIfSubDomainUsed(subDomain?.trim())
      if (isUsed) return setError('subDomain', { type: 'validate' })
      return clearErrors('subDomain')
    }, 400),
    [],
  )

  useEffect(() => {
    if (subDomainValue && subDomainValue?.length >= 3) {
      checkSubDomain(subDomainValue)
    }
  }, [subDomainValue])

  useEffect(() => {
    if (site && siteId) {
      setValue('name', site?.name)
      setValue('subDomain', site?.subDomain)
    }
  }, [site, setValue, siteId])

  return (
    <Box as="form">
      <FormControl id="name" isRequired isInvalid={errors.name && true}>
        <FormLabel>Site Name</FormLabel>
        <Input
          placeholder="Ex: Cafe, Demo"
          {...register('name', {
            required: 'Site name is required',
            minLength: { value: 3, message: 'site name minimum length should be 3' },
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl id="sub-domain" isRequired mt="3" isInvalid={errors.subDomain && true}>
        <FormLabel>Sub-Domain</FormLabel>
        <InputGroup>
          <InputLeftAddon>{'https://'}</InputLeftAddon>
          <Input
            colorScheme="gray"
            placeholder="Ex: demo, coffee"
            {...register('subDomain', {
              required: 'Sub-Domain is required',
              minLength: { value: 3, message: 'Minimum length should be 3' },
            })}
          />
          <InputRightAddon>windr.co</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>
          {errors.subDomain && errors.subDomain.message}
          {errors.subDomain?.type === 'validate' && 'This Domain already used!'}
        </FormErrorMessage>
        <FormHelperText>
          {getValues('subDomain') && `final url: https://${getValues('subDomain')}.windr.co`}
        </FormHelperText>
      </FormControl>
      <Flex justify={'end'} mt="8">
        <Button
          colorScheme="blue"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          isDisabled={!isValid}
          isLoading={isSubmitting || isValidating}>
          Create
        </Button>
      </Flex>
    </Box>
  )
}
