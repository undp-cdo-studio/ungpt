import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SharePointError = {
	message: string;
	code?: string;
	statusCode?: number;
};

export async function GET(req: NextRequest) {
	// SharePoint and Azure AD configuration
	const tenantId = process.env.SHAREPOINT_TENANT_ID;
	const clientId = process.env.SHAREPOINT_CLIENT_ID;
	const clientSecret = process.env.SHAREPOINT_CLIENT_SECRET;
	const siteId = process.env.SHAREPOINT_SITE_ID;
	const folderId = process.env.SHAREPOINT_FOLDER_ID;

	if (!tenantId || !clientId || !clientSecret || !siteId || !folderId) {
		return NextResponse.json(
			{ error: "Missing required environment variables" },
			{ status: 500 },
		);
	}

	// Create a credential using client secret
	const credential = new ClientSecretCredential(
		tenantId,
		clientId,
		clientSecret,
	);

	// Create an auth provider
	const authProvider = new TokenCredentialAuthenticationProvider(credential, {
		scopes: ["https://graph.microsoft.com/.default"],
	});

	// Initialize the Graph client
	const graphClient = Client.initWithMiddleware({ authProvider });

	try {
		// Query the specified folder
		const response = await graphClient
			.api(`/sites/${siteId}/drive/items/${folderId}/children`)
			.select("name,webUrl,file")
			.get();

		// Extract document information
		const documents = response.value.map((item: any) => ({
			name: item.name,
			url: item.webUrl,
			type: item.file?.mimeType,
		}));

		return NextResponse.json({ documents });
	} catch (error: unknown) {
		console.error("Error querying SharePoint:", error);
		return NextResponse.json(
			{ error: "Failed to fetch documents from SharePoint" },
			{ status: 500 },
		);
	}
}
