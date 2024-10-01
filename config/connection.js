import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  "postgresql://extraordinariosaber_user:L8JNYnAF59mhp4zitJqkGsSBZAZ1GVlL@dpg-crtmd09u0jms73ah6c50-a/extraordinariosaber"
);

(async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ force: false });
  } catch (error) {
    console.error(error);
  }
})();

export default sequelize;
