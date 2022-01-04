import { Container, useDisclosure } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

import { CreateSiteDrawer } from '@components/Drawers/CreateSiteDrawer'
import { Layout } from '@components/Layout'
import { DashboardHeader } from '@components/Headers/DashboardHeader'
import { SiteCards } from '@components/Cards/SiteCards'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [siteSelectedToEdit, setSiteSelectedToEdit] = useState<undefined | string>(undefined)
  useEffect(() => {
    if (siteSelectedToEdit) {
      onOpen()
    }
  }, [siteSelectedToEdit, onOpen])

  return (
    <Layout>
      {isOpen && <CreateSiteDrawer isOpen={isOpen} onClose={onClose} siteId={siteSelectedToEdit} />}
      <Container maxW="container.sm" py="6">
        <DashboardHeader
          onOpen={() => {
            setSiteSelectedToEdit(undefined)
            onOpen()
          }}
        />
        <SiteCards onClickEditSite={(value: string) => setSiteSelectedToEdit(value)} />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
      props: {},
    }
  }

  return { props: {} }
}
