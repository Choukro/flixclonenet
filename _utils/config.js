export const queryClientOptions = {
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      retry: (failureCount, error) => {
        if (error.status === 404) return false;
        else if (error.status === 401) return false;
        else if (failureCount > 3) return false;
        else return true;
      },
    },
  },
};
