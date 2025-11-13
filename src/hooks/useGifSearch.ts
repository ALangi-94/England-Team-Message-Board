import { useState, useCallback, useRef } from 'react';

export interface GifResult {
  id: string;
  title: string;
  url: string;
  fullUrl: string;
  provider?: string;
  attribution?: string;
  license?: string;
  licenseUrl?: string;
}

interface OpenverseResponse {
  results?: Array<{
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
    provider?: string;
    attribution?: string;
    license?: string;
    license_url?: string;
  }>;
}

const OPENVERSE_ENDPOINT = 'https://api.openverse.org/v1/images/';
const OPENVERSE_LICENSES =
  'cc0,by,by-sa,by-nd,by-nc,by-nc-sa,by-nc-nd';

export const useGifSearch = () => {
  const [results, setResults] = useState<GifResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastQueryRef = useRef<string>('');

  const searchGifs = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();
    const effectiveQuery = trimmedQuery.length > 0 ? trimmedQuery : 'england football celebration';

    if (effectiveQuery === lastQueryRef.current) {
      return;
    }

    lastQueryRef.current = effectiveQuery;
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: effectiveQuery,
        license: OPENVERSE_LICENSES,
        extension: 'gif',
        page_size: '18',
      });

      const response = await fetch(`${OPENVERSE_ENDPOINT}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Openverse request failed with status ${response.status}`);
      }

      const data = (await response.json()) as OpenverseResponse | undefined;

      const mappedResults =
        data?.results?.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.thumbnail || item.url,
          fullUrl: item.url,
          provider: item.provider,
          attribution: item.attribution,
          license: item.license,
          licenseUrl: item.license_url,
        })) ?? [];

      setResults(mappedResults);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : 'Unable to load GIFs';
      setError(message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    searchGifs,
    clearError,
  };
};

