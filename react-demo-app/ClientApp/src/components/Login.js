import React, { useEffect, useState } from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import axios from 'axios';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

const tenantId = "a3b09b39-59ab-407c-ad97-dbecca421780";
const clientId = "caac7aff-dcda-438d-95a5-c625e090e551";

const config = {
  auth: {
    clientId: clientId,
    redirectUri: 'https://localhost:44448/fetch-data',
    authority: `https://login.microsoftonline.com/${tenantId}`,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};

const graphApiEndpoint = 'https://graph.microsoft.com/v1.0/me';

const GraphApiCaller = () => {
  const { instance, accounts } = useMsal();
  const [displayName, setDisplayName] = useState('');
  const [loadingUser, setLoadingUser] = useState(false);

  const isLoggedIn = accounts && accounts.length > 0;

  const handleSignIn = async () => {
    try {
      await instance.loginPopup();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = () => {
    instance.logout();
  };

  const getUserDisplayName = async () => {
    setLoadingUser(true);
    try {
      const response = await instance.acquireTokenSilent({
        scopes: ['user.read'],
        account: accounts[0],
      });

      const accessToken = response.accessToken;

      const apiResponse = await axios.get(graphApiEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setDisplayName(apiResponse.data.displayName || '');
    } catch (error) {
      setDisplayName('');
      console.error('Error fetching user display name:', error);
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserDisplayName();
    } else {
      setDisplayName('');
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minHeight: 40 }}>
      {isLoggedIn && (
        <span style={{ marginRight: 16 }}>
          {loadingUser ? 'Loading user...' : displayName}
        </span>
      )}
      {!isLoggedIn && (
        <PrimaryButton onClick={handleSignIn} style={{ marginRight: 8 }}>Sign In</PrimaryButton>
      )}
      {isLoggedIn && (
        <DefaultButton onClick={handleSignOut}>Sign Out</DefaultButton>
      )}
    </div>
  );
};

const Login = () => {
  const [pca, setPca] = useState(null);

  useEffect(() => {
    const pcaInstance = new PublicClientApplication(config);
    pcaInstance.initialize().then(() => {
      setPca(pcaInstance);
    });
  }, []);

  if (!pca) {
    return <div>Initializing authentication...</div>;
  }

  return (
    <MsalProvider instance={pca}>
      <GraphApiCaller />
    </MsalProvider>
  );
};

export default Login;