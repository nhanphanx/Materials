'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }
    router.replace(`/blog?${params.toString()}`);
  }, [debouncedQuery, router]);

  return (
    <div className="mb-8">
      <Input
        type="text"
        placeholder="Search posts..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full"
      />
    </div>
  );
}