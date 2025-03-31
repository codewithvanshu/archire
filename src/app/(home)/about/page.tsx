import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  Mail } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";
export const metadata: Metadata = {
  title: "About Us - Archire",
  description:
    "Learn about Archire, a platform connecting clients and architects for seamless project collaboration.",
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Archire</h1>
      <p className="text-lg mb-4">
        Welcome to Archire, a platform designed to bridge the gap between
        clients and architects. Our mission is to streamline the process of
        project discovery, application, and collaboration, making it easier for
        clients to find talented architects and for architects to showcase their
        skills.
      </p>
      <p className="text-lg mb-4">
        With Archire, clients can post project details, review applications from
        architects, and communicate directly through our messaging system.
        Architects can explore opportunities, submit proposals, and manage their
        project engagements—all in one place.
      </p>
      <p className="text-lg">
        Built with cutting-edge technology and a focus on user experience,
        Archire is here to transform how architectural projects come to life.
      </p>
      <p>
        This project is build by Vanshika under the guidence of DR. Tarun Kumar
        Gupta .
      </p>

      <h2 className="text-2xl font-semibold mb-8">Meet the Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
        {/* Guide Card */}
        <Card className="w-full max-w-sm mx-auto bg-background border rounded-lg overflow-hidden shadow-lg">
          <CardHeader className="flex flex-col items-center  p-6">
            <div className="relative w-full aspect-square max-w-[200px] mb-4">
              <Image
                src="/tarun.png"
                alt="Mr. Tarun Kumar Gupta"
                fill
                className="rounded-md object-cover border-2 border-gray-300"
              />
            </div>
            <CardTitle className="text-xl font-semibold ">
              Mr. Tarun Kumar Gupta
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Project Guide | Assistant Professor
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4 text-center text-sm md:text-base">
              Mr. Tarun Kumar Gupta is an accomplished academic with a Ph.D. in
              Computer Science from Jamia Millia Islamia. As an Assistant
              Professor at Miranda House, Delhi University, he brings expertise
              in ANN optimization and nature-inspired techniques, guiding the
              ArcHire project to success.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline"  size="sm" asChild>
                <Link
                  href="mailto:tarun.gupta@mirandahouse.ac.in"
                  target="_blank"
                >
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Link>
              </Button>
              <Button variant="outline"  size="sm" asChild>
                <Link
                  href="https://in.linkedin.com/in/dr-tarun-kumar-gupta-77570559"
                  target="_blank"
                >
                  <FaLinkedin className="mr-2 h-4 w-4" /> LinkedIn
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student Card */}
        <Card className="w-full max-w-sm mx-auto bg-background border rounded-lg overflow-hidden shadow-lg">
          <CardHeader className="flex flex-col items-center  p-6">
            <div className="relative w-full aspect-square max-w-[200px] mb-4">
              <Image
                src="/vanshika.jpeg"
                alt="Vanshika"
                fill
                className="rounded-md object-cover border-2 border-gray-300"
              />
            </div>
            <CardTitle className="text-xl font-semibold">Vanshika</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Developer | BCA Student, IGNOU
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4 text-center text-sm md:text-base">
              Vanshika is a dedicated BCA student at IGNOU with a passion for
              technology and innovation. As the creator of ArcHire, he has
              leveraged his skills in web development and database management to
              build a practical solution for small businesses.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/codewithvanshu" target="_blank">
                  <FaGithub className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
