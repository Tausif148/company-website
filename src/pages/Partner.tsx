const Partner = () => {
  return (
    <div className="px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-[#081D3A]">
          Partner with Us
        </h1>
        <p className="mb-8 text-lg text-[#374151]">
          Join forces with our team to create enterprise-grade digital
          solutions. We collaborate with partners who share our commitment to
          innovation and long-term value.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-[#ffffff] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#0F172A]">Why Partner</h2>
          <p className="mt-3 text-sm text-[#475569]">
            Work with us to unlock new markets, expand service delivery, and
            build custom digital experiences for enterprise clients.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-[#ffffff] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#0F172A]">
            Partner Programs
          </h2>
          <p className="mt-3 text-sm text-[#475569]">
            Our partner programs are designed to support integration,
            co-innovation, and success across technology and business services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Partner;
