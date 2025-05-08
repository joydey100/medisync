import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  chats_icon,
  profile_pic,
  contact_image,
  about_image,
  cross_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General Physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Richard James is dedicated to providing holistic care with a strong emphasis on preventive healthcare and patient education. He focuses on managing chronic illnesses and ensuring overall wellness.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday"],
      timeSlots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Emily Larson specializes in women's reproductive health, offering compassionate care in prenatal, postnatal, and gynecological health. She emphasizes patient comfort and education.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Saturday", "Sunday", "Thursday"],
      timeSlots: ["10:00 AM - 4:00 PM"],
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Sarah Patel is committed to diagnosing and treating various skin conditions. She has a special interest in acne treatment, cosmetic dermatology, and patient-centered skincare routines.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Monday", "Tuesday", "Wednesday"],
      timeSlots: ["4:00 PM - 6:00 PM"],
    },
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Christopher Lee is passionate about pediatric care, focusing on child development, preventive care, and early intervention. He aims to build trust with both children and parents.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Wednesday", "Thursday", "Friday"],
      timeSlots: ["9:00 AM - 12:00 PM"],
    },
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Jennifer Garcia is a neurologist with expertise in managing disorders of the nervous system. She focuses on conditions like migraines, epilepsy, and neurodegenerative diseases.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Tuesday", "Wednesday", "Monday"],
      timeSlots: ["4:00 PM - 8:00 PM"],
    },
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams specializes in neurological care, including stroke management, Parkinson's disease, and neuropathies. He integrates modern diagnostics with compassionate care.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      timeSlots: ["9:00 AM - 12:00 PM", "6:00 PM - 8:00 PM"],
    },
  },
  {
    _id: "doc7",
    name: "Christopher Davis",
    image: doc7,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Christopher Davis is a skilled general physician offering care for a range of acute and chronic illnesses. He emphasizes preventive medicine and long-term health maintenance.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Thursday"],
      timeSlots: ["5:00 PM - 8:00 PM"],
    },
  },
  {
    _id: "doc8",
    name: "Dr. Timothy White",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Timothy White is known for his patient-focused approach in women's health, offering services in hormonal care, pregnancy management, and minimally invasive procedures.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Thursday", "Saturday", "Monday"],
      timeSlots: ["12:00 PM - 2:00 PM", "4:00 PM - 8:00 PM"],
    },
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Ava Mitchell specializes in medical and aesthetic dermatology. Her interests include eczema, psoriasis, and cosmetic skin enhancements tailored to individual needs.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Saturday", "Monday"],
      timeSlots: ["2:00 PM - 8:00 PM"],
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Jeffrey King provides comprehensive pediatric care, emphasizing early development, vaccination, and preventive strategies for healthy childhood growth.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Tuesday", "Thursday"],
      timeSlots: ["10:00 AM - 4:00 PM"],
    },
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Zoe Kelly is a gastroenterologist focused on digestive system health, including liver diseases, IBS, and endoscopic procedures for diagnosis and treatment.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Thursday", "Saturday", "Monday"],
      timeSlots: ["12:00 PM - 2:00 PM", "4:00 PM - 8:00 PM"],
    },
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Patrick Harris is an experienced neurologist with a focus on cognitive disorders, epilepsy, and neurorehabilitation, delivering evidence-based care for optimal outcomes.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Wednesday", "Thursday", "Friday"],
      timeSlots: ["9:00 AM - 12:00 PM"],
    },
  },
  {
    _id: "doc13",
    name: "Dr. Chloe Evans",
    image: doc13,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans believes in building lasting relationships with patients through routine checkups, preventive care, and personalized treatment plans.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Wednesday", "Thursday", "Friday"],
      timeSlots: ["9:00 AM - 12:00 PM"],
    },
  },
  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Ryan Martinez has expertise in adolescent and adult gynecology, fertility treatment, and reproductive endocrinology. He ensures informed decision-making in women's health.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Wednesday", "Friday"],
      timeSlots: ["9:00 AM - 2:00 PM"],
    },
  },
  {
    _id: "doc15",
    name: "Dr. Amelia Hill",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Amelia Hill offers expertise in dermatological diagnostics and treatment, with interests in skin allergies, pigmentation issues, and non-invasive cosmetic procedures.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    availability: {
      days: ["Thursday", "Saturday", "Monday"],
      timeSlots: ["12:00 PM - 2:00 PM", "4:00 PM - 8:00 PM"],
    },
  },
];
