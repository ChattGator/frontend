import Link from "next/link";
import { Head, GoogleIcon, GitHubIcon } from "@components";
import { auth } from "@lib";
import {
	signInWithPopup,
	GithubAuthProvider,
	GoogleAuthProvider,
} from "firebase/auth";
import { useUser } from "@contexts";
import type { NextPage } from "next";

const Login: NextPage = () => {
	const { setLoading, setUser } = useUser();

	const handleLogin: (type: string) => void = async (type) => {
		try {
			let res, token;
			switch (type) {
				case "GitHub":
					res = await signInWithPopup(auth, new GithubAuthProvider());
					token = await res.user.getIdToken();
					setUser({
						name: res.user.displayName,
						email: res.user.email,
						avatar: res.user.photoURL,
						token,
					});
				case "Google":
					res = await signInWithPopup(auth, new GoogleAuthProvider());
					token = await res.user.getIdToken();
					setUser({
						name: res.user.displayName,
						email: res.user.email,
						avatar: res.user.photoURL,
						token,
					});
					break;
				default:
					break;
			}
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Head title="Login" />
			<main className="container pb-24 lg:pb-32">
				<div className="mx-auto rounded-lg border-2 border-slate-200 bg-white">
					<h1 className="border-b-2 border-slate-200 p-4 text-4xl font-bold tracking-tighter text-slate-900 lg:p-8 lg:text-5xl">
						Login to your account
					</h1>
					<div className="space-y-2 px-4 py-2 lg:space-y-4 lg:py-8 lg:px-8">
						<div className="grid grid-cols-1 space-y-2 sm:w-96 lg:space-y-4">
							<button
								onClick={() => handleLogin("GitHub")}
								className="inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-8 lg:py-4 lg:text-base"
							>
								<GitHubIcon className="h-5 w-5" />
								<span>GitHub</span>
							</button>
							<button
								onClick={() => handleLogin("Google")}
								className="inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-8 lg:py-4 lg:text-base"
							>
								<GoogleIcon className="h-5 w-5" />
								<span>Google</span>
							</button>
						</div>
						<p className="space-x-1 text-sm text-slate-600 lg:text-base">
							<span>Don&apos;t have an account?</span>
							<Link href="/register">
								<a className="font-medium text-blue-600 hover:underline">
									Register here
								</a>
							</Link>
						</p>
					</div>
				</div>
			</main>
		</>
	);
};

export default Login;
