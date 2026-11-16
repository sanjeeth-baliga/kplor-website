import { redirect } from "next/navigation";

export default function AboutPage() {
  redirect("/more-info?tab=about");
}

