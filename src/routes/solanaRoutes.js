import { addNewUser, getUsers, getUserByID, updateUser, deleteUser, verifyPlugin } from "../controllers/solanaController";


const routes = (app) => {
    app.route("/users")
        .get(verifyPlugin, getUsers)
        .post(verifyPlugin, addNewUser)

    app.route("/users/:userID")
        .get(verifyPlugin, getUserByID)
        .put(verifyPlugin, updateUser)
        .delete(verifyPlugin, deleteUser)
}


export default routes; 