import React, { useState, useRef } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

const CopyToClipboardButton = ({ textToCopy }:any) => {
  const [isCopied, setIsCopied] = useState(false);
  const buttonRef = useRef(null);

  const copyTextToClipboard = async () => {
    if (!navigator.clipboard) {
      // Clipboard API not available
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button 
      ref={buttonRef} 
      onClick={copyTextToClipboard}
    >
      {isCopied 
        ? <CheckIcon className="text-undp" height={24} width={24}/> 
        : <ClipboardDocumentIcon className="text-undp hover:text-blue-900" height={24} width={24}/>
      }
    </button>
  );
};

export default CopyToClipboardButton;