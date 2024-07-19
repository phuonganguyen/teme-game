import { GetUserResourcesResponse, Result } from '@/models';

const UserService = {
  getResources: async (): Promise<GetUserResourcesResponse> => {
    const response = await fetch("/api/user/resources");
    return await response.json();
  },
  upgradeCat: async (): Promise<Result> => {
    const response = await fetch("/api/user/upgrade", { method: "POST" });
    return response.json();
  },
};

export default UserService;
