const UserController = require("../controllers/user.controller");

module.exports = app => {
    app.get("/api/pets/", UserController.findAllUsers);
    app.get("/api/pets/:id", UserController.findOneSingleUser);
    app.put("/api/pets/update/:id", UserController.updateUser);
    app.post("/api/pets/new", UserController.createNewUser);
    app.delete("/api/pets/delete/:id", UserController.deleteUser);
};