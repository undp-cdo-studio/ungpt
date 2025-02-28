import { getOrg } from "@/lib/orgs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const subdomain = searchParams.get("subdomain");

    if (!subdomain) {
        return NextResponse.json({ error: "Subdomain is required" }, { status: 400 });
    }   

    const clientData = await getOrg(subdomain);

    if (!clientData) {
        return NextResponse.json({ error: "Client data not found" }, { status: 404 });
    }      

    return NextResponse.json(clientData);
}   