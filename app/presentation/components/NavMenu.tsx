"use client";

import { useRouter } from "next/navigation";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function NavMenu() {
    const router = useRouter();

    const navigateToAuth = () => {
        router.push("/auth");
    };

    const navigateToTodo = () => {
        router.push("/presentation/pages/todo");
    };

    return (
        <NavigationMenu className="bg-gray-100 shadow-md">
            <NavigationMenuList className="flex space-x-4 p-4">
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className="cursor-pointer text-sm font-medium"
                        onClick={navigateToAuth}
                    >
                        Auth
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className="cursor-pointer text-sm font-medium"
                        onClick={navigateToTodo}
                    >
                        Todo
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}