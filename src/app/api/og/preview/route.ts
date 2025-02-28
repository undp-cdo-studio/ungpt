import { UNDP_CLIENT_DATA } from "@/data";
import { type NextRequest, NextResponse } from "next/server";
import { GET as generateOGImage } from "../route";

export const runtime = "edge";

export async function GET() {
	try {
		// Generate default image
		const defaultReq = new Request("http://localhost/api/og");
		const defaultImage = await generateOGImage(defaultReq as NextRequest);
		const defaultImageBase64 = Buffer.from(await defaultImage.arrayBuffer()).toString("base64");

		const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

		// Generate images for each client
		const clientImages = await Promise.all(
			UNDP_CLIENT_DATA.map(async (client) => {
				const url = new URL(appDomain);
				url.searchParams.set("subdomain", client.subdomain);
				const req = new Request(url);
				const image = await generateOGImage(req as NextRequest);
				const base64 = Buffer.from(await image.arrayBuffer()).toString("base64");
				return {
					subdomain: client.subdomain,
					name: client.name,
					imageData: base64
				};
			})
		);

		return NextResponse.json({
			message: "Generated OG preview images",
			default: defaultImageBase64,
			clients: clientImages
		});
	} catch (error) {
		console.error("Error generating OG previews:", error);
		return NextResponse.json(
			{ error: "Failed to generate OG previews" },
			{ status: 500 },
		);
	}
}
