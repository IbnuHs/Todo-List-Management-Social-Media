import user from "./user.model.js";
import todo from "./todo-model.js";

user.hasMany(todo, { foreignKey: "userId" });
todo.belongsTo(user, { foreignKey: "userId" });
// console.log("associated");

export default { user, todo };
