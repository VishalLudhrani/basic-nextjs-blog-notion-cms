"use client";

import { useEffect } from "react";

export default function CrispChatLoader() {
  useEffect(() => {
    if (typeof window !== undefined) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "9878cde4-d139-4a42-a8b0-6b8432a8f913";
      (function () {
        var d = document;
        var s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    }
  }, []);

  return <></>;
}
