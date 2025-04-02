import user from "./user.model.js";
import todo from "./todo-model.js";
import Platform from "./platform.model.js";

user.hasMany(todo, { foreignKey: "userId" });
todo.belongsTo(user, { foreignKey: "userId" });

user.hasMany(todo, { foreignKey: "authorsId", as: "assignedTodos" });
todo.belongsTo(user, { foreignKey: "authorsId", as: "author" });

Platform.hasMany(todo, { foreignKey: "platform", as: "todos" });
todo.belongsTo(Platform, { foreignKey: "platform", as: "platformDetails" });
// todo.belongsTo(user, { as: "assigner", foreignKey: "assignerId" }); // Admin sebagai pemberi tugas
// todo.belongsTo(user, { as: "assignee", foreignKey: "assigneeId" });
export default { user, todo };
