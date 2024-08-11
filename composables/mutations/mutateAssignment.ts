export default function () {
    const queryClient = vq.useQueryClient();
    return vq.useMutation({
        mutationKey: ["mutateAssignment"],
        mutationFn: async (newAssignment: Object) => {
            console.log(newAssignment);
            const data = await $fetch("/api/assignments/update", {
                method: "PATCH",
                body: JSON.stringify(newAssignment),
            });
            return data;
        },

        // optimisticly update local state, allowing for rollback on error
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["assignments"] });
        },

    })
}