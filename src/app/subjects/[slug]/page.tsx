import { notFound } from "next/navigation";
import { SUBJECTS } from "@/lib/data";
import { getCourseDetails } from "@/lib/courseDetails";
import CoursePageTemplate from "@/components/CoursePageTemplate";
import type { Metadata } from "next";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const subject = SUBJECTS.find((s) => s.slug === slug);
  if (!subject) return {};
  return {
    title: `${subject.name} Tutoring | ACE Education USA`,
    description: subject.description,
  };
}

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = SUBJECTS.find((s) => s.slug === slug);
  if (!subject) notFound();

  // Retrieve rich, premium structured details for this subject
  const details = getCourseDetails(slug, subject.name);

  return <CoursePageTemplate {...details} />;
}
