import { Head } from "@components";
import type { NextPage } from "next";

const Login: NextPage = () => {
	return (
		<>
			<Head />
			<main className="container pb-24 lg:pb-32">
                    <div className="container px-5 py-24 mx-auto p-4 md:w-1/3">
                            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <h2 className="text-blue-600 text-4xl font-bold mx-auto mb-12">Register</h2>
                                </div>
                                <div className="flex-grow">
                                    <a
                                    href="#"
                                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-700 rounded-md group hover:bg-blue-700 focus:outline-none">
                                        <span>
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                                                className="w-6 h-6"
                                            >
                                            </img>
                                        </span>
                                        <span className="text-lg font-medium text-blue-700 group-hover:text-white">Google</span>
                                    </a>
                                </div>
                            </div>
                    </div>
			</main>
		</>
	);
};

export default Login;
