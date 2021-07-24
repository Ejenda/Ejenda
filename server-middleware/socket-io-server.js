 // This file is executed once when the server is started

 // Setup a socket.io server on port 3001 that has CORS disabled (do not set this to port 3000 as port 3000 is where the nuxt dev server serves your nuxt application)
 const io = require("socket.io")(3001, {
    cors: {
        origin: "https://3000-magenta-bug-vtlh0jiq.ws-us11.gitpod.io/",
        methods: ["GET", "POST"],
        credentials: false
      }
    
});
io.on("connection", (socket)=> {
    socket.emit('hi','hello')
})
function handler(){

}
// Since we are a serverMiddleware, we have to return a handler, even if this it does nothing
export default {unload, handler}
function unload() {
    io.close();
}






