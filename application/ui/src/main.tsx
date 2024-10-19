// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Custom Components
import App from "./App.tsx";

// Styles
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
