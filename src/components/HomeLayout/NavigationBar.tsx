import { NavLink } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLightbulb, FaListAlt } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdSell, MdOutlineHandshake } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import Chat from "../../pages/chat";

function NavigationBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <nav data-cy='nav-bar' className='flex flex-col p-4 gap-4 items-center'>
        <CustomNavLink
          data-cy='recommend-nav'
          route='/recommendations/1'
          title='Recommendations'
        >
          <FaLightbulb></FaLightbulb>
        </CustomNavLink>
        <CustomNavLink data-cy='browse-nav' route='/browse/1' title='Browse'>
          <FaShop></FaShop>
        </CustomNavLink>

        <CustomNavLink route='/charity' title='Charities'>
          <MdOutlineHandshake></MdOutlineHandshake>
        </CustomNavLink>
        <CustomNavLink route='/create' title='Create Listing'>
          <MdSell></MdSell>
        </CustomNavLink>
        <CustomNavLink route='/mylistings/1' title='My Listings'>
          <FaListAlt></FaListAlt>
        </CustomNavLink>
        <CustomNavLink
          data-cy='my-profile-nav'
          route='/myprofile'
          title='My Profile'
        >
          <CgProfile></CgProfile>
        </CustomNavLink>
        <div className='flex gap-3 items-center'>
          <TbMessageCircle2Filled color='white'></TbMessageCircle2Filled>
          <button
            data-cy='my-messages-nav'
            onClick={onOpen}
            className='text-white font-semibold'
            title='My Messages'
          >
            My Messages
          </button>
        </div>

        <CustomNavLink route='/settings' title='Settings'>
          <IoSettingsSharp></IoSettingsSharp>
        </CustomNavLink>
      </nav>

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='full'
      >
        <ModalOverlay />
        <ModalContent m={10}>
          <ModalCloseButton ml={5} />
          <ModalBody my={3} mr={4}>
            <Chat></Chat>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

interface CustomNavLinkProps {
  route: string;
  title: string;
  children?: React.ReactNode;
  clickHandle?: () => void;
}

function CustomNavLink({
  route,
  title,
  children,
  clickHandle,
}: CustomNavLinkProps) {
  return (
    <NavLink
      to={route}
      className='text-white py-2 flex items-center gap-3 justify-center font-semibold'
      onClick={clickHandle}
    >
      {children} {title}
    </NavLink>
  );
}

export { NavigationBar };
