import { applyContextLimit, contextLimit, maxSize } from "@/constants";
import { getParagraphs, truncateString } from "@/helpers";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import type { Message } from "ai";
import Image from "next/image";
import { useRef, useState } from "react";

interface FileUploadProps {
	append: (message: Pick<Message, "content" | "role">) => void;
	messages: Message[];
}

export function FileUpload({ append, messages }: FileUploadProps) {	
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [docName, setDocName] = useState("");
	const [docType, setDocType] = useState(".pdf");
	const [uploadedDocs, setUploadedDocs] = useState<
		Array<{ type: string; name: string }>
	>([]);
	const [file, setFile] = useState(false);
	const [isFileOver, setIsFileOver] = useState(false);
	const [fileTooLarge, setFileTooLarge] = useState(false);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsFileOver(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsFileOver(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsFileOver(false);
		if (e.dataTransfer?.files?.[0]) {
			handleFileChange({
				target: { files: e.dataTransfer.files },
			} as React.ChangeEvent<HTMLInputElement>);
		}
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const updated = event.target.files?.[0];
		if (!updated) return;

		if (updated.size > maxSize) {
			setFileTooLarge(true);
			return;
		}

		const formData = new FormData();
		if (updated.type === "application/pdf") {
			setDocName(updated.name);
			formData.append("file", updated);
			setFile(true);
			setUploadedDocs((prev) => [
				...prev,
				{ type: ".pdf", name: updated.name },
			]);

			const reader = new FileReader();
			reader.onload = async (readEvent) => {
				const arrayBuffer = readEvent?.target?.result;
				const response = await fetch("/api/extract-pdf", {
					method: "POST",
					headers: {
						"Content-Type": "application/pdf",
					},
					body: arrayBuffer,
				});
				if (response.ok) {
					const data = await response.json();
					append({
						role: "system",
						content: `Uploaded document's content: ${
							applyContextLimit
								? truncateString(data.data.text, contextLimit)
								: data.data.text
						}`,
					});
					if (fileInputRef.current) fileInputRef.current.value = "";
				} else {
					console.error("Error extracting text", response);
					if (fileInputRef.current) fileInputRef.current.value = "";
				}
			};
			reader.readAsArrayBuffer(updated);
		} else {
			setUploadedDocs((prev) => [
				...prev,
				{ type: ".docx", name: updated.name },
			]);
			setDocType(".docx");
			setDocName(updated.name);
			formData.append("document", updated);
			setFile(true);

			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const content = e.target?.result as string;
				const paragraphs = getParagraphs(content);
				append({
					role: "system",
					content: `Uploaded document's content: ${
						applyContextLimit
							? truncateString(paragraphs.join(","), contextLimit)
							: paragraphs.join(",")
					}`,
				});
				if (fileInputRef.current) fileInputRef.current.value = "";
			};
			reader.onerror = (err) => console.error(err);
			reader.readAsBinaryString(updated);
		}
	};

	return (
		<>
			<div className="fixed m-4">
				{uploadedDocs &&
					messages.length > 0 &&
					uploadedDocs.map((d) => (
						<div
							key={d.name}
							className="rounded-md p-2 flex flex-align items-center max-w-xs whitespace-pre-wrap bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl w-full"
						>
							{d.type === ".pdf" ? (
								<Image src="/pdf.svg" height={24} width={24} alt="PDF Icon" />
							) : (
								<Image
									src="/ms-word.svg"
									height={24}
									width={24}
									alt="MS Word Icon"
								/>
							)}
							<span className="ml-2 font-bold text-undp">{d.name}</span>
						</div>
					))}
			</div>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept=".pdf,.doc,.docx"
				style={{ display: "none" }}
			/>
			{isFileOver && (
				<button
					type="button"
					className="mt-32 relative grid place-items-center w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<DocumentPlusIcon
						height={48}
						width={48}
						className="mr-2 text-gray-400"
					/>
					<span className="mt-2 block text-sm font-semibold text-gray-400">
						Add a file
					</span>
				</button>
			)}
			{fileTooLarge && (
				<div className="text-red-500 text-sm mt-2">
					File is too large. Maximum size allowed is {maxSize / (1024 * 1024)}
					MB.
				</div>
			)}
		</>
	);
}
