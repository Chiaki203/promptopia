import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';


console.log({
  clientId: process.env.GOOGLE_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
})

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async session({session}:{session:any}) {
      console.log('nextauth session', session)
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      console.log('nextauth sessionUser', sessionUser)
      session.user.id = sessionUser._id.toString()
      return {
        ...session
      }
    },
    async signIn({profile, user}) {
      console.log('signIn profile', profile)
      console.log('signIn user', user)
      try {
        await connectToDB()
        const userExists = await User.findOne({
          email: user?.email
        })
        console.log('signIn userExists', userExists)
        if (!userExists) {
          await User.create({
            email: user?.email,
            username: user?.name?.replace(' ', '').toLowerCase(),
            image: user?.image
          })
        }
        return true
      } catch(error) {
        console.log('Error signing in', error)
        return false
      }
    }
  }
})

export {handler as GET, handler as POST}