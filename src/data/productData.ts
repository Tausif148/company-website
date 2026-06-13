// productData.ts — shared source of truth

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  features: { icon: string; title: string; body: string }[];
  specs: ProductSpec[];
  industries: string[];
  screenshots: string[];
}

const FACE_REC_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAX9p0wUXdhWcRRIm5zzZxW9oaHhegQLFczS2SGUJv8S7TXaTIknSOI7ZeMlz69WwlUlSjJeUuR_Ol_XGLK27t4DTi5P5OMZe9OxXkh1ZONtIjJ4lqqnCQkszEYiUNM09rHa6mqaro_tcKn_lVTx4pWmlhXcTC7mo-SzBPBZqmwnHjO1xJuK2rlWvfyKA4rMohjjnbgyzPz3gV6s0nVs6DMWyRC_AUE9Vsxu2KmzCiai2vl4_92eTLl-iuPHDpeK2NZgJNO18yKaZw";

const BIOSCAN_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBlnCVKfCElfzSkK3nmjvRbi9F8aOSJCZBf1zxlu9fOeWu4_6QNjLOF1uonF5aE7pTao4XpVxAqDUyl8dKs9WlorWAkLCYfDHGoW4AqGeVk72u8kUrL2KOJFiyGQEgSGhvBxaJ_RWX5oJ0GrJTL1oG4AHAdzG3qp4_YD04jUV6IwR0_DWjL09d-xrK1spQS1yBhe8Zo1cCUimCGK6DgH2rHtu8SUakAW9XTQNYsL3jm8678BbBjXrjISX1spQRnU2-FmZFJPlYTkJA";

const VIGILANT_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDmbjg4bL-_nim7J61QJWSCKLa3cAGBtX6KJvofXt07p5s7706uoGJbAPo40cB1uWefbeGyUKErS6TEYoS2JSHKNc_y9fq8oiSULso2K2hM5ckK-3WSHOcTNWQ9uXnmIhYOWpH_-EUDqdvaHq02oy815bzQHMtrBTf8_SLu1tcwUqCaLpsRWMOpK-fPlphq8scPrY1SYjX-zgr2aBCZA5McVAROKfYpAn0ii9uKK06vBtaQjQCnRLlDDULHsI1nkOFAn8_Ry6hv67c";

