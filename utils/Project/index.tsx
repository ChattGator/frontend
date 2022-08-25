import { HttpClient } from "@lib";

interface ProjectResposne {
	name: string;
	developerId: string;
	description: string;
	credentials: {
		secret: string;
	};
	projectConfig: {
		isGroupEnabled: boolean;
		chatLimit: number;
	};
	_id: string;
	createdAt: string;
}

interface UserResposne {
	_id: string;
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
	createdAt: string;
}

interface GroupResponse {
	_id: string;
	projectId: string;
	name: string;
	description: string;
	isGroup: boolean;
	admins: string[];
	membersList: string[];
	messages: any[];
	createdAt: string;
}

interface CreateProject {
	name: string;
	description: string;
}

class Project extends HttpClient {
	constructor() {
		super();
	}

	public async getProjectsByDeveloper(id: string, token: string): Promise<ProjectResposne[]> {
		return await this.get(`/project?developerId=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public async getProject(id: string | string[] | undefined, token: string): Promise<ProjectResposne> {
		return await this.get(`/project/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public async createProject(data: CreateProject, token?: string): Promise<ProjectResposne> {
		return this.post("/project", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public async updateProject(id: string, data: CreateProject, token?: string): Promise<ProjectResposne> {
		return this.put(`/project/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public async deleteProject(id: string, token?: string): Promise<ProjectResposne> {
		return this.delete(`/project/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public async getUsersByProject(id: string): Promise<UserResposne[]> {
		return this.get(`/user?projectId=${id}`);
	}

	public async getUserById(id: string): Promise<UserResposne> {
		return this.get(`/user/${id}`);
	}

	public async getGroupsByProject(id: string): Promise<GroupResponse[]> {
		return this.get(`/group?projectId=${id}`);
	}

	public async getGroupById(id: string): Promise<UserResposne> {
		return this.get(`/group/${id}`);
	}
}

export default Project;
