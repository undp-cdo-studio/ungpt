"use client";

import { useAccount, useUserAvatar } from "@/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Button,
} from "@/components/ui";
import { AuthenticatedTemplate } from "@azure/msal-react";
// Example icons from lucide-react.
// Replace or supplement with Fluent UI icons if you prefer:
import { Home, SeparatorVertical } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// Simple helper to conditionally join Tailwind class names
import { cn } from "@/utils";

export default function UserButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Classes for our "active" state
  const activeClasses = "bg-muted text-primary";
  const account = useAccount();
  const { imageSrc } = useUserAvatar();

  return (
    <div className="flex flex-col w-full space-y-2 p-4 border-b">
      {/* "Home" button */}
      <Button
        variant="ghost"
        className={cn(
          "justify-start w-full",
          pathname === "/" && activeClasses
        )}
        onClick={() => router.push("/")}
      >
        <Home className="mr-2 h-4 w-4" />
        Home
      </Button>
      <AuthenticatedTemplate>
        
        {/* Accordion */}
        <Accordion type="single" defaultValue="quickstart" collapsible>
          <AccordionItem value="quickstart">
            <AccordionTrigger className="flex items-center space-x-2">
            <Avatar
                  // name={account?.name}
                  image={imageSrc}
              />
            </AccordionTrigger>
            <AccordionContent>
              {/* Example of a child link in the panel */}
              <Button
                variant="ghost"
                className={cn(
                  "justify-start w-full",
                  pathname === "/profile" && activeClasses
                )}
                onClick={() => router.push("/profile")}
              >
                {/* If you want a vertical divider icon or something similar
                    to replicate DividerTallFilled, place it conditionally: */}
                {pathname === "/profile" && (
                  <SeparatorVertical className="mr-2 h-4 w-4" />
                )}
                My profile
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </AuthenticatedTemplate>
    </div>
  );
}