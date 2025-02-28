let globalId: string | null = null; // Variable to hold the global ID

export const init = (id?: string) => {
	globalId = id || null; // Set the global ID if provided
};

function lug(...args: any[]) {
	// logger.lug(...args);
    
}   

function apo(...args: any[]) {
	
}

// style error in browser console with bright red bold
function error(...args: any[]) {
	console.log("\x1b[31m%s\x1b[0m", ...args);
}	

function log(...args: any[]) {
	console.log("_log", globalId ? `[${globalId}]` : '', ...args);
}	



function api(...args: any[]) {
	console.log("_api", globalId ? `[${globalId}]` : '', ...args);
}

function lig(...args: any[]) {
	if (process.env.LOG_LEVEL === "debug") {    
		console.log(globalId ? `[${globalId}]` : '', ...args);
	}
}

const logger = {
	...console,
	api,
	lug,
	error,
	log,
	lig,
	apo,
	init, // Export the init function
};

export default logger;