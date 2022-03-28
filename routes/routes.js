const HomeRoute =require("./HomeRoute")
const LoginRoute =require("./LoginRoute")
const RegisterRoute =require("./RegisterRoute")

module.exports = async function(server){

    server.use(HomeRoute.path, HomeRoute.router)
    server.use(LoginRoute.path, LoginRoute.router)
    server.use(RegisterRoute.path, RegisterRoute.router)


}