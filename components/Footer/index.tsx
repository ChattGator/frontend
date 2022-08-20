import type { FC } from "react";

const Footer: FC = () => {
	return (
		<footer className="absolute bottom-0 w-full border-t border-slate-200 bg-blue-100 py-4 text-center">
			<span className="text-sm text-slate-900 lg:text-base">
				Made with <span className="text-red-600">&hearts;</span> by team ChattY
			</span>
		</footer>
	);
};

export default Footer;
