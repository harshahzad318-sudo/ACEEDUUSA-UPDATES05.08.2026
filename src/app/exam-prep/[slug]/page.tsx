import { notFound } from "next/navigation";
import { EXAMS } from "@/lib/data";
import { getCourseDetails } from "@/lib/courseDetails";
import CoursePageTemplate from "@/components/CoursePageTemplate";
import type { Metadata } from "next";

export function generateStaticParams() {
  return EXAMS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exam = EXAMS.find((e) => e.slug === slug);
  if (!exam) return {};
  return {
    title: `${exam.name} Elite Test Preparation | ACE Education USA`,
    description: exam.description,
  };
}

export default async function ExamPrepDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = EXAMS.find((e) => e.slug === slug);
  if (!exam) notFound();

  // Retrieve premium dynamic structured data for this exam prep slug
  const details = getCourseDetails(slug, exam.name);

  return <CoursePageTemplate {...details} />;
}
