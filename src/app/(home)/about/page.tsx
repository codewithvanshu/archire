import { Metadata } from "next";

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
        This project is build by Vanshika under the guidence of DR. Tarun Kumar Gupta .
      </p>
    </div>
  );
}
