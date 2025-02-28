import logger from "@/logger";
import { DOMParser } from "@xmldom/xmldom";
import PizZip from "pizzip";

export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
}

export function str2xml(str: string) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

// Get paragraphs as javascript array
export function getParagraphs(content: any) {
  const zip = new PizZip(content);
  if (!zip.files["word/document.xml"]) {
    return [];
  }

  const xml = str2xml(zip.files["word/document.xml"].asText());
  const paragraphsXml = xml.getElementsByTagName("w:p");
  const paragraphs = [];

  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
    let fullText = "";

    const paragraph = paragraphsXml[i];
    if (!paragraph) continue;

    const textsXml = paragraph.getElementsByTagName("w:t");
    logger.lug("Texts XML reads", textsXml)
    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
      const textXml = textsXml[j];
      const firstChild = textXml?.childNodes?.[0];
      if (firstChild?.nodeValue) {
        fullText += firstChild.nodeValue;
      }
    }
    if (fullText) {
      paragraphs.push(fullText);
    }
  }
  return paragraphs;
}

// const DocxReader = () => {
//   const [paragraphs, setParagraphs] = useState<any|null>([]);

//   const onFileUpload = (event:any) => {
//     const reader = new FileReader();
//     let file = event.target.files[0];

//     reader.onload = (e:any) => {
//       const content = e.target.result;
//       const paragraphs = getParagraphs(content);
//       setParagraphs(paragraphs);
//     };

//     reader.onerror = (err) => console.error(err);

//     reader.readAsBinaryString(file);
//   };

//   //@ts-ignore
//   return <input type="file" onChange={onFileUpload} name="docx-reader" />;
// };

// export default DocxReader;