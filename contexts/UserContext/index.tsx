import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, signInWithPopup, GithubAuthProvider, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@lib";
import type { FC, ReactNode } from "react";

interface User {
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

	useEffect(() => {
		try {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const token = await user.getIdToken();
					setUser({
						name: user.displayName,
						email: user.email,
						avatar: user.photoURL,
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

	const logout = async () => {
		await signOut(auth);
		setUser(null);
	};

	return <UserContext.Provider value={{ loading, user, setUser, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser: () => UserContextProps = () => {
	const context = useContext(UserContext);
	if (context === undefined) throw new Error("useUser must be used within a UserProvider");
	return context;
};
