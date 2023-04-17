import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

const AuthContext = createContext({
  user: {},
  isLoading: false,
  login() {},
  logout() {},
  register() {},
  feedback: {
    show: false,
    msg: '',
    type: '',
  },
  ui: {},
});

// pervadinti AuthContext
AuthContext.displayName = 'Autentifikacija';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    msg: '',
    type: '',
  });

  useEffect(() => {
    // stebim vartojo prisijungimo busena
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log('prisijungimas', user.email);
        setUser(user);
        setFeedback({
          show: true,
          msg: 'User logged in',
          type: 'success',
        });
      } else {
        // User is signed out
        // ...
        console.log('Logout User');
        setUser(null);
      }
    });
  }, []);

  // paslepti alerta po 3 sek
  const { show, msg } = feedback;
  useEffect(() => {
    if (show === true && msg !== 'Loading') {
      setTimeout(() => {
        setFeedback({
          show: false,
          msg: '',
          type: '',
        });
      }, 3000);
    }
  }, [show, msg]);

  const ui = {
    showSuccess(msg = '') {
      setFeedback({
        show: true,
        msg: msg || 'Success',
        type: 'success',
      });
    },
    showError(msg = '') {
      setFeedback({
        show: true,
        msg: msg || 'Klaida',
        type: 'error',
      });
    },
    showLoading() {
      setFeedback({
        show: true,
        msg: 'Loading',
        type: 'info',
      });
    },
    closeAlert() {
      setFeedback({
        show: false,
        msg: '',
        type: '',
      });
    },
  };

  const isLoggedIn = !!user;

  function login(userObj) {
    setUser(userObj);
    ui.showSuccess('User logged in');
  }
  function logout() {
    setUser(null);
    ui.showSuccess('User logged out');
  }

  const authCtx = {
    user,
    isLoading,
    setIsLoading,
    isLoggedIn,
    login,
    logout,
    feedback,
    ui,
  };
  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
