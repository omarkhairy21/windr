import { Button, Icon, MenuItem } from '@chakra-ui/react'
import { MdImage } from 'react-icons/md'

interface ImageButtonProps {
  handleClick: () => void
}

export const ImageButton = ({ handleClick }: ImageButtonProps) => (
  <Button
    onClick={handleClick}
    key="Image"
    boxShadow="lg"
    bgColor="white"
    borderRadius="5"
    as="button">
    <Icon as={MdImage} boxSize="6" size="24px" color="gray.700" mr="2" /> {'Image'}
  </Button>
)
export const ImageMenuItem = ({ handleClick }: ImageButtonProps) => (
  <MenuItem
    onClick={handleClick}
    key="Image"
    boxShadow="lg"
    bgColor="white"
    borderRadius="5"
    as="button">
    <Icon as={MdImage} boxSize="6" size="24px" color="gray.700" mr="2" />
    {'Image'}
  </MenuItem>
)
