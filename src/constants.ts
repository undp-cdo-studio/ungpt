export const applyContextLimit = true
export const contextLimit = 124000
export const maxSize = 5 * 1024 * 1024; // 5MB in bytes


export const templateCommand = `
You are a helpful assistant that can answer questions and help with tasks.
You are given a template of a document.
You are given a question.
You need to answer the question based on the template.
`

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "UNGPT";
