// components/Navbar.tsx
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image'; // Import the Image component for the flags

type Props = {
  language: string;
  onLanguageToggle: () => void;
  onPageChange: (page: string) => void;
};

type Message = {
  collectible: { TH: string; EN: string };
  aboutUs: { TH: string; EN: string };
  contactUs: { TH: string; EN: string };
  signIn: { TH: string; EN: string };
};

export const Navbar = ({ language, onLanguageToggle, onPageChange }: Props) => {
  const [nav, setNav] = useState(false);

  const message: Message = {
    collectible: { TH: 'ของสะสม', EN: 'Collectible' },
    aboutUs: { TH: 'เกี่ยวกับเรา', EN: 'About us' },
    contactUs: { TH: 'ติดต่อเรา', EN: 'Contact Us' },
    signIn: { TH: 'เข้าสู่ระบบ', EN: 'Sign In' },
  };

  const thFlag = '/imgs/thailand.svg'; // Path to Thai flag image
  const enFlag = '/imgs/eng.png'; // Path to UK flag image

  return (
    <div className={` w-full flex flex-wrap items-center justify-between lg:justify-start py-10 px-10 lg:pl-10 transition-all overflow-hidden ${nav ? 'h-[400px]' : 'h-[90px]'} `}>
      <h1 className='text-2xl font-bold flex flex-col mr-[40px] font-heading'>
        <span className='font-regular font-sans text-xs text-center'>Top</span>
        Pakpoom
      </h1>
      <button className='hover:bg-slate-100 p-2 rounded-[50%] lg:hidden ' onClick={() => setNav(e => !e)} ><MenuIcon /></button>
      <ul className='flex flex-wrap w-full font-medium bg-white rounded-b-2xl shadow-md lg:shadow-none items-center flex-col my-2 lg:flex-row lg:w-auto lg:my-0 lg:bg-transparent  lg:ml-auto'>
        <li
          className='mx-4 my-3 lg:my-0  py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('collectibles')}
        >
          <a href="#tours">{message.collectible[language as keyof typeof message.collectible]}</a>
        </li>
        <li
          className='mx-4 my-3 lg:my-0  py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('about')}
        >
          <a href="#footer">{message.aboutUs[language as keyof typeof message.aboutUs]}</a>
        </li>
        <li
          className='mx-4 my-3 lg:my-0  py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('contact')}
        >
          <a href="#form">{message.contactUs[language as keyof typeof message.contactUs]}</a>
        </li>
        <li
          className='mx-4 my-3 lg:my-0  py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('signin')}
        >
          <a href="#signin">{message.signIn[language as keyof typeof message.signIn]}</a>
        </li>
        <span className='flex flex-wrap w-full font-medium bg-white rounded-b-2xl shadow-md lg:shadow-none items-center flex-col my-2 lg:flex-row lg:w-auto lg:my-0 lg:bg-transparent lg:ml-auto'>
          <button
            className={`font-medium bg-white rounded-full shadow-md lg:shadow-none my-2 lg:my-0 lg:ml-auto flex items-center justify-center px-2 py-1 transition-colors duration-300`}
            onClick={onLanguageToggle}
          >
            {language === 'TH' ? (
              <Image src={thFlag} alt="Thai Flag" width={24} height={16} className="rounded-sm" />
            ) : (
              <Image src={enFlag} alt="UK Flag" width={24} height={16} className="rounded-sm" />
            )}
            <span className="ml-2">{language === 'TH' ? 'TH' : 'EN'}</span>
          </button>
        </span>
      </ul>
    </div>
  );
};

export default Navbar;