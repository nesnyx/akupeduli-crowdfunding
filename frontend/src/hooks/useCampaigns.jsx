import { campaigns } from "../integration/campaigns";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useMyCampaigns = (userId) => {
    return useQuery({
        queryKey: ['campaigns', 'me', userId], // Key unik untuk cache
        queryFn: () => campaigns.getAll(userId),
        enabled: !!userId, // Hanya jalan jika userId ada
        staleTime: 1000 * 60 * 5, // Data dianggap "fresh" selama 5 menit
    });
};
