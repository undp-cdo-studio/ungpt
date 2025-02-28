"use client";

import type * as React from "react";

import { Button } from "@/components/ui/button";
import { IconSidebar } from "@/components/ui/icons";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export interface SidebarProps {
	children?: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" className="-ml-2 p-0 hover:text-gray-600">
					<IconSidebar className="h-6 w-6 " />
					<span className="sr-only">Toggle Sidebar</span>
					<span className="ml-2 text-sm">Show Methodology</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
				<SheetHeader className="p-4">
					{/* <SheetTitle className="text-sm">Chat History</SheetTitle> */}
					<SheetTitle className="text-md font-bold">Methodology</SheetTitle>
				</SheetHeader>
				{children}
			</SheetContent>
		</Sheet>
	);
}
