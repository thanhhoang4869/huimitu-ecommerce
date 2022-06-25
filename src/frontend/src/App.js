import React from "react";
import MainPage from "./pages/MainPage";
import { GoogleOAuthProvider } from '@react-oauth/google';

class App extends React.Component {
  render() {
    return (
      <>
        <GoogleOAuthProvider clientId="455931437831-1fecelj6u4fk96t0vrcnvr45pbgirch0.apps.googleusercontent.com">
          <MainPage />
        </GoogleOAuthProvider>;
      </>
    );
  }
}

export default App;
