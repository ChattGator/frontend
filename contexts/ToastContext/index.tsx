import { useState, createContext, useContext } from "react";
import type { FC, ReactNode } from "react";

type Type = "success" | "error" | "info";

interface Toast {
	type: Type;
	message: string;
}

interface ToastContext {
	toasts: Toast[];
	addToast: (toast: Toast) => void;
	removeToast: (index: number) => void;
}

const ToastContext = createContext<ToastContext | undefined>(undefined);

interface ToastProviderProps {
	children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast: (toast: Toast) => void = (toast) => {
		setToasts((toasts) => [...toasts, toast]);
	};

	const removeToast: (index: number) => void = (index) => {
		const allToasts = [...toasts];
		allToasts.splice(index, 1);
		setToasts(allToasts);
	};

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (context === undefined)
		throw new Error("useToast must be used within a ToastProvider");
	return context;
};
