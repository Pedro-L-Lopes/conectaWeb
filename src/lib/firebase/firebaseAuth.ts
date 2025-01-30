import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

import { useState, useEffect } from "react";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const [cancelled, seCancelled] = useState<boolean | null>(null);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data: any) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.pass
      );

      await updateProfile(user, { displayName: data.displayName });

      return user;
    } catch (error) {
      console.log(error);
    }
  };
};

return {
  auth,
  createUser,
};

export async function login(email: string, pass: string) {
  return signInWithEmailAndPassword(auth, email, pass);
}

export async function name() {
  return signOut(auth);
}

export async function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
