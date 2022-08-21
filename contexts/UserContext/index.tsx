import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, signInWithPopup, GithubAuthProvider, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@lib";
import { Developer } from "@utils";
import { setCookie, destroyCookie } from "nookies";
import type { FC, ReactNode } from "react";

interface User {
	id: string;
	name: string;
	email: string;
	avatar: string;
	token: string;
}

interface UserContextProps {
	loading: boolean;
	user: User | null;
	setUser: (user: User | null) => void;
	login: (type: string) => void;
	logout: () => void;
}

interface UserProviderProps {
	children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);
	const developerService = new Developer();

	useEffect(() => {
		if (user) return;
		try {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const token = await user.getIdToken();
					const userDetails = await developerService.getUserDetails(token);
					setCookie(null, "token", token, {
						secure: process.env.NODE_ENV !== "development",
						maxAge: 60 * 60,
						sameSite: true,
						path: "/",
					});
					setCookie(null, "authenticated", "true", {
						secure: process.env.NODE_ENV !== "development",
						maxAge: 60 * 60,
						sameSite: true,
						path: "/",
					});
					setUser({
						id: userDetails._id,
						name: userDetails.name,
						email: userDetails.email,
						avatar: userDetails.picture,
						token,
					});
				} else {
					setUser(null);
				}
			});
			return () => unsubscribe();
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, []);

	const login: (type: string) => void = async (type) => {
		try {
			let res, token, userDetails;
			switch (type) {
				case "GitHub":
					res = await signInWithPopup(auth, new GithubAuthProvider());
					token = await res.user.getIdToken();
					userDetails = await developerService.getUserDetails(token);
					setUser({
						id: userDetails._id,
						name: userDetails.name,
						email: userDetails.email,
						avatar: userDetails.picture,
						token,
					});
					setCookie(null, "token", token, {
						secure: process.env.NODE_ENV !== "development",
						maxAge: 60 * 60,
						sameSite: true,
						path: "/",
					});
					setCookie(null, "authenticated", "true", {
						secure: process.env.NODE_ENV !== "development",
						maxAge: 60 * 60,
						sameSite: true,
						path: "/",
					});
					break;
				case "Google":
					res = await signInWithPopup(auth, new GoogleAuthProvider());
					token = await res.user.getIdToken();
					userDetails = await developerService.getUserDetails(token);
					setUser({
						id: userDetails._id,
						name: userDetails.name,
						email: userDetails.email,
						avatar: userDetails.picture,
						token,
					});
					setCookie(null, "token", token, {
						secure: process.env.NODE_ENV !== "development",
						maxAge: 60 * 60,
						sameSite: true,
						path: "/",
					});
					setCookie(null, "authenticated", "true", {
						secure: process.env.NODE_ENV !== "development",
						maxAge: 60 * 60,
						sameSite: true,
						path: "/",
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

	const logout: () => void = async () => {
		await signOut(auth);
		destroyCookie(null, "token", {
			secure: process.env.NODE_ENV !== "development",
			maxAge: new Date(0),
			sameSite: true,
			path: "/",
		});
		destroyCookie(null, "authenticated", {
			secure: process.env.NODE_ENV !== "development",
			maxAge: new Date(0),
			sameSite: true,
			path: "/",
		});
		setUser(null);
	};

	return <UserContext.Provider value={{ loading, user, setUser, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser: () => UserContextProps = () => {
	const context = useContext(UserContext);
	if (context === undefined) throw new Error("useUser must be used within a UserProvider");
	return context;
};
