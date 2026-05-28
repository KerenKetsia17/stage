import { useState, useEffect } from 'react';
import { utiliserAuth } from './utiliserAuth';

const IS_DEMO =
  !import.meta.env.VITE_FIREBASE_API_KEY ||
  import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder';

/**
 * Retourne le nombre de commandes en attente (statut "pending") du fournisseur.
 * En mode démo : retourne 1 (simulation).
 */
export function usePendingCount() {
  const { userProfile } = utiliserAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (IS_DEMO) {
      setCount(1);
      return;
    }

    const supplierId = userProfile?.supplierId || userProfile?.uid;
    if (!supplierId) return;

    let cancelled = false;
    import('../services/api').then(({ getOrders }) => {
      getOrders(supplierId, 'pending')
        .then((res) => {
          if (!cancelled) setCount(res.data?.orders?.length || 0);
        })
        .catch(() => {
          if (!cancelled) setCount(0);
        });
    });

    return () => { cancelled = true; };
  }, [userProfile]);

  return count;
}
