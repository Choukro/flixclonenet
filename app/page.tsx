// 'use client'

import {NetflixApp} from '../components/NetflixApp'
// import {createTheme, ThemeProvider} from '@mui/material/styles'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#111',
//     },
//     secondary: {
//       main: '#000',
//     },
//   },
// })

export default function Home() {
  return (
  //  <ThemeProvider theme={theme}>
      <NetflixApp />
    // </ThemeProvider>
  )
}
