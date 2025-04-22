// components/Footer.tsx
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';

type Props = {
  language: string;
  onLanguageToggle: () => void;
  onPageChange: (page: string) => void;
};

type FooterMessages = {
  collectibles: { TH: string; EN: string };
  about: { TH: string; EN: string };
  contact: { TH: string; EN: string };
  languageToggle: { TH: string; EN: string };
};

export const Footer = ({ language, onLanguageToggle, onPageChange }: Props) => {
  const footerMessages: FooterMessages = {
    collectibles: { TH: 'ของสะสม', EN: 'Collectibles' },
    about: { TH: 'เกี่ยวกับเรา', EN: 'About us' },
    contact: { TH: 'ติดต่อเรา', EN: 'Contact Us' },
    languageToggle: { TH: 'เปลี่ยนภาษา', EN: 'Change Language' }, // Added language toggle text
  };

  const socialMediaList = [
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      url: 'https://www.facebook.com/',
      image: '/imgs/facebook_logo.png',
      description: 'Visit our Facebook page',
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon />,
      url: 'https://twitter.com/',
      image: '/imgs/twitter_logo.png',
      description: 'Follow us on Twitter',
    },
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      url: 'https://web.whatsapp.com/',
      image: '/imgs/whatsapp_logo.png',
      description: 'Chat with us on WhatsApp',
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      url: 'https://www.instagram.com/',
      image: '/imgs/instagram_logo.png',
      description: 'See our photos on Instagram',
    },
  ];

  return (
    <footer id='footer' className='p-4 md:rounded-tl-full bg-slate-700 text-white flex items-center md:flex-row flex-col justify-between flex-wrap'>
      <h1 className='text-xl mx-6 font-bold flex flex-col mr-4 font-heading w-fit'>
        <span className='font-regular font-sans text-xs text-center'>Top</span>
        Pakpoom
      </h1>
      <ul className='flex flex-wrap w-full font-medium justify-center items-center my-2 md:my-0 md:w-auto'>
        <li
          className='mx-1 my-1 lg:my-0 py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('collectibles')}
        >
          {footerMessages.collectibles[language as keyof typeof footerMessages.collectibles]}
        </li>
        <li
          className='mx-1 my-1 lg:my-0 py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('about')}
        >
          {footerMessages.about[language as keyof typeof footerMessages.about]}
        </li>
        <li
          className='mx-1 my-1 lg:my-0 py-1 px-4 rounded-xl hover:bg-secondary hover:text-white cursor-pointer transition-all'
          onClick={() => onPageChange('contact')}
        >
          {footerMessages.contact[language as keyof typeof footerMessages.contact]}
        </li>
      </ul>
      <div className='flex items-center justify-end'>
        {/* Using Material UI Icons */}
        <a href={socialMediaList[0].url} target="_blank" rel="noopener noreferrer" className="mx-1">
          <FacebookIcon className='h-5 text-white p-1 cursor-pointer hover:bg-primary/80 bg-primary rounded-full' fontSize='small' />
        </a>
        <a href={socialMediaList[1].url} target="_blank" rel="noopener noreferrer" className="mx-1">
          <TwitterIcon className='h-5 text-white p-1 cursor-pointer hover:bg-primary/80 bg-primary rounded-full' fontSize='small' />
        </a>
        <a href={socialMediaList[2].url} target="_blank" rel="noopener noreferrer" className="mx-1">
          <WhatsAppIcon className='h-5 text-white p-1 cursor-pointer hover:bg-primary/80 bg-primary rounded-full' fontSize='small' />
        </a>
        <a href={socialMediaList[3].url} target="_blank" rel="noopener noreferrer" className="mx-1">
          <InstagramIcon className='h-5 text-white p-1 cursor-pointer hover:bg-primary/80 bg-primary rounded-full' fontSize='small' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;