export const baseUrl: string =
	import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

console.log(import.meta.env.MODE);
