import { default as NextHead } from "next/head";
import { FC } from "react";

interface Props {
	title?: string;
	description?: string;
	keywords?: string;
}

const Head: FC<Props> = ({ title, description, keywords }: Props) => {
	return (
		<NextHead>
			<title>{title}</title>
			<meta
				name="description"
				content={description}
			/>
			<meta
				name="keywords"
				content={keywords}
			/>
			<meta charSet="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
		</NextHead>
	);
};

export default Head;

Head.defaultProps = {
	title: "ChattY",
	description: "Chat App",
	keywords: "Chat, ScoketIO, Dashboard, ChattY",
};