export const products: Product[] = [
  {
    id: "1",
    slug: "face-rec-3",
    title: "Face Rec 3.0",
    subtitle: "0.02s Recognition Speed",
    tagline: "Sub-20ms biometric identification at the edge.",
    description:
      "Face Rec 3.0 is a next-generation facial recognition unit built for enterprise-grade security environments. Powered by an on-device neural accelerator, it delivers sub-20ms identification with 99.97% accuracy — entirely offline, so sensitive biometric data never leaves the premises.",
    image: FACE_REC_IMG,
    gallery: [FACE_REC_IMG, BIOSCAN_IMG, VIGILANT_IMG],
    features: [
      {
        icon: "⚡",
        title: "0.02s Recognition",
        body: "On-device NPU processes up to 50 faces per frame with no cloud round-trip required.",
      },
      {
        icon: "🔒",
        title: "Air-Gapped Mode",
        body: "Operates fully offline. Biometric templates are encrypted at rest with AES-256.",
      },
      {
        icon: "🌐",
        title: "Edge-Native SDK",
        body: "REST + gRPC APIs ship out-of-the-box for seamless integration with existing access-control stacks.",
      },
      {
        icon: "🎯",
        title: "Anti-Spoofing",
        body: "Liveness detection blocks photos, video replays, and 3D-printed masks.",
      },
    ],
    specs: [
      { label: "Recognition Speed", value: "0.02 s" },
      { label: "Accuracy", value: "99.97%" },
      { label: "Operating Temp", value: "-20 °C to 60 °C" },
      { label: "Connectivity", value: "Ethernet, Wi-Fi 6, PoE+" },
      { label: "Storage", value: "64 GB onboard (expandable)" },
      { label: "Power Draw", value: "12 W typical" },
      { label: "Ingress Protection", value: "IP67" },
      { label: "Certifications", value: "CE, FCC, ISO 30137" },
    ],
    industries: [
      "Banking & Finance",
      "Critical Infrastructure",
      "Healthcare",
      "Smart Buildings",
      "Government & Defence",
    ],
    screenshots: [FACE_REC_IMG, BIOSCAN_IMG],
  },
  {
    id: "2",
    slug: "bioscan-nexus",
    title: "BioScan Nexus",
    subtitle: "Encrypted Cloud Sync",
    tagline: "Multimodal biometrics, unified in one device.",
    description:
      "BioScan Nexus combines fingerprint, iris, and vein-pattern scanning into a single compact terminal. Its end-to-end encrypted cloud sync engine keeps multi-site deployments in perfect consistency while maintaining a full local audit trail.",
    image: BIOSCAN_IMG,
    gallery: [BIOSCAN_IMG, FACE_REC_IMG, VIGILANT_IMG],
    features: [
      {
        icon: "👁️",
        title: "Triple Modality",
        body: "Fingerprint, iris, and vein recognition operate simultaneously for 1-in-10M false-accept rates.",
      },
      {
        icon: "☁️",
        title: "Zero-Knowledge Sync",
        body: "Homomorphic encryption ensures templates are never decryptable in transit or at rest on cloud nodes.",
      },
      {
        icon: "📋",
        title: "Tamper-Evident Log",
        body: "Blockchain-anchored audit trail captures every event with cryptographic proof of integrity.",
      },
      {
        icon: "🔄",
        title: "Instant Failover",
        body: "Mesh-network topology among devices provides sub-second failover with no single point of failure.",
      },
    ],
    specs: [
      { label: "Modalities", value: "Fingerprint + Iris + Vein" },
      { label: "FAR", value: "< 0.0001%" },
      { label: "Sync Latency", value: "< 200 ms" },
      { label: "Capacity", value: "500,000 templates" },
      { label: "Display", value: '5" IPS touchscreen' },
      { label: "Connectivity", value: "LTE Cat-12, Wi-Fi 6E, BLE 5.2" },
      { label: "Ingress Protection", value: "IP65" },
      { label: "Certifications", value: "FIDO2, PIV, CE, FCC" },
    ],
    industries: [
      "Border Control",
      "Airports & Transport",
      "Pharmaceuticals",
      "Financial Services",
      "Law Enforcement",
    ],
    screenshots: [BIOSCAN_IMG, VIGILANT_IMG],
  },
  {
    id: "3",
    slug: "vigilant-ai-cam",
    title: "Vigilant-AI Cam",
    subtitle: "Thermal Threat Detection",
    tagline: "See threats before they become incidents.",
    description:
      "Vigilant-AI Cam fuses a 4K optical sensor with an uncooled LWIR thermal array, running a custom anomaly-detection model entirely on device. It identifies elevated body temperature, abandoned objects, and perimeter intrusions in real time — even in total darkness.",
    image: VIGILANT_IMG,
    gallery: [VIGILANT_IMG, FACE_REC_IMG, BIOSCAN_IMG],
    features: [
      {
        icon: "🌡️",
        title: "Thermal Fusion",
        body: "LWIR + optical fusion detects elevated skin temperature within ±0.3 °C accuracy at 3 m range.",
      },
      {
        icon: "🚨",
        title: "Anomaly Detection",
        body: "On-device AI flags abandoned objects, loitering, and crowd-density anomalies in < 300 ms.",
      },
      {
        icon: "🌑",
        title: "Total-Darkness Mode",
        body: "Thermal channel operates at full sensitivity with zero illumination required.",
      },
      {
        icon: "📡",
        title: "ONVIF & RTSP Native",
        body: "Drops into any VMS with no additional middleware. Supports ONVIF Profile S/T/G.",
      },
    ],
    specs: [
      { label: "Optical Resolution", value: "4K @ 30 fps" },
      { label: "Thermal Resolution", value: "320 × 240 LWIR" },
      { label: "Temp Accuracy", value: "±0.3 °C" },
      { label: "Night Vision", value: "Full thermal, 0 lux" },
      { label: "Detection Range", value: "Up to 50 m" },
      { label: "Connectivity", value: "Ethernet, Wi-Fi 6, PoE++" },
      { label: "Ingress Protection", value: "IP68, IK10" },
      { label: "Certifications", value: "CE, FCC, NDAA compliant" },
    ],
    industries: [
      "Airports & Seaports",
      "Prisons & Detention",
      "Energy & Utilities",
      "Smart Cities",
      "Event Security",
    ],
    screenshots: [VIGILANT_IMG, FACE_REC_IMG],
  },


    {
    id: "4",
    slug: "face-rec-3",
    title: "Face Rec 3.0",
    subtitle: "0.02s Recognition Speed",
    tagline: "Sub-20ms biometric identification at the edge.",
    description:
      "Face Rec 3.0 is a next-generation facial recognition unit built for enterprise-grade security environments. Powered by an on-device neural accelerator, it delivers sub-20ms identification with 99.97% accuracy — entirely offline, so sensitive biometric data never leaves the premises.",
    image: FACE_REC_IMG,
    gallery: [FACE_REC_IMG, BIOSCAN_IMG, VIGILANT_IMG],
    features: [
      {
        icon: "⚡",
        title: "0.02s Recognition",
        body: "On-device NPU processes up to 50 faces per frame with no cloud round-trip required.",
      },
      {
        icon: "🔒",
        title: "Air-Gapped Mode",
        body: "Operates fully offline. Biometric templates are encrypted at rest with AES-256.",
      },
      {
        icon: "🌐",
        title: "Edge-Native SDK",
        body: "REST + gRPC APIs ship out-of-the-box for seamless integration with existing access-control stacks.",
      },
      {
        icon: "🎯",
        title: "Anti-Spoofing",
        body: "Liveness detection blocks photos, video replays, and 3D-printed masks.",
      },
    ],
    specs: [
      { label: "Recognition Speed", value: "0.02 s" },
      { label: "Accuracy", value: "99.97%" },
      { label: "Operating Temp", value: "-20 °C to 60 °C" },
      { label: "Connectivity", value: "Ethernet, Wi-Fi 6, PoE+" },
      { label: "Storage", value: "64 GB onboard (expandable)" },
      { label: "Power Draw", value: "12 W typical" },
      { label: "Ingress Protection", value: "IP67" },
      { label: "Certifications", value: "CE, FCC, ISO 30137" },
    ],
    industries: [
      "Banking & Finance",
      "Critical Infrastructure",
      "Healthcare",
      "Smart Buildings",
      "Government & Defence",
    ],
    screenshots: [FACE_REC_IMG, BIOSCAN_IMG],
  },
  {
    id: "5",
    slug: "bioscan-nexus",
    title: "BioScan Nexus",
    subtitle: "Encrypted Cloud Sync",
    tagline: "Multimodal biometrics, unified in one device.",
    description:
      "BioScan Nexus combines fingerprint, iris, and vein-pattern scanning into a single compact terminal. Its end-to-end encrypted cloud sync engine keeps multi-site deployments in perfect consistency while maintaining a full local audit trail.",
    image: BIOSCAN_IMG,
    gallery: [BIOSCAN_IMG, FACE_REC_IMG, VIGILANT_IMG],
    features: [
      {
        icon: "👁️",
        title: "Triple Modality",
        body: "Fingerprint, iris, and vein recognition operate simultaneously for 1-in-10M false-accept rates.",
      },
      {
        icon: "☁️",
        title: "Zero-Knowledge Sync",
        body: "Homomorphic encryption ensures templates are never decryptable in transit or at rest on cloud nodes.",
      },
      {
        icon: "📋",
        title: "Tamper-Evident Log",
        body: "Blockchain-anchored audit trail captures every event with cryptographic proof of integrity.",
      },
      {
        icon: "🔄",
        title: "Instant Failover",
        body: "Mesh-network topology among devices provides sub-second failover with no single point of failure.",
      },
    ],
    specs: [
      { label: "Modalities", value: "Fingerprint + Iris + Vein" },
      { label: "FAR", value: "< 0.0001%" },
      { label: "Sync Latency", value: "< 200 ms" },
      { label: "Capacity", value: "500,000 templates" },
      { label: "Display", value: '5" IPS touchscreen' },
      { label: "Connectivity", value: "LTE Cat-12, Wi-Fi 6E, BLE 5.2" },
      { label: "Ingress Protection", value: "IP65" },
      { label: "Certifications", value: "FIDO2, PIV, CE, FCC" },
    ],
    industries: [
      "Border Control",
      "Airports & Transport",
      "Pharmaceuticals",
      "Financial Services",
      "Law Enforcement",
    ],
    screenshots: [BIOSCAN_IMG, VIGILANT_IMG],
  },
  {
    id: "6",
    slug: "vigilant-ai-cam",
    title: "Vigilant-AI Cam",
    subtitle: "Thermal Threat Detection",
    tagline: "See threats before they become incidents.",
    description:
      "Vigilant-AI Cam fuses a 4K optical sensor with an uncooled LWIR thermal array, running a custom anomaly-detection model entirely on device. It identifies elevated body temperature, abandoned objects, and perimeter intrusions in real time — even in total darkness.",
    image: VIGILANT_IMG,
    gallery: [VIGILANT_IMG, FACE_REC_IMG, BIOSCAN_IMG],
    features: [
      {
        icon: "🌡️",
        title: "Thermal Fusion",
        body: "LWIR + optical fusion detects elevated skin temperature within ±0.3 °C accuracy at 3 m range.",
      },
      {
        icon: "🚨",
        title: "Anomaly Detection",
        body: "On-device AI flags abandoned objects, loitering, and crowd-density anomalies in < 300 ms.",
      },
      {
        icon: "🌑",
        title: "Total-Darkness Mode",
        body: "Thermal channel operates at full sensitivity with zero illumination required.",
      },
      {
        icon: "📡",
        title: "ONVIF & RTSP Native",
        body: "Drops into any VMS with no additional middleware. Supports ONVIF Profile S/T/G.",
      },
    ],
    specs: [
      { label: "Optical Resolution", value: "4K @ 30 fps" },
      { label: "Thermal Resolution", value: "320 × 240 LWIR" },
      { label: "Temp Accuracy", value: "±0.3 °C" },
      { label: "Night Vision", value: "Full thermal, 0 lux" },
      { label: "Detection Range", value: "Up to 50 m" },
      { label: "Connectivity", value: "Ethernet, Wi-Fi 6, PoE++" },
      { label: "Ingress Protection", value: "IP68, IK10" },
      { label: "Certifications", value: "CE, FCC, NDAA compliant" },
    ],
    industries: [
      "Airports & Seaports",
      "Prisons & Detention",
      "Energy & Utilities",
      "Smart Cities",
      "Event Security",
    ],
    screenshots: [VIGILANT_IMG, FACE_REC_IMG],
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug: string): Product[] =>
  products.filter((p) => p.slug !== slug).slice(0, 2);