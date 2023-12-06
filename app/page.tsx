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

import getQueryClient from '../_lib/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query'



export default async function Home() {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    //  <ThemeProvider theme={theme}>
    // <ReactQueryHydrate state={dehydratedState}>
    <HydrationBoundary state={dehydratedState}>
      <NetflixApp />
    </HydrationBoundary>
      
    // </ReactQueryHydrate>
    // </ThemeProvider>
  );
}
