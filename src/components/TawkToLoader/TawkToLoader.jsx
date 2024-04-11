"use client";

import { useEffect } from "react";

export default function TawkToLoader() {
  useEffect(() => {
    if (typeof window !== undefined) {
      // tawk.to
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/6617a9931ec1082f04e12bd7/1hr66sqm0';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
    }
  }, []);

  return <></>;
}
