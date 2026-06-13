import { Layers3, Cpu, MemoryStick, Code2, Smartphone, Cloud, Factory, ArrowRight } from "lucide-react";

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon: React.ElementType;
}

export const services: Service[] = [
  {
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "Cutting‑edge AI solutions that transform data into actionable insights and enable intelligent automation.",
    icon: Layers3,
  },
  {
    title: "Software Development",
    slug: "software-development",
    description: "Custom enterprise software built with modern architectures, ensuring scalability and performance.",
    icon: Code2,
  },
  {
    title: "Blockchain",
    slug: "blockchain",
    description: "Secure, decentralized ledger technologies for transparent transactions and smart contracts.",
    icon: Cpu, // using Cpu as placeholder
  },
  {
    title: "Energy Management",
    slug: "energy-management",
    description: "Intelligent monitoring and optimization of energy consumption for sustainable operations.",
    icon: MemoryStick, // placeholder
  },
  {
    title: "Embedded Systems",
    slug: "embedded-systems",
    description: "Hardware design and low‑level firmware for mission‑critical enterprise devices.",
    icon: MemoryStick,
  },
  {
    title: "Agriculture",
    slug: "agriculture",
    description: "IoT‑enabled precision farming solutions to boost yield and reduce resource waste.",
    icon: Cpu, // placeholder
  },
  {
    title: "Website Design and Development",
    slug: "website-design-and-development",
    description: "Responsive, SEO‑optimized web experiences that drive conversions and brand impact.",
    icon: Layers3,
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "High‑performance iOS and Android apps delivering seamless user experiences.",
    icon: Smartphone,
  },
  {
    title: "Internet of Things (IoT)",
    slug: "internet-of-things",
    description: "Real‑time sensor networks and analytics for smart industrial monitoring.",
    icon: Cloud,
  },
  {
    title: "Robotics",
    slug: "robotics",
    description: "Advanced robotic automation integrating AI and real‑time control for production lines.",
    icon: Factory,
  },
  {
    title: "Industrial Automation",
    slug: "industrial-automation",
    description: "Smart PLC logic, SCADA integration, and process synchronization for Industry 4.0.",
    icon: Factory,
  },
  {
    title: "Wireless Systems",
    slug: "wireless-systems",
    description: "Robust, high‑throughput wireless communication solutions for enterprise connectivity.",
    icon: ArrowRight, // placeholder arrow icon
  },
];

// Helper to retrieve a service by slug
export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);

// Placeholder for related services – returns other services (excluding the current one)
export const getRelatedServices = (slug: string) =>
  services.filter((s) => s.slug !== slug).slice(0, 4);
