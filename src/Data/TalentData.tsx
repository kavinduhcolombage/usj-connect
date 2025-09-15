import { IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const searchFields = [
  { title: 'Job Title', icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] },
  { title: 'Location', icon: IconMapPin, options: ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura', 'Matara', 'Trincomalee'] },
  { title: 'Skills', icon: IconRecharging, options: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Node.js', 'Python', 'Java', 'Ruby', 'PHP', 'SQL', 'MongoDB', 'PostgreSQL', 'Git', 'API Development', 'Testing', 'Agile Methodologies', 'DevOps', 'AWS', 'Azure', 'Google Cloud'] },
]

const talents = [
  {
    name: "Nuwan Perera",
    role: "Software Engineer",
    company: "WSO2",
    topSkills: ["Angular", "Java", "PostgreSQL"],
    about: "As a Software Engineer at WSO2, I focus on developing robust and efficient enterprise solutions. I have hands-on experience in building full-stack applications using Angular for the front-end and Java for the backend. My database of choice is PostgreSQL due to its reliability and performance. I am committed to delivering clean code, scalable systems, and impactful solutions tailored to business needs in the Sri Lankan and global markets.",
    expectedCtc: "LKR 3.6M - 4.8M",
    location: "Colombo, Sri Lanka",
    image: "avatar"
  },
  {
    name: "Sachini Fernando",
    role: "Frontend Developer",
    company: "99x",
    topSkills: ["Vue.js", "Tailwind CSS", "TypeScript"],
    about: "I am a Frontend Developer at 99x with a passion for designing modern and responsive user interfaces. I specialize in building UI components with Vue.js and Tailwind CSS while maintaining accessibility and performance standards. I thrive in collaborative environments and enjoy transforming design concepts into interactive user experiences.",
    expectedCtc: "LKR 2.4M - 3.2M",
    location: "Negombo, Sri Lanka",
    image: "avatar"
  },
  {
    name: "Tharindu Jayasena",
    role: "DevOps Engineer",
    company: "Zone24x7",
    topSkills: ["Docker", "Kubernetes", "AWS"],
    about: "I am a DevOps Engineer currently working at Zone24x7, focusing on CI/CD pipelines, cloud infrastructure, and container orchestration. My expertise lies in automating workflows, optimizing deployment processes, and ensuring scalable infrastructure on AWS using tools like Docker and Kubernetes. I aim to bridge the gap between development and operations.",
    expectedCtc: "LKR 4.2M - 5.5M",
    location: "Kandy, Sri Lanka",
    image: "avatar"
  },
  {
    name: "Isuri Madushani",
    role: "Data Analyst",
    company: "ICTA Sri Lanka",
    topSkills: ["Python", "Power BI", "SQL"],
    about: "As a Data Analyst at ICTA Sri Lanka, I am passionate about turning data into actionable insights. I work with Python for data processing, SQL for data extraction, and Power BI for visual storytelling. My role supports strategic decision-making for digital transformation projects across Sri Lanka.",
    expectedCtc: "LKR 2.8M - 3.6M",
    location: "Galle, Sri Lanka",
    image: "avatar"
  }
];

const profile = {
  name: "Kavindu Hansana",
  role: "Full Stack Developer",
  company: "WSO2",
  location: "Colombo, Sri Lanka",
  about: "As a Full Stack Developer at WSO2, I specialize in building secure and scalable enterprise solutions. My focus is on integrating microservices with intuitive user interfaces, ensuring seamless functionality across platforms. With strong experience in Java, React, and cloud-native technologies, I am passionate about using modern tools to solve real-world business challenges. I strive to deliver high-quality software that drives innovation and meets organizational goals.",
  skills: [
    "Java", "Spring Boot", "React", "TypeScript", "Node.js", "PostgreSQL",
    "Docker", "Kubernetes", "Git", "AWS", "Azure", "Figma", "Jenkins", "MongoDB", "Agile"
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "WSO2",
      location: "Colombo, Sri Lanka",
      startDate: "Jan 2022",
      endDate: "Present",
      description: "Leading the development of microservice-based APIs and enterprise middleware for cloud deployments. I collaborate with cross-functional teams to build scalable applications, contribute to architectural decisions, and drive DevOps adoption through CI/CD pipelines."
    },
    {
      title: "Software Engineer",
      company: "99x",
      location: "Colombo, Sri Lanka",
      startDate: "Jul 2019",
      endDate: "Dec 2021",
      description: "Worked on full-stack web applications using React and .NET Core for international clients. Delivered features in Agile sprints, wrote unit and integration tests, and participated in regular code reviews to maintain high code quality."
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      issueDate: "Mar 2023",
      certificateId: "AWS-ASA-089201"
    },
    {
      name: "Microsoft Certified: Azure Developer Associate",
      issuer: "Microsoft",
      issueDate: "Nov 2022",
      certificateId: "AZ-204-202211"
    }
  ]
};



export { searchFields, talents, profile };