import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate,useLocation,Outlet } from 'react-router-dom';
import { DASHBOARD,LOGIN } from './routes';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth,db } from './firebase.config';
import { doc,getDoc,collection } from 'firebase/firestore';
export function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
 
  useEffect(() => {
    if (!isLoading && pathname === "/") {
      navigate(DASHBOARD);
    }
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading]);

//   if (isLoading) return <Loading />;

  return (
    <>
     
        <Outlet />
      
    </>
  );
}

  export function useAuth(un,ua) {
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
// console.log(user,"user")
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        const ref = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(ref);
        
        if (docSnap.exists()) {
       setUser(docSnap.data());
       setLoading(false);
        } else {
          console.log("No such document!");
        }
       
      }

      if (!authLoading) {
        if (authUser) fetchData();
        else setLoading(false); // Not signed in
      }
    }, [authLoading,un,ua]);

    return { user, isLoading, error };
  }
