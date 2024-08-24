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
        onMutate: async (newAssignment: any) => {
            await queryClient.cancelQueries({ queryKey: ["assignments"] });

            // Snapshot the previous value
            const previousAssignments = queryClient.getQueryData(["assignments"]);

            // Optimistically update to the new value
            queryClient.setQueryData(["assignments"], (old: any) => {
                const subjectId = newAssignment.subjectId;
                const subject = old.find((x: any) => x.id == subjectId)
                subject.assignments = subject.assignments.filter(
                  (x: any) => x.id !== newAssignment.id
                );
                subject.assignments.push(newAssignment);
                
                return old;
            });


            // Return a context object with the snapshotted value
            return { previousAssignments };
        },
        onError: async (error, variables, context) => {
            // Rollback on error
            $queryClient.setQueryData(["assignments"], context.previousAssignments);
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["assignments"] });
        },

    })
}