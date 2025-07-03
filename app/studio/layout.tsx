import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Gravex",
  description: "clothing store",
};

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <html>
        <body lang='en'>
            {children}
        </body>
    </html>
  )
}

export default RootLayout
