import { currentUser } from "@clerk/nextjs/server";
import Container from "./Container";
import NavLogo from "./NavLogo";
import CartIcon from "./ui/CartIcon";
import HeaderMenu from "./ui/HeaderMenu";
import MobileMenu from "./ui/MobileMenu";
import SearchBar from "./ui/SearchBar";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { ListOrdered } from "lucide-react";
import Link from 'next/link'

const Header = async() => {

  const user = await currentUser();
  console.log("user -", user);
  

  return (
    <header className=" border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
      <Container className="flex flex-row items-center justify-between gap-7 text-gray-700"> 

        {/* left bar */}
        <HeaderMenu/>

        
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
         {/* mobile menu */}
          <MobileMenu />
          {/* logo */}
          <NavLogo>gravex co.</NavLogo>
        </div>

        {/* right bar */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar/>
          <CartIcon/>
          <ClerkLoaded>
            <SignedIn>
               <Link href={"/orders"} className='group relative'>
                <ListOrdered className='w-5 h-5 group-hover:text-black hoverEffect'/>
                <span className='absolute -top-1 -right-1 bg-black text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center'>0</span>
              </Link>
              <UserButton/>
            </SignedIn>
            { !user && (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-black hoverEffect">Login</button>
              </SignInButton>
            ) 
            }
          </ClerkLoaded>
        </div>
      </Container>
        
    </header>
  );
};

export default Header;
