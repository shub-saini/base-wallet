import { useEffect, useState } from 'react';
import { useKeyStore } from '@/store/keyStore';

export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (useKeyStore.persist.hasHydrated()) {
      setHasHydrated(true);
    } else {
      useKeyStore.persist.onHydrate(() => {
        setHasHydrated(true);
      });
    }
  }, []);

  return hasHydrated;
}
