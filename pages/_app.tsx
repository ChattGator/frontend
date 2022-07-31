import "../styles/globals.css";
import { Navbar, Footer } from "@components";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Navbar isAuthenticated={true} />
			<Component {...pageProps} />
			<Footer />
		</>
	);
};

export default App;
