import { createRoot } from "react-dom/client";
import App from "./App";
import { installLegacyGlobals } from "./lib/legacy-runtime";
import "./styles/app.css";

installLegacyGlobals();

createRoot(document.getElementById("root")!).render(<App />);
