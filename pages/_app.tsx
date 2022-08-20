import "../styles/globals.css";
import { Navbar, Footer, ToastContainer } from "@components";
import { ToastProvider, UserProvider } from "@contexts";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<UserProvider>
			<ToastProvider>
				<Navbar isAuthenticated={true} />
				<ToastContainer />
				<Component {...pageProps} />
				<Footer />
			</ToastProvider>
		</UserProvider>
	);
};

export default App;
