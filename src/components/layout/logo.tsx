import Image from "next/image";
import Link from "next/link";

export default function Logo({ colour = "blue" }) {
  return (
    <Link href="/" className="flex-align items-center flex" aria-label="UNDP">
      <Image
        src={`${colour === "blue" ? "/static/images/logo.svg" : "/static/images/logo-white.svg"}`}
        alt="UNDP Logo"
        height={40} 
        width={40}
      />
      <span
        className={`${colour === "blue" ? "" : "text-white"} ml-4 text-md font-bold`}
      >
        Briefing Bot
      </span>
    </Link>
  );
}
