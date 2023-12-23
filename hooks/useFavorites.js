"use client";

import useSWR from "swr";

import fetcher from "../_lib/fetcher";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useFavorites = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/bookmark", fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
  //   try {
  //     const { data } = await fetch("/api/bookmark", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("data :", data);
  //     return data;
  //   } catch (error) {
  //     console.log("error :", error);
  //     throw error;
  //   }
  // };

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;
