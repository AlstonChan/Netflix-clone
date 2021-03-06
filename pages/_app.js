import "../styles/globals.css";

import Head from "next/head";

import { createContext, useEffect, useRef, useState } from "react";
import { auth, db } from "../lib/firebase";
import initAuth from "../lib/initAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

initAuth();

export const UserContext = createContext({
  user: null,
  loading: null,
  error: null,
});

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const [queryClient] = useState(() => new QueryClient());
  const [userData, setUserData] = useState(null);
  const myMovieData = useRef();
  const [listMovieData, setListMovieData] = useState();

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (user) {
      try {
        (async () => {
          if (user) {
            const querySnapshot = onSnapshot(
              doc(db, "Acc", user.uid),
              (documents) => {
                setUserData(documents.data());
              }
            );
            const eventSnapshot = onSnapshot(
              doc(db, "mymovie", user.uid),
              async (documents) => {
                // For user that just sign up
                if (documents.exists() === false) {
                  console.info("no doc found");
                  setDoc(doc(db, "mymovie", user.uid), {
                    "user-main": [
                      { movieID: null, addList: false, like: "none" },
                    ],
                  });
                }
                myMovieData.current = documents;
                setListMovieData(documents);
              }
            );
          }
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  return getLayout(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserContext.Provider
            value={{
              user,
              loading,
              error,
              userData,
              myMovieData,
              listMovieData,
            }}
          >
            <Component {...pageProps} />
          </UserContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
