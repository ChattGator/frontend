import Image from "next/image";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { useRouter, NextRouter } from "next/router";
import { useState, useEffect, useRef, Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useUser } from "@contexts";
import type { FC, RefObject } from "react";

interface Props {
	isAuthenticated: boolean;
}

const Navbar: FC<Props> = () => {
	const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>();
	const [toggleProfile, setToggleProfile] = useState<boolean>(false);
	const router: NextRouter = useRouter();
	const ref: RefObject<HTMLDivElement> = useRef(null);

	const handleToggleProfile: () => void = () => setToggleProfile((toggleProfile) => !toggleProfile);

	useEffect(() => {
		const handleClickOutside: (event: any) => void = (event) => {
			if (ref.current && !ref.current.contains(event.target)) setToggleProfile(false);
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	});

	const { loading, user, logout } = useUser();

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
					<ul className="relative flex items-center space-x-2 lg:space-x-4">
						<li>
							<a
								href="#"
								className="rounded-lg px-2 py-1 text-sm font-normal text-slate-600 transition-colors hover:bg-blue-100 active:text-blue-600 lg:px-4 lg:py-2 lg:text-base"
							>
								Docs
							</a>
						</li>
						{loading ? (
							<div className="h-12 w-32 animate-pulse rounded-lg bg-slate-200 lg:h-16 lg:w-52"></div>
						) : user ? (
							<>
								<li>
									<Link href="/project">
										<a
											className={`${
												router.pathname == "/project"
													? "font-semibold text-slate-900"
													: "font-normal text-slate-600"
											} rounded-lg px-2 py-1 text-sm transition-colors hover:bg-blue-100 active:text-blue-600 lg:px-4 lg:py-2 lg:text-base`}
										>
											Projects
										</a>
									</Link>
								</li>
								<button
									onClick={handleToggleProfile}
									className={`ml-2 h-10 w-10 rounded-full bg-slate-200 lg:ml-4 lg:h-12 lg:w-12 ${
										isAvatarLoading && "animate-pulse"
									}`}
								>
									<Image
										src={
											user.avatar ??
											`https://ui-avatars.com/api/name=${
												user.name ?? "Unknown Name"
											}?&background=random`
										}
										alt={user.name ?? "Unknown Name"}
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
									<div className="absolute top-14 right-0 z-50 w-48 space-y-2 rounded-lg bg-white p-4 text-center shadow-lg lg:top-16 lg:w-64 lg:space-y-4 lg:p-8">
										<button
											onClick={handleToggleProfile}
											className="absolute top-4 right-4 rounded-lg p-0.5"
										>
											<XMarkIcon className="h-4 w-4 text-slate-900 lg:h-5 lg:w-5" />
										</button>
										<div className="mx-auto w-fit rounded-full border-2 border-blue-600 p-1">
											<div
												className={`h-16 w-16 rounded-full bg-slate-200 lg:h-24 lg:w-24 ${
													isAvatarLoading && "animate-pulse"
												}`}
											>
												<Image
													src={
														user.avatar ??
														`https://ui-avatars.com/api/name=${
															user.name ?? "Unknown Name"
														}?&background=random`
													}
													alt={user.name ?? "Unknown Name"}
													width="1"
													height="1"
													layout="responsive"
													objectFit="cover"
													objectPosition="center center"
													className="rounded-full"
													onLoad={() => setIsAvatarLoading(false)}
												/>
											</div>
										</div>
										<div>
											<p className="text-lg font-semibold text-slate-900 lg:text-xl">
												{user.name ?? "Unknown Name"}
											</p>
											<p className="select-all break-words text-sm text-slate-600 lg:text-base">
												{user.email ?? "email@email.com"}
											</p>
										</div>
										<div>
											<button
												onClick={logout}
												className="rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-4 lg:py-2 lg:text-base"
											>
												Logout
											</button>
										</div>
									</div>
								</Transition>
							</>
						) : (
							<li>
								<Link href="/login-register">
									<a className="rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-4 lg:py-2 lg:text-base">
										Login/Register
									</a>
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
