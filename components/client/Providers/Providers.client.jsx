"use client";

import { queryClientOptions } from "../../../_utils/config.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export const Providers = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
