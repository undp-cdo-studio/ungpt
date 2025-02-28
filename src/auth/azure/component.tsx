"use client";

import { CustomNavigationClient } from "@/customNavigationClient";
import {
	type AuthenticationResult,
	type EventMessage,
	EventType,
} from "@azure/msal-browser";
import {
	MsalProvider
} from "@azure/msal-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { msalInstance } from "./config";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const msal = msalInstance;
	if (!msal) {
		throw new Error("Msal instance not found");
	}

	msal.initialize().then(() => {
		const accounts = msal.getAllAccounts();
		if (accounts.length > 0 && accounts[0]) {
			msal.setActiveAccount(accounts[0]);
		} else {
			msal.setActiveAccount(null);
		}

		msal.addEventCallback((event: EventMessage) => {
			if (event.eventType === EventType.LOGIN_SUCCESS) {
				const payload = event.payload as AuthenticationResult;
				if (payload.account) {
					msal.setActiveAccount(payload.account);
				}
			}
		});
	});

	const router = useRouter();
	const navigationClient = new CustomNavigationClient(router);
	msal.setNavigationClient(navigationClient);

	return (
		<MsalProvider instance={msal}>
			<AzureAuthWrapper>{children}</AzureAuthWrapper>
		</MsalProvider>
	);
};

export function AzureAuthWrapper({ children }: { children: React.ReactNode }) {
	const [isInitialized, setIsInitialized] = useState(false);
	const [initError, setInitError] = useState<Error | null>(null);

	useEffect(() => {
		// This effect handles redirect responses and cleans up any stuck states
		const handleRedirectResponse = async () => {
			try {
				// Clear any stuck interaction status before handling redirect
				if (typeof window !== 'undefined') {
					const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
					if (clientId) {
						const interactionKey = `${clientId}.interaction.status`;
						// Only log and clear if there's actually a stuck interaction
						if (sessionStorage.getItem(interactionKey) === "inProgress") {
							console.log("Found a stuck interaction before handling redirect, clearing it");
							sessionStorage.removeItem(interactionKey);
						}
					}
				}

				// This is crucial - handle any redirects before rendering the app
				// This resolves the "interaction_in_progress" error
				const response = await msalInstance.handleRedirectPromise();

				if (response) {
					console.log("Successfully handled redirect response", response);
					// You could store the user or token information in state/context here
				}
			} catch (error) {
				console.error("Error handling redirect:", error);
				setInitError(error as Error);
				
				// If there was an error, make sure we clean up any stuck interactions
				if (typeof window !== 'undefined') {
					const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
					if (clientId) {
						const interactionKey = `${clientId}.interaction.status`;
						sessionStorage.removeItem(interactionKey);
					}
				}
			} finally {
				setIsInitialized(true);
			}
		};

		handleRedirectResponse();
		
		// Register an event listener to clear stuck interactions if page is unloaded during auth
		const handleBeforeUnload = () => {
			if (typeof window !== 'undefined') {
				const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
				if (clientId) {
					const interactionKey = `${clientId}.interaction.status`;
					sessionStorage.removeItem(interactionKey);
				}
			}
		};
		
		window.addEventListener('beforeunload', handleBeforeUnload);
		
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	// Show nothing until we've handled any redirects
	if (!isInitialized) {
		return <div>Initializing authentication...</div>;
	}

	if (initError) {
		// We still render the app, but you might want to show an error message
		console.error("Authentication initialization error:", initError);
	}

	return <>{children}</>;
}

export default AzureAuthWrapper;
