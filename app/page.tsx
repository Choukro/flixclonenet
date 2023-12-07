import {NetflixApp} from '../components/client/NetflixApp'
import getQueryClient from '../_lib/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from "../components/client/ErrorFallback";


export default async function Home() {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HydrationBoundary state={dehydratedState}>
        <NetflixApp />
      </HydrationBoundary>
    </ErrorBoundary>
  );
}
