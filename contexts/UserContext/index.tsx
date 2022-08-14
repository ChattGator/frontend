import { useState, createContext, useContext } from "react";
import type { FC, ReactNode } from "react";

interface User {
	name: string | null;
	email: string | null;
	avatar: string | null;
	token: string;
}

interface UserContextProps {
	loading: boolean;
	setLoading: (loading: boolean) => void;
	user: User | null;
	setUser: (user: User | null) => void;
}

interface UserProviderProps {
	children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);

	return (
		<UserContext.Provider value={{ loading, setLoading, user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser: () => UserContextProps = () => {
	const context = useContext(UserContext);
	if (context === undefined)
		throw new Error("useUser must be used within a UserProvider");
	return context;
};
