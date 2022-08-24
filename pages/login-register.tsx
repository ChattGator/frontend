import { Head, GoogleIcon, GitHubIcon, LoginSVG } from "@components";
import { useUser } from "@contexts";
import type { NextPage } from "next";

const Login: NextPage = () => {
	const { login } = useUser();

	return (
		<>
			<Head title="Login" />
			<main className="container space-y-8 py-24 lg:flex lg:flex-row-reverse lg:items-center lg:justify-around lg:gap-8 lg:space-y-0 lg:py-32">
				<LoginSVG className="mx-auto w-4/5 lg:mx-0 xl:w-2/5" />
				<div className="rounded-lg border-2 border-slate-200 bg-white">
					<h1 className="border-b-2 border-slate-200 p-4 text-4xl font-bold tracking-tighter text-slate-900 lg:p-8 lg:text-5xl">
						Login/Register
					</h1>
					<div className="grid grid-cols-1 space-y-2 p-4 sm:w-96 lg:space-y-4 lg:p-8">
						<button
							onClick={() => login("GitHub")}
							className="inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-8 lg:py-4 lg:text-base"
						>
							<GitHubIcon className="h-5 w-5" />
							<span>GitHub</span>
						</button>
						<button
							onClick={() => login("Google")}
							className="inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-8 lg:py-4 lg:text-base"
						>
							<GoogleIcon className="h-5 w-5" />
							<span>Google</span>
						</button>
					</div>
				</div>
			</main>
		</>
	);
};

export default Login;
