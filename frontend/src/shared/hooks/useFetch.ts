import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toError } from "@/shared/libs/toError";

type UseFetchReturn<TData> = {
  data: TData | null;
  isLoading: boolean;
  error: string | null;
  setData: Dispatch<SetStateAction<TData | null>>;
  refetch: () => Promise<void>;
};

export const useFetch = <TData>(
  fetchFn: () => Promise<TData>,
): UseFetchReturn<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      if (!controller.signal.aborted) {
        setData(result);
      }
    } catch (exception) {
      if (!controller.signal.aborted) {
        setError(toError(exception).message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [fetchFn]);

  useEffect(() => {
    run();
    return () => abortControllerRef.current?.abort();
  }, [run]);

  return {
    data,
    isLoading,
    error,
    setData,
    refetch: run,
  };
};
