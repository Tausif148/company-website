const PrivacyPolicy = () => {
  return (
    <section className="bg-[#F7F8FC] sm:py-16 lg:py-20 xl:py-22 overflow-hidden">
      <div className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-[#081D3A]">
            Privacy Policy
          </h1>
          <p className="mb-4 text-base leading-8 text-[#475569]">
            We respect your privacy and are committed to protecting your
            personal information. This page explains how we collect, use, and
            safeguard data.
          </p>
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#0F172A]">
                Information We Collect
              </h2>
              <p className="mt-2 text-sm text-[#475569]">
                We may collect contact information, usage data, and other
                details when you interact with our website or services.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#0F172A]">
                How We Use Data
              </h2>
              <p className="mt-2 text-sm text-[#475569]">
                Data helps us improve our offerings, respond to inquiries, and
                deliver a better user experience.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#0F172A]">
                Your Choices
              </h2>
              <p className="mt-2 text-sm text-[#475569]">
                You can contact us to request updates or deletions of your
                information, and we will handle requests responsibly.
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
