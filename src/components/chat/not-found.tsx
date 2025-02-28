'use client';

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="max-w-md text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter">Organization Not Found</h1>
                    <p className="text-muted-foreground">
                        We couldn't find the organization associated with this subdomain. This could be because:
                    </p>
                </div>
                <ul className="text-sm text-muted-foreground list-disc text-left pl-4 space-y-2">
                    <li>The organization hasn't been registered yet</li>
                    <li>The subdomain might be incorrect</li>
                    <li>The organization's access might have expired</li>
                </ul>
                <div className="space-y-4 pt-4">
                    <Link 
                        href={`https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`} 
                        target="_blank"
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'w-full'
                        )}
                    >
                        Visit Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
} 