import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Archire',
  description: 'Review the terms and conditions for using the Archire platform.',
};

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-lg mb-4">
        Welcome to Archire! By using our platform, you agree to these Terms and Conditions. Please read them carefully before proceeding.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Use of the Platform</h2>
      <p className="text-lg mb-4">
        Archire provides a service for clients to post projects and architects to submit applications. You agree to use the platform only for lawful purposes and in accordance with these terms.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
      <p className="text-lg mb-4">
        You are responsible for the accuracy of the information you provide, including project details and applications. Misrepresentation or misuse of the platform may result in account suspension.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
      <p className="text-lg mb-4">
        Content you submit (e.g., project descriptions, proposals) remains yours, but you grant Archire a non-exclusive license to display and use it to facilitate platform functionality.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
      <p className="text-lg mb-4">
        Archire is not liable for disputes between clients and architects or for the outcome of projects. We provide the platform “as is” and do not guarantee specific results.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
      <p className="text-lg mb-4">
        We may update these Terms and Conditions periodically. Continued use of the platform after changes constitutes acceptance of the new terms.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last updated: March 29, 2025
      </p>
    </div>
  );
}