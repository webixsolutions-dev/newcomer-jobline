// src/data/contactInfoCards.js
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";

export const CONTACT_INFO_CARDS = [
  {
    icon: HiOutlineEnvelope,
    title: "Email Support",
    desc: "We're here to answer your questions and provide the support you need.",
    detail: "info@newcomerjobline.ca",
    subDetail: "We aim to reply within 1 business day.",
    link: "mailto:info@newcomerjobline.ca",
  },
  {
    icon: HiOutlinePhone,
    title: "Call Us",
    desc: "Speak with our friendly team during business hours.",
    detail: "1-647-555-0198",
    subDetail: "Monday to Friday, 9:00 AM – 5:00 PM ET",
    link: "tel:16475550198",
  },
  {
    icon: HiOutlineMapPin,
    title: "Visit Our Office",
    desc: "Meet with us in person at our Toronto office.",
    detail: "250 Yonge Street, Suite 2201\nToronto, ON M5B 2L7, Canada",
    subDetail: "Near Dundas Station",
    link: null, // no direct link for address yet
  },
];
