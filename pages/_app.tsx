import "../styles/globals.css";
import "../node_modules/nprogress/nprogress.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { start, done, configure } from "nprogress";
import { Navbar, Footer, ToastContainer } from "@components";
import { ToastProvider, UserProvider } from "@contexts";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	configure({ showSpinner: false });

	useEffect(() => {
		router.events.on("routeChangeStart", () => start());
		router.events.on("routeChangeComplete", () => done());
		router.events.on("routeChangeError", () => done());

		return () => {
			router.events.off("routeChangeStart", () => start());
			router.events.off("routeChangeComplete", () => done());
			router.events.off("routeChangeError", () => done());
		};
	}, [router.events]);

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
