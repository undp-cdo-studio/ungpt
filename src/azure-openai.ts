import logger from "@/logger";
import { createAzure } from "@ai-sdk/azure";

export async function getAzureOpenai() {
	
	const openaiEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
	const apiKey = process.env.AZURE_OPENAI_KEY;
	const apiVersion = process.env.AZURE_OPENAI_VERSION;
	const deploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_ID;

	const envDict = {
        AZURE_OPENAI_ENDPOINT: openaiEndpoint,
        AZURE_OPENAI_KEY: apiKey,
        AZURE_OPENAI_VERSION: apiVersion,
        AZURE_OPENAI_DEPLOYMENT_ID: deploymentId,
    }

    logger.api("Azure OpenAI Configuration", envDict);
	
	for (const [key, value] of Object.entries(envDict)) {
		if (!value) {
			logger.error(`Missing environment variable: ${key}`);
			throw new Error(`Missing environment variable: ${key}`);
		}
	}
    
    if (!deploymentId || !apiVersion || !apiKey || !openaiEndpoint) {
        throw new Error("Missing Azure OpenAI environment variables");
    }

	// Extract the resource name from the endpoint
	const resourceName = openaiEndpoint.replace(/^https?:\/\//, '').split('.')[0];
	const azure = createAzure({
		resourceName,
		apiKey,
		apiVersion,
	});

	const model = azure(deploymentId);

	logger.api("Azure OpenAI Model", { model });

	return model;
}
