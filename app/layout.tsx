import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
// import type { AppProps } from 'next/app'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts'
}

type Props = {
  children: React.ReactNode
}

const RootLayout = ({children}:Props) => {
  return (
    <html lang="en">
      <body>
        <Provider >
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav/>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout