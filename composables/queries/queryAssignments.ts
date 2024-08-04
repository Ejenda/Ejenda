export default function () {
    return vq.useQuery({
        queryKey: ["assignments"],
        queryFn: async () => {
            const data = await $fetch("/api/assignments/list");
            return data;

        }
    })
}