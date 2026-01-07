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



export const useCreateCampaign = (onSuccessCallback) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCampaign) => campaigns.create(newCampaign),
        onSuccess: (data) => {
            // 1. Validasi Cache: Memaksa 'getAll' untuk fetch ulang data terbaru
            queryClient.invalidateQueries({ queryKey: ['campaigns', 'me'] });

            // 2. Callback opsional untuk menutup modal atau reset form
            if (onSuccessCallback) onSuccessCallback(data);
        },
        onError: (error) => {
            // Kamu bisa tambahkan notifikasi toast di sini
            console.error("Gagal membuat kampanye:", error);
        }
    });
};


export const useUpdateCampaign = (onSuccessCallback) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...payload }) => campaigns.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            if (onSuccessCallback) onSuccessCallback();
        },
    });
};


