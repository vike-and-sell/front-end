import { NavLink } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { FaListAlt } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdSell } from "react-icons/md";

function NavigationBar() {
  return (
    <nav className='flex flex-col p-4 gap-4'>
      <CustomNavLink route='/browse' title='Browse'>
        <MdSell></MdSell>
      </CustomNavLink>
      <CustomNavLink route='/' title='Create Listing'>
        <MdSell></MdSell>
      </CustomNavLink>
      <CustomNavLink route='/' title='My Listings'>
        <FaListAlt></FaListAlt>
      </CustomNavLink>
      <CustomNavLink route='/' title='My Profile'>
        <CgProfile></CgProfile>
      </CustomNavLink>
      <CustomNavLink route='/' title='My Messages'>
        <TbMessageCircle2Filled></TbMessageCircle2Filled>
      </CustomNavLink>
      <CustomNavLink route='/' title='Settings'>
        <IoSettingsSharp></IoSettingsSharp>
      </CustomNavLink>
    </nav>
  );
}

interface CustomNavLinkProps {
  route: string;
  title: string;
  children?: React.ReactNode;
}

function CustomNavLink({ route, title, children }: CustomNavLinkProps) {
  return (
    <NavLink
      to={route}
      className='text-white py-2 flex items-center gap-3 justify-center font-semibold'
    >
      {children} {title}
    </NavLink>
  );
}

export { NavigationBar };
