import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CardItem } from '../components/CardItem';
import { Landing } from '../components/Landing';
import { Navbar } from '../components/Navbar';
import { BigCard } from '../components/BigCard';
import img1 from '../public/imgs/cardImg1.svg';
import img2 from '../public/imgs/cardImg2.svg';
import img3 from '../public/imgs/cardImg3.svg';
import river from '../public/imgs/river.svg';
import mountains from '../public/imgs/mountains.svg';
import beach from '../public/imgs/beach.svg';
import booking from '../public/imgs/booking.svg';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import LandscapeIcon from '@mui/icons-material/Landscape';
import { AccordionCard } from '../components/AccordionCard';
import { Footer } from '../components/Footer';
import { ToTop } from '../components/ToTop';
import { useInView } from 'react-intersection-observer';
import { Alert, AlertTitle } from '@mui/material';
import { useState } from 'react';
import usePassportData from '../hooks/usePassportData';
import { Auth } from './auth';

type Props = {
  language: string;
};

type HomeMessages = {
  collectibleHeading: { TH: string; EN: string };
  findCollectibleHeading: { TH: string; EN: string };
  locationLat: { TH: 'ละติจูด', EN: 'Latitude' };
  locationLng: { TH: 'ลองจิจูด', EN: 'Longitude' };
};

export const Home = ({ language }: Props) => {
  const { passport, loading, error } = usePassportData();
  const eventsPassport: any[] = passport?.events || [];
  console.log(eventsPassport);

  const homeMessages: HomeMessages = {
    collectibleHeading: { TH: 'ของสะสม', EN: 'COLLECTIBLE' },
    findCollectibleHeading: { TH: 'ค้นหาสะสมใกล้คุณ', EN: 'Find collectible near you' },
    locationLat: { TH: 'ละติจูด', EN: 'Latitude' },
    locationLng: { TH: 'ลองจิจูด', EN: 'Longitude' },
  };

  const pakDesc = 'Natural beauty is un matched. Pakistan have world most beautiful places for visit, specially at its best in northern areas of Pakistan and Kashmir region. This part of the country is famous all around the world because of sky high mountains, lush green valleys, mighty rivers, beautiful lakes, and amazing wildlife.';
  const Map = dynamic(
    () => import('../components/Map.jsx') as any, { ssr: false }
  );
  const [showAlert, setShowAlert] = useState(false);

  const heading = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const cards = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const submitFunc = (e: any) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 10000);
  };

  const [authMode, setAuthMode] = useState('login'); // Default to login
  // ... other state variables

  const handleAuthSubmit = (e: any) => {
    e.preventDefault();
    // Implement your authentication logic here based on the 'authMode'
    console.log('Submitting in:', authMode, 'mode');
    // ... API calls, state updates, etc.
  };
  return (
    <div>
      <div className='my-20'>
        <div ref={heading.ref} className={`${heading.inView ? 'translate-y-[0vh] opacity-1' : 'translate-y-[10vh] opacity-0'} transition-all duration-1000 ease-out `}>
          <h4 className='text-xs lg:text-sm font-heading my-5 text-center w-full tracking-[10px] font-semibold'>{homeMessages.collectibleHeading[language as keyof typeof homeMessages.collectibleHeading]}</h4>
          <h3 className='text-3xl lg:text-4xl my-5 tracking-wide w-full text-center capitalize font-extrabold'>{homeMessages.findCollectibleHeading[language as keyof typeof homeMessages.findCollectibleHeading]}
          </h3>
        </div>
        <Map />
        <div id='tours' ref={cards.ref} className={`flex flex-wrap justify-center transition-all duration-[1500ms] ease-out ${cards.inView ? 'opacity-100' : 'opacity-0'} `}>
          {eventsPassport.map((event, index) => (
            <CardItem
              key={index}
              icon={<LandscapeIcon />}
              modalDesc={passport?.description}
              title={passport?.name}
              desc={`${homeMessages.locationLat[language as keyof typeof homeMessages.locationLat]}: ${event.location.lat} , ${homeMessages.locationLng[language as keyof typeof homeMessages.locationLng]}: ${event.location.lng}`}
              img={event.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;