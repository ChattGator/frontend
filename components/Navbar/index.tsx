import Image from "next/image";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { useRouter, NextRouter } from "next/router";
import { useState, useEffect, useRef, Fragment } from "react";
import { XIcon } from "@heroicons/react/outline";
import type { FC, RefObject } from "react";

interface Props {
	isAuthenticated: boolean;
}

const Navbar: FC<Props> = ({ isAuthenticated }) => {
	const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>();
	const [toggleProfile, setToggleProfile] = useState<boolean>(false);
	const router: NextRouter = useRouter();
	const ref: RefObject<HTMLDivElement> = useRef(null);

	const handleToggleProfile: () => void = () =>
		setToggleProfile((toggleProfile) => !toggleProfile);

	useEffect(() => {
		const handleClickOutside: (event: any) => void = (event) => {
			if (ref.current && !ref.current.contains(event.target))
				setToggleProfile(false);
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	});

	return (
		<>
			<header className="mb-4 print:hidden lg:mb-8">
				<nav
					ref={ref}
					className="container flex items-center justify-between py-2 lg:py-4"
					role="navigation"
				>
					<Link href="/">
						<a className="rounded-lg text-3xl font-bold tracking-tighter text-slate-900 transition-colors active:text-blue-600 lg:text-4xl">
							ChattY
						</a>
					</Link>
					{isAuthenticated ? (
						<ul className="flex items-center gap-2 lg:gap-4">
							<li>
								<Link href="/project">
									<a
										className={`${
											router.pathname == "/project"
												? "font-semibold text-slate-900"
												: "font-normal text-slate-600"
										} rounded-lg px-2 py-1 text-sm transition-colors hover:bg-blue-100 active:text-blue-600 lg:px-4 lg:py-2 lg:text-base`}
									>
										My Projects
									</a>
								</Link>
							</li>
							<li className="relative">
								<button
									onClick={handleToggleProfile}
									className={`h-8 w-8 rounded-full bg-slate-200 lg:h-12 lg:w-12 ${
										isAvatarLoading && "animate-pulse"
									}`}
								>
									{/* TODO (Vatsal): Change alt to user */}
									<Image
										src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
										alt="John Doe"
										width="1"
										height="1"
										layout="responsive"
										objectFit="cover"
										objectPosition="center center"
										className="rounded-full"
										onLoad={() => setIsAvatarLoading(false)}
									/>
								</button>
								<Transition
									as={Fragment}
									show={toggleProfile}
									enter="transform transition duration-150"
									enterFrom="-translate-y-1/4 opacity-0"
									enterTo="translate-y-0 opacity-100"
									leave="transform transition duration-150"
									leaveFrom="translate-y-0 opacity-100"
									leaveTo="-translate-y-1/4 opacity-0"
								>
									<div className="absolute top-12 right-1/2 z-50 w-48 translate-x-1/2 space-y-2 rounded-lg bg-white p-8 text-center shadow-lg lg:top-16 lg:w-64 lg:space-y-4">
										<button
											onClick={handleToggleProfile}
											className="absolute top-4 right-4 rounded-lg p-0.5"
										>
											<XIcon className="h-4 w-4 text-slate-900 lg:h-5 lg:w-5" />
										</button>
										<div className="mx-auto w-fit rounded-full border-2 border-blue-600 p-1">
											<div
												className={`h-16 w-16 rounded-full bg-slate-200 lg:h-24 lg:w-24 ${
													isAvatarLoading &&
													"animate-pulse"
												}`}
											>
												{/* TODO (Vatsal): Change alt to user */}
												<Image
													src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
													alt="John Doe"
													width="1"
													height="1"
													layout="responsive"
													objectFit="cover"
													objectPosition="center center"
													className="rounded-full"
													onLoad={() =>
														setIsAvatarLoading(
															false
														)
													}
												/>
											</div>
										</div>
										<div>
											<p className="text-lg font-semibold text-slate-900 lg:text-xl">
												John Doe
											</p>
											<p className="select-all text-sm text-slate-600 lg:text-base">
												email@email.com
											</p>
										</div>
									</div>
								</Transition>
							</li>
							<li>
								<button className="rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors lg:bg-blue-700 lg:px-4 lg:py-2 lg:text-base">
									Logout
								</button>
							</li>
						</ul>
					) : (
						<ul className="flex items-center gap-2 lg:gap-4">
							<li>
								<Link href="/login">
									<a
										className={`${
											router.pathname == "/login"
												? "font-semibold text-slate-900"
												: "font-normal text-slate-600"
										} rounded-lg px-2 py-1 text-sm transition-colors hover:bg-blue-100 active:text-blue-600 lg:px-4 lg:py-2 lg:text-base`}
									>
										Login
									</a>
								</Link>
							</li>
							<li>
								<Link href="/register">
									<a className="rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors lg:bg-blue-700 lg:px-4 lg:py-2 lg:text-base">
										Register
									</a>
								</Link>
							</li>
						</ul>
					)}
				</nav>
			</header>
		</>
	);
};

export default Navbar;
