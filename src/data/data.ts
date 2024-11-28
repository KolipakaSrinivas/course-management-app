import {
  CourseTypeScript,
  CourseTypesTypeScript,
  StudentTypeScript,
  CombinedCoursesTypeScript
} from "../TypeScript";

const courses: CourseTypeScript[] = [
  {
    id: 1,
    name: "Hindi",
    description:
      "Learn Hindi language, including grammar, vocabulary, and conversation skills. Immerse yourself in Indian culture through Hindi language and literature."
  },
  {
    id: 2,
    name: "Telugu",
    description:
      "Discover the beauty of Telugu language and culture. Learn reading, writing, and speaking Telugu, and explore the rich heritage of Telugu literature and film."
  },
  {
    id: 3,
    name: "English",
    description:
      "Enhance your English language skills for academic, professional, and personal purposes. Improve your grammar, vocabulary, pronunciation, and fluency through engaging exercises and real-world scenarios."
  },
  {
    id: 4,
    name: "French",
    description:
      "Learn French, the language of love and romance. Explore French culture, history, and cuisine. Improve your communication skills in French for travel, business, or personal interest."
  },
  {
    id: 5,
    name: "Spanish",
    description:
      "Discover the vibrant world of Spanish language and culture. Learn Spanish grammar, vocabulary, and pronunciation. Practice speaking Spanish with native speakers and immerse yourself in Spanish-speaking countries."
  },
  {
    id: 6,
    name: "German",
    description:
      "Learn German, a language of precision and engineering. Explore German culture, history, and philosophy. Improve your German language skills for academic, professional, or personal purposes."
  },
  {
    id: 7,
    name: "Mandarin Chinese",
    description:
      "Learn Mandarin Chinese, the most widely spoken language in the world. Discover Chinese culture, history, and philosophy. Improve your Chinese language skills for business, travel, or academic purposes."
  },
  {
    id: 8,
    name: "Japanese",
    description:
      "Learn Japanese, a language of tradition and technology. Explore Japanese culture, history, and art. Improve your Japanese language skills for business, travel, or academic purposes."
  },
  {
    id: 9,
    name: "Korean",
    description:
      "Learn Korean, a language of music and drama. Explore Korean culture, history, and cuisine. Improve your Korean language skills for business, travel, or personal interest."
  },
  {
    id: 10,
    name: "Arabic",
    description:
      "Learn Arabic, a language of the Middle East and North Africa. Explore Islamic culture, history, and literature. Improve your Arabic language skills for business, travel, or academic purposes."
  }
];

const courseTypes: CourseTypesTypeScript[] = [
  {
    id: 1,
    name: "Individual",
    description:
      "One-on-one personalized learning sessions tailored to individual needs."
  },
  {
    id: 2,
    name: "Group",
    description:
      "Learning in a group setting with peers to promote collaboration."
  },
  {
    id: 3,
    name: "Special",
    description:
      "Special courses designed for unique requirements or skillsets."
  },
  {
    id: 4,
    name: "Online",
    description:
      "Virtual classes accessible from anywhere, providing flexibility for learners."
  },
  {
    id: 5,
    name: "Workshop",
    description:
      "Short-term, intensive programs focused on specific topics or skills."
  },
  {
    id: 6,
    name: "Corporate Training",
    description:
      "Tailored training programs for organizations to upskill their workforce."
  },
  {
    id: 7,
    name: "Bootcamp",
    description:
      "Intensive training programs to learn a new skill or technology in a short time."
  },
  {
    id: 8,
    name: "Mentorship",
    description:
      "Guided learning under the supervision of an experienced mentor."
  },
  {
    id: 9,
    name: "Self-Paced",
    description:
      "Pre-recorded courses allowing learners to progress at their own speed."
  },
  {
    id: 10,
    name: "Hybrid",
    description:
      "Combines both online and in-person learning for a comprehensive experience."
  }
];

const combinedCourses: CombinedCoursesTypeScript[] = [
  { id: 1, type: "Individual", course: "Hindi" },
  { id: 2, type: "Individual", course: "Telugu" },
  { id: 3, type: "Individual", course: "English" },
  { id: 4, type: "Individual", course: "French" },
  { id: 5, type: "Individual", course: "Spanish" },
  { id: 6, type: "Group", course: "Hindi" },
  { id: 7, type: "Group", course: "Telugu" },
  { id: 8, type: "Group", course: "English" },
  { id: 9, type: "Group", course: "French" },
  { id: 10, type: "Group", course: "Spanish" },
  { id: 11, type: "Special", course: "Hindi" },
  { id: 12, type: "Special", course: "Telugu" },
  { id: 13, type: "Special", course: "English" }
];

const StudentRegistrationss: StudentTypeScript[] = [
  {
    id: 0,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    collage: "ABC University",
    feeAmount: "5000",
    paymentStatus: "Paid",
    email: "johndoe@example.com",
    selectedCourse: "Hindi Individual",
    notes: "No additional notes",
    createdAt: "2024-11-28T06:40:21.120Z"
  },
  {
    id: 1,
    firstName: "Jane",
    lastName: "Smith",
    phone: "987-654-3210",
    collage: "XYZ University",
    feeAmount: "4500",
    paymentStatus: "Pending",
    email: "janesmith@example.com",
    selectedCourse: "English Special",
    notes: "Needs fee clarification",
    createdAt: "2024-11-28T06:40:21.120Z"
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    phone: "555-123-4567",
    collage: "LMN College",
    feeAmount: "3000",
    paymentStatus: "Paid",
    email: "alicej@example.com",
    selectedCourse: "Special Group",
    notes: "Scholarship recipient",
    createdAt: "2024-11-28T06:40:21.120Z"
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    phone: "444-987-6543",
    collage: "PQR Institute",
    feeAmount: "6000",
    paymentStatus: "Pending",
    email: "bobbrown@example.com",
    selectedCourse: "Telugu Group",
    notes: "Awaiting confirmation",
    createdAt: "2024-11-28T06:40:21.120Z"
  },
  {
    id: 0,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    collage: "ABC University",
    feeAmount: "5000",
    paymentStatus: "Paid",
    email: "johndoe@example.com",
    selectedCourse: "Hindi Individual",
    notes: "No additional notes",
    createdAt: "2024-11-28T06:40:21.120Z"
  },
  {
    id: 1,
    firstName: "Jane",
    lastName: "Smith",
    phone: "987-654-3210",
    collage: "XYZ University",
    feeAmount: "4500",
    paymentStatus: "Pending",
    email: "janesmith@example.com",
    selectedCourse: "English Special",
    notes: "Needs fee clarification",
    createdAt: "2024-11-28T06:40:21.120Z"
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    phone: "555-123-4567",
    collage: "LMN College",
    feeAmount: "3000",
    paymentStatus: "Paid",
    email: "alicej@example.com",
    selectedCourse: "Special Group",
    notes: "Scholarship recipient",
    createdAt: "2024-11-28T06:40:21.120Z"
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    phone: "444-987-6543",
    collage: "PQR Institute",
    feeAmount: "6000",
    paymentStatus: "Pending",
    email: "bobbrown@example.com",
    selectedCourse: "Telugu Group",
    notes: "Awaiting confirmation",
    createdAt: "2024-11-28T06:40:21.120Z"
  }
];

export { courses, courseTypes, combinedCourses, StudentRegistrationss };
