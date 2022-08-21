import { Toast } from "@components";
import { useToast } from "@contexts";
import type { FC } from "react";

const ToastContainer: FC = () => {
	const { toasts } = useToast();

	return (
		<ul className="fixed bottom-20 left-4 w-64 space-y-2 lg:left-8 lg:w-96 lg:space-y-4">
			{toasts.map(({ type, message }, index) => (
				<Toast
					key={index}
					index={index}
					type={type}
					message={message}
				/>
			))}
		</ul>
	);
};

export default ToastContainer;
