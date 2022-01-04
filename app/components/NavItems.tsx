import { Button, Stack } from '@chakra-ui/react'
import { NAV_ITEMS, LOG_OUT } from 'config/settings'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export function NavItems() {
  return (
    <Stack>
      {NAV_ITEMS.map(({ name, link }) => (
        <Link href={`/${link}`} key={name}>
          <Button color="gray.500" key={link}>
            {name}
          </Button>
        </Link>
      ))}
      <Button color="gray.500" onClick={() => signOut()}>
        {LOG_OUT.name}
      </Button>
    </Stack>
  )
}
