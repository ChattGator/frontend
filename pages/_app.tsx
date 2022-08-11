import "../styles/globals.css";
import { Navbar, Footer, ToastContainer } from "@components";
import { ToastProvider } from "@contexts";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ToastProvider>
			<Navbar isAuthenticated={true} />
			<ToastContainer />
			<Component {...pageProps} />
			<Footer />
		</ToastProvider>
	);
};

export default App;
