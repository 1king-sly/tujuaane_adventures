import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from '@/app/lib/prismadb';

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"


type SessionStrategyType = 'jwt';


export const authOptions= 
{
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as SessionStrategyType,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        // token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        // session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
  },

  debug: process.env.NODE_ENV === 'development',
//   session: {
//     strategy: 'jwt' as SessionStrategyType,
//   },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth
