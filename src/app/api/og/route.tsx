import { UNDP_CLIENT_DATA } from "@/data";
import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
	try {
		const subdomain = req.nextUrl?.searchParams?.get("subdomain") || null;

		// If no subdomain is provided, return default UNDP image
		if (!subdomain) {
			return new ImageResponse(
				<div
					style={{
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#0468B1", // UNDP Blue
						padding: "40px",
					}}
				>
					<div
						style={{
							display: "flex",
							fontSize: 60,
							fontWeight: "bold",
							color: "white",
							marginBottom: "20px",
							textAlign: "center",
						}}
					>
						UNDP AI Chatbot Platform
					</div>
				</div>,
				{
					width: 1200,
					height: 630,
				},
			);
		}

		// Find client data based on subdomain
		const clientData = UNDP_CLIENT_DATA.find(
			(client) => client.subdomain === subdomain,
		);

		if (!clientData) {
			return new Response("Subdomain not found", { status: 404 });
		}

		return new ImageResponse(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#0468B1", // UNDP Blue
					padding: "40px",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "20px",
					}}
				>
					<div
						style={{
							fontSize: 72,
							fontWeight: "bold",
							color: "white",
							textAlign: "center",
							lineHeight: 1.2,
						}}
					>
						{clientData.name}
					</div>
					<div
						style={{
							fontSize: 36,
							color: "white",
							textAlign: "center",
							opacity: 0.9,
						}}
					>
						UNDP AI Co-pilot
					</div>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
			},
		);
	} catch (e) {
		return new Response("Failed to generate image", { status: 500 });
	}
}
