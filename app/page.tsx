import type { Metadata } from 'next';
import Layout from '../src/components/Layout';
import { buildMetadata, DEFAULT_DESCRIPTION } from '../src/lib/seo';
import {
  JsonLd,
  profilePageSchema,
  itemListSchema,
  faqSchema,
} from '../src/lib/schema';

const HOME_TITLE = 'Pavan Sharma | AI Agent Developer & Full Stack Engineer';

export const metadata: Metadata = {
  ...buildMetadata({
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  }),
  title: { absolute: HOME_TITLE },
};

const FEATURED_PROJECTS = [
  {
    name: 'Sentinel AI: LLM Red Teaming Framework',
    description:
      'A human-centric AI safety system for evaluating Large Language Models through adversarial attacks, alignment checks, and safety mechanisms.',
    url: 'https://github.com/Pavan8104/llm-red-teaming-framework',
  },
  {
    name: 'Web Traffic Analyzer',
    description:
      'A data-driven application that analyzes user behavior and trends to generate insights using Python and Data Science.',
    url: 'https://github.com/Pavan8104/web-traffic-analyzer',
  },
  {
    name: 'HireOnix AI Platform',
    description:
      'An AI web platform showcasing intelligent automation, smart workflows, and AI-driven demos.',
    url: 'https://hireonixai.com/',
  },
  {
    name: 'CloudOps Platform',
    description:
      'A cloud management platform for deployment, monitoring, and DevOps workflows using Docker and React.',
    url: 'https://cloudops-frontend-production.up.railway.app/dashboard',
  },
  {
    name: 'Finance Analytics Backend',
    description:
      'A robust Python-based backend system for financial data analytics, forecasting, and processing.',
    url: 'https://github.com/Pavan8104/finance-analytics-backend',
  },
  {
    name: 'Laptop Price Prediction Model',
    description:
      'A machine learning model using regression techniques to predict laptop prices based on hardware specifications.',
    url: 'https://github.com/Pavan8104/laptop_Price_Predicition',
  },
];

const HOME_FAQS = [
  {
    question: 'Who is Pavan Sharma?',
    answer:
      'Pavan Sharma is an AI Agent Developer and Full Stack Engineer from India, currently pursuing a B.Tech in Computer Science at Chandigarh University. He specializes in AI agents, automation systems, Python, Machine Learning, LLM systems, RAG pipelines, and backend engineering. He has interned at micro1 as a Software Engineer developing AI agents, worked as a Coding Expert at Outlier, and served as a Solution Architect Intern at Hireonix AI. He builds AI products, automation systems, SaaS platforms, and modern web applications for clients worldwide.',
  },
  {
    question: 'What technologies does Pavan Sharma work with?',
    answer:
      'Pavan Sharma works primarily with Python, and has expertise in AI and Machine Learning (LangChain, LangGraph, Scikit-learn, PyTorch), Data Science (Pandas, NumPy, Matplotlib, Seaborn), Backend Development (FastAPI, PostgreSQL, MongoDB, Docker), Cloud (AWS EC2, S3, Lambda), and Full Stack Development (React.js, Next.js, Tailwind CSS). He also specializes in LLM Red Teaming, RAG pipelines, OpenAI API integrations, and Agentic AI workflows.',
  },
  {
    question: 'What services does Pavan Sharma offer?',
    answer:
      'Pavan Sharma offers AI agent development, AI automation, AI chatbot development, RAG development, LLM application development, full stack development, web development, SaaS development, and MVP development for startups and businesses in the USA, UK, Canada, Australia, Europe, UAE, and worldwide.',
  },
  {
    question: 'What projects has Pavan Sharma built?',
    answer:
      "Pavan Sharma's notable projects include: Sentinel AI (an LLM Red Teaming Framework for AI safety evaluation), a Web Traffic Analyzer built with Python and Streamlit, the HireOnix AI Platform (an AI automation platform), a CloudOps Platform for DevOps workflows, a Finance Analytics Backend in Python, and a Laptop Price Prediction ML model. He also has a GitHub repository of advanced DSA and competitive programming solutions.",
  },
  {
    question: 'How can I hire or contact Pavan Sharma?',
    answer:
      'You can contact Pavan Sharma via email at ps3297169@gmail.com, on LinkedIn at linkedin.com/in/pavan-sharma-1645ab276/, on GitHub at github.com/Pavan8104, or through the contact form at pavansharmaportfolio.in/contact. He is available for freelance projects and remote work with global clients.',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageSchema('2026-07-04')} />
      <JsonLd
        data={itemListSchema(
          'Pavan Sharma — Featured Software Projects',
          'A curated list of software engineering and AI projects by Pavan Sharma.',
          FEATURED_PROJECTS,
        )}
      />
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <Layout />
    </>
  );
}
