import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

export default NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (!user) return token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`,
      )

      const data = await response.json()

      if (data.error) {
        console.log(data)
        console.log(data.message[0].messages[0].message)
        throw new Error(data.error)
      }

      token.jwt = data.jwt
      token.id = data.user.id
      return token
    },
    session: async ({ session, token }) => {
      session.jwt = token.jwt
      session.id = token.id
      return session
    },
  },
  debug: true,
})
