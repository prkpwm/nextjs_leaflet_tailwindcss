import { NextPage } from "next";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

type Props = {
  language: string;
};

export const Contact: NextPage<Props> = ({ language }) => {
  const heading1 = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const contactForm = useInView({
    threshold: 0.3,
    triggerOnce: true,
    delay: 200,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<
    "success" | "error" | null
  >(null);

  const contactMessages = {
    title: {
      TH: 'ติดต่อเรา',
      EN: 'Contact Us',
    },
    intro: {
      TH: 'เรายินดีรับฟังความคิดเห็นจากคุณ! โปรดกรอกแบบฟอร์มด้านล่างเพื่อติดต่อทีมงานของเรา',
      EN: 'We\'d love to hear from you! Please fill out the form below to get in touch with our team.',
    },
    nameLabel: {
      TH: 'ชื่อ',
      EN: 'Name',
    },
    emailLabel: {
      TH: 'อีเมล',
      EN: 'Email',
    },
    messageLabel: {
      TH: 'ข้อความ',
      EN: 'Message',
    },
    sendButton: {
      TH: 'ส่งข้อความ',
      EN: 'Send Message',
    },
    sendingButton: {
      TH: 'กำลังส่ง...',
      EN: 'Sending...',
    },
    successMessage: {
      TH: 'ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับโดยเร็วที่สุด',
      EN: 'Thank you for your message! We\'ll get back to you soon.',
    },
    errorMessage: {
      TH: 'อ๊ะ! มีบางอย่างผิดพลาด โปรดลองอีกครั้งภายหลัง',
      EN: 'Oops! Something went wrong. Please try again later.',
    },
    locationTitle: {
      TH: 'ที่ตั้งของเรา',
      EN: 'Our Location',
    },
    headquarters: {
      TH: 'สำนักงานใหญ่ Top Pakpoom',
      EN: 'Top Pakpoom Headquarters',
    },
    address: {
      TH: '[ที่อยู่ของคุณที่นี่]',
      EN: '[Your Address Here]',
    },
    contactInfoTitle: {
      TH: 'ข้อมูลติดต่อ',
      EN: 'Contact Information',
    },
    emailInfo: {
      TH: 'อีเมล:',
      EN: 'Email:',
    },
    phoneInfo: {
      TH: 'โทรศัพท์:',
      EN: 'Phone:',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    // Simulate an API call (replace with your actual backend logic)
    try {
      console.log("Submitting form:", { name, email, message });
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // In a real application, you would send this data to your server
      // using an API endpoint.

      setName("");
      setEmail("");
      setMessage("");
      setSubmissionResult("success");
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionResult("error");
    } finally {
      setIsSubmitting(false);
    }
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
          {contactMessages.title[language]}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {contactMessages.intro[language]}
        </p>
      </section>

      <section
        ref={contactForm.ref}
        className={`transition-all duration-1000 delay-300 ${
          contactForm.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              {contactMessages.nameLabel[language]}
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              {contactMessages.emailLabel[language]}
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              {contactMessages.messageLabel[language]}
            </label>
            <textarea
              id="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-secondary hover:bg-secondaryLighter text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? contactMessages.sendingButton[language] : contactMessages.sendButton[language]}
            </button>
          </div>
          {submissionResult === "success" && (
            <p className="text-green-500 text-sm mt-4">
              {contactMessages.successMessage[language]}
            </p>
          )}
          {submissionResult === "error" && (
            <p className="text-red-500 text-sm mt-4">
              {contactMessages.errorMessage[language]}
            </p>
          )}
        </form>
      </section>

      {/* Optional: Add contact information like address, phone number, etc. */}
      <section className="mt-12">
        <h3 className="text-2xl font-bold tracking-tight mb-4">
          {contactMessages.locationTitle[language]}
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          {contactMessages.headquarters[language]}
          <br />
          {contactMessages.address[language]}
          <br />
          Rangsit, Pathum Thani, Thailand
        </p>
        <h3 className="text-2xl font-bold tracking-tight mt-6 mb-4">
          {contactMessages.contactInfoTitle[language]}
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          {contactMessages.emailInfo[language]} [Your Email Address]
          <br />
          {contactMessages.phoneInfo[language]} [Your Phone Number]
        </p>
      </section>
    </div>
  );
};

export default Contact;