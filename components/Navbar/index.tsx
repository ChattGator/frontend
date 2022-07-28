import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import type { FC } from "react";

const Navbar: FC = () => {
	const router: NextRouter = useRouter();

	return (
		<>
			<header className="border-b border-slate-200 bg-white print:hidden">
				<nav
					className="container flex items-center justify-between py-1"
					role="navigation"
				>
					<Link href="/">
						<a className="px-4 py-2 text-3xl font-bold tracking-tighter text-slate-900 transition-colors active:text-blue-600 lg:text-4xl">
							ChattY
						</a>
					</Link>
					<ul className="flex items-center gap-2 lg:gap-4">
						<li>
							<Link href="/login">
								<a
									className={`${
										router.pathname == "/login"
											? "font-semibold text-slate-900"
											: "font-normal text-slate-600"
									} rounded-lg px-4 py-2 text-sm transition-colors hover:bg-blue-100 active:text-blue-600 lg:px-2 lg:text-base`}
								>
									Login
								</a>
							</Link>
						</li>
						<li>
							<Link href="/register">
								<a className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors lg:bg-blue-700 lg:text-base">
									Register
								</a>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
