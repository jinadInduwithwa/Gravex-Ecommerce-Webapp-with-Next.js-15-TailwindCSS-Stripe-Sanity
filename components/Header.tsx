import Container from "./Container";
import NavLogo from "./NavLogo";
import CartIcon from "./ui/CartIcon";
import HeaderMenu from "./ui/HeaderMenu";
import MobileMenu from "./ui/MobileMenu";
import SearchBar from "./ui/SearchBar";

const Header = () => {
  return (
    <header className=" border-b border-b-gray-400 py-5">
      <Container className="flex flex-row items-center justify-between gap-7 text-gray-700"> 

        {/* left bar */}
        <HeaderMenu/>

        
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
         {/* mobile menu */}
          <MobileMenu/>
          {/* logo */}
          <NavLogo>gravex co.</NavLogo>
        </div>

        {/* right bar */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar/>
          <CartIcon/>
          <div>
            <button className="text-sm font-semibold hover:text-black hoverEffect">Login</button>
          </div>
        </div>
      </Container>
        
    </header>
  );
};

export default Header;
