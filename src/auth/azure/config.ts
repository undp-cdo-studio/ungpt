import {
	type Configuration,
	LogLevel,
	type PopupRequest,
	PublicClientApplication,
} from "@azure/msal-browser";
  
//   console.log(process.env);
  
//   // Ensure environment variables are defined
//   if (!process.env.AZURE_CLIENT_ID) throw new Error('AZURE_CLIENT_ID environment variable is not defined');
//   if (!process.env.AZURE_AUTHORITY) throw new Error('AZURE_AUTHORITY environment variable is not defined');
//   if (!process.env.AZURE_REDIRECT_URL) throw new Error('AZURE_REDIRECT_URL environment variable is not defined');
  
  export const msalConfig: Configuration = {
	  auth: {
		  clientId: process.env.CLIENT_ID as string,
		  authority: process.env.AUTHORITY as string,
		  redirectUri: process.env.REDIRECT_URL as string,
		  postLogoutRedirectUri: process.env.REDIRECT_URL as string,
	  },
	  system: {
		  allowNativeBroker: false, // Disables WAM Broker
		  loggerOptions: {
			  loggerCallback: (level, message, containsPii) => {
				  if (containsPii) {
					  return;
				  }
				  switch (level) {
					  case LogLevel.Error:
						  console.error(message);
						  return;
					  case LogLevel.Info:
						  // console.info(message);
						  return;
					  case LogLevel.Verbose:
						  console.debug(message);
						  return;
					  case LogLevel.Warning:
						  console.warn(message);
						  return;
					  default:
						  return;
				  }
			  },
		  },
	  },
	  cache: {
		  cacheLocation: "sessionStorage", // This configures where your cache will be stored
		  storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
	  },
  };
  
  // Add here scopes for id token to be used at MS Identity Platform endpoints.
  export const loginRequest: PopupRequest = {
	  scopes: ["User.Read"],
  };
  
  // Add here the endpoints for MS Graph API services you would like to use.
  export const graphConfig = {
	  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
	  graphMePhotoEndpoint:
		  "https://graph.microsoft.com/v1.0/me/photos/48x48/$value",
  };
  
  export const msalInstance = new PublicClientApplication(msalConfig);
  
  export async function acquireGraphAccessToken() {
	const account = msalInstance.getActiveAccount();
	if (!account) {
	  throw Error(
		"No active account! Verify a user has been signed in and setActiveAccount has been called."
	  );
	}
  
	try {
	  const response = await msalInstance.acquireTokenSilent({
		...loginRequest,
		account: account,
	  });
	  return response.accessToken;
	} catch (error) {
	  if (error instanceof Error && (error.message.includes('AADSTS50058') || error.message.includes('AADSTS50076'))) {
		msalInstance.acquireTokenRedirect({
		  ...loginRequest,
		  account: account,
		});
	  } else {
		console.error('Failed to acquire token silently', error);
	  }
	  throw error;
	}
  }
  
  export function handleSignIn() {
	msalInstance.loginRedirect(loginRequest).catch((e) => {
	  console.error(`loginRedirect failed: ${e}`);
	});
  }
  
  export function handleSignOut() {
	msalInstance.logoutRedirect(loginRequest).catch((e) => {
	  console.error(`loginRedirect failed: ${e}`);
	});
  }