import { api } from "./api";


export const campaigns = {
    getAll: async (userId) => {
        const response = await api.get(`/campaigns?user_id=${userId}`);
        return response.data;
    }
}
