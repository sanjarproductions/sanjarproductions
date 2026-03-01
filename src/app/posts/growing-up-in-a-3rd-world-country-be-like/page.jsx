import Link from "next/link";
import GrowingUpina3rdWorldCountrybelike from "../GrowingUpina3rdWorldCountrybelike";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sanjarproductions.com";
const POST_PATH = "/posts/growing-up-in-a-3rd-world-country-be-like";
const canonical = `${SITE_URL}${POST_PATH}`;

const title = "Growing Up in a 3rd World Country be like";
const description =
  "Personal reflections on growing up in a developing country—Central Asia, Uzbekistan, and asking why the world sees some places as corridors instead of destinations. For anyone who's ever felt invisible on the global map.";

export const metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "article",
    publishedTime: "2026-02-28",
    modifiedTime: "2026-02-28",
    authors: ["Sanjar Productions"],
    images: [
      {
        url: "/img/brazil.jpg",
        width: 1200,
        height: 800,
        alt: "Aerial view of a city in a developing country—contrast between neighborhoods and growth.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: `${SITE_URL}/img/brazil.jpg`,
  url: canonical,
  datePublished: "2026-02-28",
  dateModified: "2026-02-28",
  author: {
    "@type": "Person",
    name: "Sanjar",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Sanjar Productions",
    url: SITE_URL,
  },
};

export default function GrowingUpPostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="page">
        <div className="container">
          <div className="flex post-header">
            <h1 className="post-title">{title}</h1>
            <Link className="back-link" href="/posts">
              Back
            </Link>
          </div>

          <div className="post-content">
            <GrowingUpina3rdWorldCountrybelike />
          </div>
        </div>
      </div>
    </>
  );
}
