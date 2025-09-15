import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const dropdownData = [
  { title: 'Job Title', icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] },
  { title: 'Location', icon: IconMapPin, options: ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura', 'Matara', 'Trincomalee'] },
  { title: 'Experience', icon: IconBriefcase, options: ['Entry Level', 'Intermediate', 'Expert'] },
  { title: 'Job Type', icon: IconRecharging, options: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'] }
];

const jobList = [
  {
    jobTitle: "Product Designer",
    company: "Meta",
    applicants: 25,
    experience: "Entry Level",
    jobType: "Full-Time",
    location: "New York",
    package: "32000",
    postedDaysAgo: 12,
    description: "Meta is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment."
  },
  {
    jobTitle: "Backend Developer",
    company: "Google",
    applicants: 47,
    experience: "Mid Level",
    jobType: "Contract",
    location: "San Francisco",
    package: "45000",
    postedDaysAgo: 8,
    description: "We are looking for a skilled Backend Developer with experience in Golang and cloud-native architecture. You will contribute to the development of scalable APIs and work closely with DevOps teams."
  },
  {
    jobTitle: "DevOps Engineer",
    company: "Amazon",
    applicants: 33,
    experience: "Senior Level",
    jobType: "Full-Time",
    location: "Seattle",
    package: "60000",
    postedDaysAgo: 5,
    description: "Amazon is hiring a seasoned DevOps Engineer to automate infrastructure and streamline CI/CD pipelines. Expertise in AWS, Terraform, and Kubernetes is essential."
  },
  {
    jobTitle: "Data Analyst",
    company: "Spotify",
    applicants: 19,
    experience: "Entry Level",
    jobType: "Part-Time",
    location: "Remote",
    package: "18000",
    postedDaysAgo: 3,
    description: "Spotify is on the lookout for a Data Analyst who can turn raw data into actionable insights. Candidates should be proficient in SQL and data visualization tools like Tableau or Power BI."
  },
  {
    jobTitle: "Mobile App Developer",
    company: "Tesla",
    applicants: 40,
    experience: "Mid Level",
    jobType: "Full-Time",
    location: "Austin",
    package: "50000",
    postedDaysAgo: 15,
    description: "Join Tesla's mobile team to help build the next generation of Android and iOS apps. Strong knowledge of Flutter or React Native is required."
  },
];


export { dropdownData , jobList};