import { useEffect, useState } from "react";
import {
	CheckCircleIcon,
	XCircleIcon,
	ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { useToast } from "@contexts";
import type { FC } from "react";

type Type = "success" | "error" | "info";

interface Props {
	index: number;
	type: Type;
	message: string;
}

const Toast: FC<Props> = ({ index, type, message }) => {
	const [isShowing, setIsShowing] = useState(true);
	const { removeToast } = useToast();

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsShowing(false);
			removeToast(index);
		}, 5000);
		return () => {
			clearTimeout(timeout);
		};
	}, [index, removeToast]);

	const renderIcon = (type: string) => {
		if (type === "success")
			return (
				<CheckCircleIcon className="h-6 w-6 text-green-600 lg:h-8 lg:w-8" />
			);
		if (type === "error")
			return (
				<XCircleIcon className="h-6 w-6 text-red-600 lg:h-8 lg:w-8" />
			);
		if (type === "info")
			return (
				<ExclamationCircleIcon className="h-6 w-6 text-blue-600 lg:h-8 lg:w-8" />
			);
	};

	const getBorderColor = (type: string) => {
		if (type === "success") return "border-green-600";
		if (type === "error") return "border-red-600";
		if (type === "info") return "border-blue-600";
	};

	const deleteToast = () => {
		setIsShowing(false);
	};

	return (
		<Transition
			as="button"
			show={isShowing}
			enter="transition transform"
			enterFrom="translate-y-full opacity-0"
			enterTo="translate-y-0 opacity-100"
			leave="transition transform"
			leaveFrom="translate-y-0 opacity-100"
			leaveTo="translate-y-full opacity-0"
			onClick={() => deleteToast()}
			className={`flex w-full items-center space-x-1 rounded-lg border-2 bg-white p-2 text-left text-xs text-slate-600 lg:space-x-2 lg:p-4 lg:text-sm ${getBorderColor(
				type
			)}`}
		>
			<span>{renderIcon(type)}</span>
			<span>{message}</span>
		</Transition>
	);
};

export default Toast;
