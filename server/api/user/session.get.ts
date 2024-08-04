export default defineEventHandler(async (event) => {
    const session = await isLoggedIn(event);
});