import "../styles/globals.css";
import { Navbar, Footer, Toast } from "@components";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Navbar isAuthenticated={true} />
			<Toast
				message="test"
				type="info"
			/>
			<Component {...pageProps} />
			<Footer />
		</>
	);
};

export default App;
