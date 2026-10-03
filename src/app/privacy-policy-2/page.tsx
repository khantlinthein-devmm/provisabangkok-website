import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <div className="wrap max-w-3xl py-16">
        <div className="prose-content">
          <p>Our website address is {site.url}.</p>
          <h2>What we collect</h2>
          <p>
            When you contact us through the form, by email, LINE, WhatsApp or phone, we receive the details you choose
            to share, such as your name, contact details, nationality and information about your visa situation.
          </p>
          <h2>How we use it</h2>
          <p>
            We use this information only to answer your enquiry and to provide the visa services you ask for. We share
            documents with Thai government offices or partner organisations only when this is needed for your
            application.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us at any time to see, correct or delete the information we hold about you by writing to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
