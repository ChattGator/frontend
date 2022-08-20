import { HttpClient } from "@lib";

interface UserResposne {
	name: string;
	picture: string;
	email: string;
	projects: any[];
	_id: string;
	createdAt: string;
}

class Developer extends HttpClient {
	constructor() {
		super();
	}

	public async getUserDetails(token: string): Promise<UserResposne> {
		return await this.get("/developer/login", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}
}

export default Developer;
