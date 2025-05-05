import React, { useEffect } from "react";

const GoogleReviewsEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bg-[#0d0d0d] py-12 px-6 text-center text-white">
      <h2 className="text-3xl font-bold text-[#f7c948] mb-8">What People Are Saying</h2>
      <div
        className="elfsight-app-5f3972b7-21ca-4329-809e-e172168dd905"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default GoogleReviewsEmbed;
