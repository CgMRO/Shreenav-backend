const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dy2ldvugb",
  api_key: "698577857267321",
  api_secret: "N90CJ_oa2rKz0PAR41o35qZZi_g",
  secure: true,
});

export const uploadImage = async (photo: any) => {
  try {
    const result = await cloudinary.uploader.upload(photo, {
      allowed_formats: ["jpg", "png", "webp"],
      public_id: "",
      folder: "cgcms",
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};
