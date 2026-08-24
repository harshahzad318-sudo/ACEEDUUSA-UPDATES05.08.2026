import { notFound } from "next/navigation";
import { LEARNING_SUPPORT } from "@/lib/data";
import { getCourseDetails } from "@/lib/courseDetails";
import CoursePageTemplate from "@/components/CoursePageTemplate";
import type { Metadata } from "next";

export function generateStaticParams() {
  return LEARNING_SUPPORT.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = LEARNING_SUPPORT.find((l) => l.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} Tutoring & Coaching | ACE Education USA`,
    description: item.description,
  };
}

export default async function LearningSupportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = LEARNING_SUPPORT.find((l) => l.slug === slug);
  if (!item) notFound();

  // Retrieve customized academic learning support details
  const details = getCourseDetails(slug, item.name);

  return <CoursePageTemplate {...details} />;
}
