export default function () {
    const queryClient = vq.useQueryClient();
    return vq.useMutation({
        mutationKey: ["deleteAssignment"],
        mutationFn: async (id: string) => {
            const data = await $fetch("/api/assignments/delete", {
                method: "DELETE",
                body: JSON.stringify({ id }),
            });
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["assignments"] });
        }
      
    });
}