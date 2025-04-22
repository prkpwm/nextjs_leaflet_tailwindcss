import { NextPage } from "next";
import { useInView } from "react-intersection-observer";

type Props = {
  language: string;
};

export const AboutUs: NextPage<Props> = ({ language }) => {
  const heading1 = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const paragraph1 = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const paragraph2 = useInView({
    threshold: 0.5,
    triggerOnce: true,
    delay: 200,
  });

  const aboutUsMessages = {
    title: {
      TH: 'เกี่ยวกับ Top Pakpoom',
      EN: 'About Top Pakpoom',
    },
    intro1: {
      TH: 'ยินดีต้อนรับสู่ Top Pakpoom จุดหมายปลายทางชั้นนำของคุณสำหรับของสะสมที่ไม่เหมือนใครและมีคุณภาพสูง เรามีความหลงใหลในการคัดสรรสิ่งของหลากหลายที่ตอบสนองความต้องการของผู้ที่ชื่นชอบและนักสะสมทุกประเภท การเดินทางของเราเริ่มต้นด้วยความรักร่วมกันในความตื่นเต้นของการค้นพบและความสุขในการเป็นเจ้าของสิ่งพิเศษ',
      EN: 'Welcome to Top Pakpoom, your premier destination for unique and high-quality collectibles. We are passionate about curating a diverse selection of items that cater to enthusiasts and collectors of all kinds. Our journey began with a shared love for the thrill of discovery and the joy of owning something special.',
    },
    intro2: {
      TH: 'ที่ Top Pakpoom เราเชื่อว่าของสะสมทุกชิ้นมีเรื่องราว ไม่ว่าจะเป็นของเล่นวินเทจหายาก งานศิลปะรุ่นจำกัด หรือของที่ระลึกที่ไม่เหมือนใคร เรามุ่งมั่นที่จะนำเสนอชิ้นงานที่มีเอกลักษณ์และประวัติศาสตร์ ทีมงานของเราทุ่มเทในการจัดหาสิ่งของที่โดดเด่นและมอบประสบการณ์การช็อปปิ้งที่ราบรื่นและสนุกสนาน',
      EN: 'At Top Pakpoom, we believe that every collectible tells a story. Whether it\'s a rare vintage toy, a limited-edition art piece, or a unique memorabilia item, we strive to bring you pieces with character and history. Our team is dedicated to sourcing exceptional finds and providing a seamless and enjoyable shopping experience.',
    },
    missionTitle: {
      TH: 'พันธกิจของเรา',
      EN: 'Our Mission',
    },
    missionText: {
      TH: 'พันธกิจของเราคือการเชื่อมโยงนักสะสมเข้ากับสมบัติที่พวกเขาแสวงหา และส่งเสริมชุมชนที่สร้างขึ้นจากความชื่นชมในสิ่งของที่ไม่เหมือนใคร เรามุ่งมั่นในความถูกต้อง คุณภาพ และความพึงพอใจของลูกค้า',
      EN: 'Our mission is to connect collectors with the treasures they seek and to foster a community built on appreciation for unique items. We are committed to authenticity, quality, and customer satisfaction.',
    },
    valuesTitle: {
      TH: 'ค่านิยมของเรา',
      EN: 'Our Values',
    },
    value1: {
      TH: 'ความถูกต้อง: เรารับประกันความแท้จริงของของสะสมของเรา',
      EN: 'Authenticity: We guarantee the genuineness of our collectibles.',
    },
    value2: {
      TH: 'คุณภาพ: เราตรวจสอบและคัดเลือกสิ่งของอย่างพิถีพิถันในด้านสภาพและความหายาก',
      EN: 'Quality: We carefully inspect and select items for their condition and rarity.',
    },
    value3: {
      TH: 'ความหลงใหล: ความรักของเราที่มีต่อของสะสมขับเคลื่อนทุกสิ่งที่เราทำ',
      EN: 'Passion: Our love for collectibles drives everything we do.',
    },
    value4: {
      TH: 'ชุมชน: เรามุ่งมั่นที่จะสร้างพื้นที่ต้อนรับให้นักสะสมได้เชื่อมต่อกัน',
      EN: 'Community: We aim to create a welcoming space for collectors to connect.',
    },
  };

  return (
    <div className="py-16 px-6 md:px-12 lg:px-24">
      <section className="mb-12">
        <h2
          ref={heading1.ref}
          className={`text-3xl lg:text-4xl font-extrabold tracking-tight mb-6 transition-all duration-1000 ${
            heading1.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {aboutUsMessages.title[language]}
        </h2>
        <p
          ref={paragraph1.ref}
          className={`text-lg text-gray-700 leading-relaxed mb-6 transition-all duration-1000 delay-200 ${
            paragraph1.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {aboutUsMessages.intro1[language]}
        </p>
        <p
          ref={paragraph2.ref}
          className={`text-lg text-gray-700 leading-relaxed transition-all duration-1000 delay-400 ${
            paragraph2.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {aboutUsMessages.intro2[language]}
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold tracking-tight mb-4">
          {aboutUsMessages.missionTitle[language]}
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          {aboutUsMessages.missionText[language]}
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold tracking-tight mb-4">
          {aboutUsMessages.valuesTitle[language]}
        </h3>
        <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed">
          <li>{aboutUsMessages.value1[language]}</li>
          <li>{aboutUsMessages.value2[language]}</li>
          <li>{aboutUsMessages.value3[language]}</li>
          <li>{aboutUsMessages.value4[language]}</li>
        </ul>
      </section>

      {/* You can add more sections with translatable content */}
    </div>
  );
};

export default AboutUs;