import Platform from "../models/platform.model.js";

const addPlatform = async (req, res) => {
  try {
    const { platform } = req.body;
    const platforms = await Platform.findOne({
      where: {
        platform,
      },
    });
    if (platforms)
      return res.status(400).json({
        status: "error",
        message: `Platform ${platforms} already exists`,
      });
    await Platform.create({
      platform,
    });
    return res.status(200).json({
      status: "success",
      message: "Platform Success Added",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

const getPlatform = async (req, res) => {
  const platform = await Platform.findAll();
  if (!platform)
    return res.status(200).json({
      status: "success",
      message: "Platform not be added yet",
    });
  return res.status(200).json({
    status: "success",
    data: platform,
  });
};
export { addPlatform, getPlatform };
