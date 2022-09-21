import { addNewUser, getUsers, getUserByID, updateUser, deleteUser, isWpUserRequest, isAdminUserRequest, requestAuthToken } from "../controllers/solanaController";


const routes = (app) => {
    app.route("/accounts")
        .post(requestAuthToken)
        
    app.route("/users")
        .get(isAdminUserRequest, getUsers)
        .post(isWpUserRequest, isAdminUserRequest, addNewUser)

    app.route("/users/:userID")
        .get(isAdminUserRequest, getUserByID)
        .put(isAdminUserRequest, updateUser)
        .delete(isAdminUserRequest, deleteUser)
}


export default routes; 