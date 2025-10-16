"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react"; // Import signOut from next-auth
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear session storage (if you store tokens there)
      localStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_token");

      // Sign out from NextAuth
      await signOut({ redirect: false });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white py-4 px-6 md:px-10 shadow-md">
      {/* Main Nav Container */}
      <div className="flex justify-between items-center">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <p className="text-lg font-semibold">Black & White</p>
        </div>

        {/* Center Section - Navigation Items (Hidden on Mobile) */}
        <div className="hidden md:flex justify-between w-[430px]">
          {/* Adjusted width to fit items properly */}
          <Link href="/" className="hover:text-gray-300 hover:border-b-2">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-300 hover:border-b-2">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gray-300 hover:border-b-2">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300 hover:border-b-2"
          >
            Contact
          </Link>
        </div>

        {/* Right Section - Wishlist, Cart, Profile */}
        {session ? (
          <>
            <div className="flex items-center space-x-6">
              <button className="hover:text-gray-300">
                <Heart size={24} />
              </button>
              <button
                className="hover:text-gray-300"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart size={24} />
              </button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <User
                    size={24}
                    className="cursor-pointer hover:text-gray-300"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="z-50 min-w-[12rem] overflow-hidden rounded-lg border border-slate-200 border-t-black bg-black py-1 text-white shadow-lg"
                  align="end"
                  sideOffset={18}
                >
                  <DropdownMenuLabel className="px-4 py-2">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="px-4 py-2 hover:border-b  hover:cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2  hover:border-b hover:cursor-pointer">
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-4 py-2 hover:border-b cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 items-center bg-black p-4 rounded-lg">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-300">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
