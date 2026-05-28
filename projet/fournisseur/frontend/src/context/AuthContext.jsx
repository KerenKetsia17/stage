import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const IS_DEMO = !import.meta.env.VITE_FIREBASE_API_KEY ||
  import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder';

const DEMO_USER = {
  uid: 'demo-uid-001',
  email: 'sow@yahoo.fr',
  displayName: 'Dupont Matériaux',
};

// En mode démo : null = pas de filtre, le fournisseur voit toutes les commandes
const DEMO_SUPPLIER_ID = null;

const DEMO_PROFILE = {
  uid: 'demo-uid-001',
  email: 'sow@yahoo.fr',
  name: 'Dupont Matériaux',
  role: 'supplier',
  address: '4 Rue des Matériaux, Lyon',
  phone: '+237 6 99 88 77 66',
  isActive: true,
  supplierId: null,
  stock: { sable: 1400, beton: 100, gravier: 50, ciment: 150, parpaing: 0 },
};

/**
 * Cherche dans /suppliers/ de la Realtime DB un supplier dont le champ `email`
 * ou `ownerId` correspond à l'utilisateur connecté.
 * Retourne { supplierId, supplierData } ou null.
 */
async function resolveSupplierFromRealtime(userEmail, userUid) {
  try {
    const { realtimeDb, rtRef, rtOnValue } = await import('../firebase');
    return await new Promise((resolve) => {
      const suppliersRef = rtRef(realtimeDb, 'suppliers');
      rtOnValue(suppliersRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) { resolve(null); return; }
        for (const [key, val] of Object.entries(data)) {
          if (
            (val.email && val.email === userEmail) ||
            (val.ownerId && val.ownerId === userUid)
          ) {
            resolve({ supplierId: key, supplierData: val });
            return;
          }
        }
        resolve(null);
      }, { onlyOnce: true });
    });
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO) {
      // Mode demo : lire la session depuis localStorage
      const saved = localStorage.getItem('demo_user');
      if (saved) {
        setUser(DEMO_USER);
        setUserRole('supplier');
        setUserProfile(DEMO_PROFILE);
        setSupplierId(DEMO_SUPPLIER_ID);
      }
      setLoading(false);
      return;
    }

    // Mode Firebase réel
    let unsubscribe = () => {};
    Promise.all([
      import('../firebase'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]).then(([{ auth, db }, { onAuthStateChanged }, { doc, getDoc }]) => {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              setUserRole(data.role || null);
              setUserProfile(data);
            }
          } catch {
            setUserRole(null);
            setUserProfile(null);
          }
          // Résoudre le supplierId depuis la Realtime DB
          const resolved = await resolveSupplierFromRealtime(firebaseUser.email, firebaseUser.uid);
          setSupplierId(resolved?.supplierId || null);
        } else {
          setUser(null);
          setUserRole(null);
          setUserProfile(null);
          setSupplierId(null);
        }
        setLoading(false);
      });
    });
    return () => unsubscribe();
  }, []);

  const connexion = async (email, password) => {
    if (IS_DEMO) {
      // Accepter sow@yahoo.fr/passer@1 ou n'importe quel compte en mode demo
      if (password.length < 6) throw { code: 'auth/wrong-password' };
      localStorage.setItem('demo_user', JSON.stringify({ email }));
      setUser({ ...DEMO_USER, email });
      setUserRole('supplier');
      setUserProfile({ ...DEMO_PROFILE, email });
      setSupplierId(DEMO_SUPPLIER_ID);
      return;
    }
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const { auth } = await import('../firebase');
    return signInWithEmailAndPassword(auth, email, password);
  };

  const deconnexion = async () => {
    if (IS_DEMO) {
      localStorage.removeItem('demo_user');
      setUser(null);
      setUserRole(null);
      setUserProfile(null);
      setSupplierId(null);
      return;
    }
    const { signOut } = await import('firebase/auth');
    const { auth } = await import('../firebase');
    return signOut(auth);
  };

  const inscription = async (email, password) => {
    if (IS_DEMO) throw new Error('Mode demo actif');
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { auth } = await import('../firebase');
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const getToken = async () => {
    if (IS_DEMO) return 'demo-token';
    if (!user) return null;
    return user.getIdToken();
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, userProfile, supplierId, loading, connexion, deconnexion, inscription, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext doit être utilisé dans AuthProvider');
  return ctx;
}

export default AuthContext;
