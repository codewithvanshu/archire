import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Archire',
  description: 'Understand how Archire collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-lg mb-4">
        At Archire, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
      <p className="text-lg mb-4">
        We collect information you provide directly, such as your name, email, and project details when you sign up, submit applications, or communicate via our messaging system. We also collect usage data (e.g., IP addresses, browser type) to improve our services.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
      <p className="text-lg mb-4">
        Your data is used to facilitate project connections, process applications, and enable communication between clients and architects. We may also use it to send you updates about your projects or our platform, with your consent where required.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Data Sharing and Security</h2>
      <p className="text-lg mb-4">
        We share your information only with relevant parties (e.g., clients or architects you interact with) and use industry-standard security measures to protect it. We do not sell your data to third parties.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Your Rights</h2>
      <p className="text-lg mb-4">
        You can access, update, or delete your account information by contacting us. We comply with applicable data protection laws, including GDPR where relevant.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last updated: March 29, 2025
      </p>
    </div>
  );
}