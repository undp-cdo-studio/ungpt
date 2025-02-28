import { UNDP_CLIENT_DATA } from "@/data";
import { db } from "@/db";
import { type Organization, organizations } from "@/db/schema";
import logger from "@/logger";
import { eq } from "drizzle-orm";

const fetchLocalOrgs = false;
// const fetchLocalOrgs = !process.env.DATABASE_INITIALIZED
// const fetchLocalOrgs = true;

// Use the Organization type from schema instead of a minimal OrgProps
export async function getOrg(subdomain: string): Promise<Organization | null> {
	logger.api("Getting org for subdomain:", { subdomain, fetchLocalOrgs });
	try {
		if (!subdomain) {
			logger.api("No subdomain provided");
			return null;
		}

		if (fetchLocalOrgs) {
			// Look up the client data for this subdomain
			const clientData = UNDP_CLIENT_DATA.find(
				(client) => client.subdomain === subdomain,
			);

			return clientData ?? null;
		}

		const org = await db.query.organizations.findFirst({
			where: eq(organizations.subdomain, subdomain),
		});

		logger.api("Org found:", { org });
		return org ?? null;
	} catch (error) {
		logger.api("Error getting org:", { error });
		if (error instanceof Error) {
			logger.api("Error details:", {
				message: error.message,
				name: error.name,
				stack: error.stack,
			});
		}
		return null;
	}
}

export async function getAllOrgs() {
	if (fetchLocalOrgs) {
		return UNDP_CLIENT_DATA;
	}
	const orgs = await db.query.organizations.findMany();
	return orgs;
}
