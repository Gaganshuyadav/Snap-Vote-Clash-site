const mimeTypeList = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/webp"
];
export const imageValidator = (mimeType, size) => {
    //size should be lesser than 2mb
    if ((size / (1024 * 1024)) > 2) {
        return { valid: false, message: "Image size should be lesser than 2MB" };
    }
    //mime type check
    if (!mimeTypeList.includes(mimeType)) {
        return { valid: false, message: "Image format should be png, jpg, jpeg, gif, webp" };
    }
    return { valid: true, message: "valid image" };
};
