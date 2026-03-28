"use client";

import { useEffect, useState } from 'react';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
}

export default function HubSpotForm({ portalId, formId, region = 'eu1' }: HubSpotFormProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    
    script.onload = () => {
      setIsLoaded(true);
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: '#hubspot-form-container'
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [portalId, formId, region]);

  return (
    <div className="w-full bg-alkota-iron/30 p-8 rounded-xl border border-alkota-steel/30 shadow-2xl backdrop-blur-sm">
      {!isLoaded && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-12 h-12 border-4 border-alkota-orange border-t-transparent rounded-full animate-spin"></div>
          <p className="text-alkota-steel font-mono uppercase tracking-widest text-sm">Initializing Secure Portal...</p>
        </div>
      )}
      <div id="hubspot-form-container" className="hubspot-form-custom-styles"></div>
      
      <style jsx global>{`
        .hubspot-form-custom-styles iframe {
          width: 100% !important;
          border: none !important;
        }
        .hubspot-form-custom-styles .hs-form-private {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}
