// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React Query
import { QueryClient, QueryClientProvider } from "react-query";

// Custom Components
import App from "./App.tsx";

// Styles
import "./index.css";

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>
);
