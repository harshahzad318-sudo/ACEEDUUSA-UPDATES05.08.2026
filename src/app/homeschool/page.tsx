import { getCourseDetails } from "@/lib/courseDetails";
import CoursePageTemplate from "@/components/CoursePageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homeschool Support & Tutoring | ACE Education USA",
  description: "Flexible, personalized daytime homeschool support and tutoring aligned to your curriculum, schedule, and state criteria. For PreK-12 students.",
};

export default function HomeschoolPage() {
  // Retrieve the custom homeschooling support details from our master data mapping
  const details = getCourseDetails("homeschool", "Homeschool Support");

  return <CoursePageTemplate {...details} />;
}
