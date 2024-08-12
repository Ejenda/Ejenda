///import KSUID from "ksuid";

import { date } from "drizzle-orm/mysql-core";

export default function () {
    const queryClient = vq.useQueryClient();
    return vq.useMutation({
        mutationKey: ["createSubject"],
        mutationFn: async (newSubject: Object) => {
            console.log(newSubject);
            const data = await $fetch("/api/subjects/create", {
                method: "POST",
                body: JSON.stringify(newSubject),
            });
            return data;
        },
        // optimisticly update local state, allowing for rollback on error
        onMutate: async (newSubject: any) => {
            await queryClient.cancelQueries({ queryKey: ["assignments"] });
            // Snapshot the previous value
            const previousSubjects = queryClient.getQueryData(["assignments"]);
            // Optimistically update to the new value
            queryClient.setQueryData(["assignments"], (old: any) => {
              console.log(old);
              old.push({
                id: `subj_${Date.now()}`,
                name: newSubject.name,
                assignments: [],
              });
              return old;
            });
            // Return a context object with the snapshotted value
            return { previousSubjects };
        },
        onError: async (error, variables, context) => {
            // Rollback on error
            queryClient.setQueryData(["assignments"], context?.previousSubjects);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["assignments"] });
            useToast().add({
                title: "Subject Added",
                description: "The subject was successfully added",
            });
        },
    });
}