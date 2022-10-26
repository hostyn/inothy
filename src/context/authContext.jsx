import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getUserData } from "../util/api";
import { useRouter } from "next/router";
import LoadingPage from "../components/LoadingPage";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

export function AuthProvider({ children, headers: initialHeaders }) {
  const {
    push,
    pathname,
    query: { ref },
  } = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [headers, setHeaders] = useState(initialHeaders);

  // AUTH FUNCTIONS
  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  const register = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsUser(false);
  };

  const updateData = async () => {
    if (user.emailVerified) {
      const data = await getUserData(user);
      setUser({ ...user, ["data"]: data });
      if (data.profileCompleted) setIsUser(true);
      else setIsUser(false);
    }
  };

  useEffect(() => {
    const localRef = localStorage.getItem("ref");
    if (!localRef && ref) {
      localStorage.setItem("ref", ref);
    }

    const unsubscirbe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        if (currentUser.emailVerified) {
          getUserData(currentUser).then((data) => {
            setUser({ ...currentUser, ["data"]: data });
            if (data.profileCompleted) setIsUser(true);
            else setIsUser(false);
            setIsLoading(false);
          });
        } else {
          setUser(currentUser);
          setIsUser(false);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscirbe();
  }, [ref]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (
    !isLoading &&
    user &&
    user.data &&
    !user.data.profileCompleted &&
    pathname !== "/completeprofile" &&
    pathname !== "/useractions"
  ) {
    push("/completeprofile");
    return <LoadingPage />;
  }

  return (
    <authContext.Provider
      value={{ login, register, logout, user, updateData, isUser, headers }}
    >
      {children}
    </authContext.Provider>
  );
}
