export default function () {
    const queryClient = vq.useQueryClient();
  return vq.useMutation({
    mutationKey: ["deleteSubject"],
    mutationFn: async (id: string) => {
      const data = await $fetch("/api/subjects/delete", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      return data;
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["assignments"] });
        useToast().add({
            title: "Subject Deleted",
            description: "The subject and associated assignments were successfully deleted",
        });
    },
  });
}
