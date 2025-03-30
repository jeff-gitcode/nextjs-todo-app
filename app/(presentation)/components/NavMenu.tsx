"use client";

import { useRouter } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function NavMenu() {
  const router = useRouter();
  const { user } = useUser();
  console.log(process.env.DATABASE_URL);

  return (
    <NavigationMenu className="bg-gray-100 shadow-md">
      <NavigationMenuList className="flex space-x-4 p-4">
        {!user ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="cursor-pointer text-sm font-medium"
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="cursor-pointer text-sm font-medium"
                onClick={() => router.push("/sign-up")}
              >
                Sign Up
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="cursor-pointer text-sm font-medium"
                onClick={() => router.push("/todo")}
              >
                Protected
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <SignOutButton>
                <NavigationMenuLink className="cursor-pointer text-sm font-medium">
                  Sign Out
                </NavigationMenuLink>
              </SignOutButton>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}