export default function () {
  const queryClient = vq.useQueryClient();


  return vq.useMutation({
    mutationKey: ["addAssignment"],
    mutationFn: async (newAssignment: Object) => {
      console.log(newAssignment);
      const data = await $fetch("/api/assignments/create", {
        method: "POST",
        body: JSON.stringify(newAssignment),
      });
      return data;
    },
    // optimisticly update local state, allowing for rollback on error
    onMutate: async (newAssignment :any) => {
      await queryClient.cancelQueries({ queryKey: ["assignments"] });

      // Snapshot the previous value
      const previousAssignments = queryClient.getQueryData(["assignments"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["assignments"], (old: any ) => {
        console.log(old);
        const subjectId = newAssignment.subjectId;
        old.find((x: any) => x.id == subjectId).assignments.push(newAssignment);
        return old;
    });

      // Return a context object with the snapshotted value
      return { previousAssignments };
    },
    onError: async (error, variables, context) => {
      // Rollback on error
      //$queryClient.setQueryData(["assignments"], context.previousAssignments);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
}
