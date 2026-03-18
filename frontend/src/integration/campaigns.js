import { api } from "./api";


export const campaigns = {
    getAll: async (userId) => {
        const url = userId ? `/campaigns?user_id=${userId}` : `/campaigns`;
        const response = await api.get(url);
        return response.data;
    },
    create: async (payload) => {
        const response = await api.post(`/campaigns`, payload);
        return response.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/campaigns/${id}`, payload);
        return response.data;
    }
}
