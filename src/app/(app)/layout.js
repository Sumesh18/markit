export const metadata = {
  title: 'Markit',
  description: 'All your links like socials, bookmarks, important urls at one place',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
