import type { Message } from 'ai';
import { PlusIcon, SendIcon } from "lucide-react";
import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";


export type HandleSubmitProps = {
    message: string;
}

type ChatInputProps = {
    onSubmit: (args: HandleSubmitProps) => void;
    onFileSelect: (files: File[]) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onSelect?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    input?: string;
    handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isLoading?: boolean;
    stop?: () => void;
    append?: (message: Message) => void;
    setInput?: (input: string) => void;
}

export function ChatInput({
    onSubmit,
    onFileSelect,
    onFocus,
    onBlur,
    onSelect,
    onKeyDown,
    input,
    handleInputChange,
    isLoading,
    stop,
    append,
    setInput,
    ...rest
}: ChatInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const acceptedFileTypes = ".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx";
    const isDisabled = false;

    function submitMessage(message: string) {
        onSubmit({
            message,
        });
        setInput?.('');
    }


    const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const textarea = event.currentTarget.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
        if (textarea?.value.trim()) {
            submitMessage(textarea.value);
            textarea.value = '';
        }
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        onFileSelect(files);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            const message = event.currentTarget.value.trim();
            if (message) {
                submitMessage(message);
                event.currentTarget.value = '';
            }
        }
        onKeyDown?.(event);
    };

    return (
        <form onSubmit={handleChatSubmit} className="w-full fixed bottom-0 left-0 right-0 p-12">
            <div className="flex items-center gap-2 bg-white mx-12">
                <Button
                    type="button"
                    variant="default"
                    onClick={handleFileClick}
                >
                    <PlusIcon className="h-4 w-4" />
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={acceptedFileTypes}
                    multiple
                    onChange={handleFileSelect}
                    disabled={isDisabled}
                />
                <TextareaAutosize
                    name="message"
                    autoFocus
                    value={input}
                    onChange={handleInputChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-h-[40px] p-2 resize-none border rounded-md"
                    placeholder="Type a message..."
                    {...rest}
                />
                <Button
                    type="submit"
                    variant="default"
                    disabled={!input?.trim()}
                >
                    <SendIcon className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}   