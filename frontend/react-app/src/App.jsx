import { useEffect, useRef } from "react";
import originalMarkup from "../../index.html?raw";
import originalScript from "../../apps.js?raw";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const parsedMarkup = new DOMParser().parseFromString(originalMarkup, "text/html");
    parsedMarkup.querySelectorAll("script").forEach(script => script.remove());
    mountRef.current.innerHTML = parsedMarkup.body.innerHTML;

    const appScript = document.createElement("script");
    appScript.textContent = `(() => {
      ${originalScript}
      Object.assign(window, { openAuth, closeAuth, closeOnBackdrop, switchTab, handleLogin, handleSignup, logout });
    })();`;
    document.body.append(appScript);

    return () => appScript.remove();
  }, []);

  return <div ref={mountRef} />;
}