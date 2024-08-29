export default function () {
    return vq.useQuery({
      queryKey: ["assignments"],
      queryFn: async () => {
        const { data } = await useFetch("/api/assignments/list");
        return data;
      },
    });
}