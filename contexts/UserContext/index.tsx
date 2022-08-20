import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signInWithPopup, GithubAuthProvider, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@lib";
import { Developer } from "@utils";
import { setCookie, destroyCookie } from "nookies";
import type { FC, ReactNode } from "react";

interface User {
	id: string | null;
	name: string | null;
	email: string | null;
	avatar: string | null;
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
	const router = useRouter();
	const developerService = new Developer();

	useEffect(() => {
		try {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const token = await user.getIdToken();
					const userDetails = await developerService.getUserDetails(token);
					setCookie(null, "token", token);
					setCookie(null, "authenticated", "true");
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
					setCookie(null, "token", token);
					setCookie(null, "authenticated", "true");
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
					setCookie(null, "token", token);
					setCookie(null, "authenticated", "true");
					break;
				default:
					break;
			}
			router.push("/dashboard");
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		await signOut(auth);
		destroyCookie(null, "token");
		destroyCookie(null, "authenticated");
		setUser(null);
	};

	return <UserContext.Provider value={{ loading, user, setUser, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser: () => UserContextProps = () => {
	const context = useContext(UserContext);
	if (context === undefined) throw new Error("useUser must be used within a UserProvider");
	return context;
};
