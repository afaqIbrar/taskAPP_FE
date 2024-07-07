import './index.css';
import { useState } from 'react';
import { SharedContext, getUser, getUserToken } from './utils/utils';
import { ToastContainer } from 'react-toastify';
import { useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';



function App() {
  const [authToken, setAuthToken] = useState(getUserToken());
  const [currentUser, setCurrentUser] = useState(getUser());
  const routing = useRoutes(routes(currentUser));
  console.log('currentUser', currentUser);

  return (
    <SharedContext.Provider
      value={{
        authToken,
        currentUser,
        setAuthToken,
        setCurrentUser
      }}
    >
      <ToastContainer autoClose={1000} />
      {routing}
    </SharedContext.Provider>
  );
}

export default App;
