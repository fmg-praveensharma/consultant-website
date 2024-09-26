"use client";
import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface UseAxiosConfig<T> extends AxiosRequestConfig {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}

interface UseAxiosReturn<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
  fetchData: (config?: AxiosRequestConfig) => Promise<void>;
}

export const useAxios = <T = any>(
  initialConfig: UseAxiosConfig<T>
): UseAxiosReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (config: AxiosRequestConfig = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios({
        ...initialConfig,
        ...config,
      });

      setData(response.data);

      if (initialConfig.onSuccess) {
        initialConfig.onSuccess(response.data);
      }
    } catch (err) {
      setError(err as AxiosError);

      if (initialConfig.onError) {
        initialConfig.onError(err as AxiosError);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};
