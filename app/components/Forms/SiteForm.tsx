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
    if (response.status === 200) {
      const fullCustomDomain = `${data.subDomain}.windr.co`
      const res = await fetch(`api/add-custom-domain?domain=${fullCustomDomain}`, {
        method: 'POST',
      })
    }
    if (response.status !== 200 && !response.ok) {
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
      const isUsed = await checkIfSubDomainUsed(subDomain)
      if (isUsed) { return setError('subDomain', { type: 'validate', message: 'This domain already used'}) }
      return clearErrors('subDomain')
    }, 400),
    [],
  )

  useEffect(() => {
    console.log('Form Errors', errors)
  })

  useEffect(() => {
    if (isValid && !isValidating) {
      checkSubDomain(subDomainValue)
    }
  }, [isValid, isValidating])

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
              setValueAs: (value: string) => value.trim().toLowerCase(),
              validate: {
                hasSpecialCharacters: value => value?.match(/\s/g) ? 'Sub-Domain should not contain spaces' : true,
                shouldBeCharacters: value => value?.match(/[^a-z0-9-]/g) ? 'Sub-Domain should only contain characters and numbers' : true,
              }
            })}
          />
          <InputRightAddon>windr.co</InputRightAddon>
        </InputGroup>
        <FormErrorMessage>
          {errors.subDomain && errors.subDomain.message}
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
          isDisabled={isValidating || isSubmitting || !isValid}
          isLoading={isSubmitting || isValidating}>
          {siteId ? 'Update' : 'Create'}
        </Button>
      </Flex>
    </Box>
  )
}
