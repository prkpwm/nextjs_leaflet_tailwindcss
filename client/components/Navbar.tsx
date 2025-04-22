// components/Navbar.tsx
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  language: string;
  onLanguageToggle: () => void;
  onPageChange: (page: string) => void;
};

export const Navbar = ({ language, onLanguageToggle, onPageChange }: Props) => {
  const [nav, setNav] = useState(false);

  const message = {
    collectible: { TH: 'ของสะสม', EN: 'Collectible' },
    aboutUs: { TH: 'เกี่ยวกับเรา', EN: 'About us' },
    contactUs: { TH: 'ติดต่อเรา', EN: 'Contact Us' },
    signIn: { TH: 'เข้าสู่ระบบ', EN: 'Sign In' },
  };

  return (
    <div className={` w-full flex flex-wrap items-center justify-between lg:justify-start py-10 px-10 lg:pl-[10%] transition-all overflow-hidden ${nav ? 'h-[400px]' : 'h-[90px]'} `}>
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
          <a href="#tours">{message.collectible[language]}</a>
        </li>
        <li
          className='mx-4 my-3 lg:my-0  py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('about')}
        >
          <a href="#footer"></a> {message.aboutUs[language]}
        </li>
        <li
          className='mx-4 my-3 lg:my-0  py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('contact')}
        >
          <a href="#form">{message.contactUs[language]}</a>
        </li>

        <ul className='flex flex-wrap w-full font-medium bg-white rounded-b-2xl shadow-md lg:shadow-none items-center flex-col my-2 lg:flex-row lg:w-auto lg:my-0 lg:bg-transparent  lg:ml-auto'>
     
        <li
          className='mx-4 my-3 lg:my-0  py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('signin')}
        >
          <a href="#footer"></a>{message.signIn[language]}
        </li>
        <span className='flex flex-wrap w-full font-medium bg-white rounded-b-2xl shadow-md lg:shadow-none items-center flex-col my-2 lg:flex-row lg:w-auto lg:my-0 lg:bg-transparent lg:ml-auto'>
          <button
            className={`font-medium bg-white rounded-full shadow-md lg:shadow-none my-2 lg:my-0 lg:ml-auto flex items-center justify-center px-4 py-2 transition-colors duration-300 ${language === 'TH' ? 'bg-secondary text-red' : 'hover:bg-secondary hover:text-white'
              }`}
            onClick={onLanguageToggle}
          >
            {language === 'TH' ? 'TH' : 'EN'}
          </button>
        </span>
      </ul>
      </ul>
   
    </div>
  );
};

export default Navbar;