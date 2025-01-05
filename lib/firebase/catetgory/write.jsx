// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { db, storage } from "../../FireBase";
// import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";

// const uploadImage = async (slug, image) => {
//     const imageRef = ref(storage, `categories/${slug}.png`);
//     console.log(`Uploading image for ${slug}...`);
//     try {
//         const uploadResult = await uploadBytes(imageRef, image);
//         console.log(`Image uploaded successfully, file path: ${uploadResult.ref.fullPath}`);
//         const imageURL = await getDownloadURL(imageRef);
//         console.log(`Image URL: ${imageURL}`);
//         return imageURL;
//     } catch (error) {
//         console.error("Image upload failed: ", error);
//         throw new Error("Image upload failed: " + error.message);
//     }
// };


// export const createNewCategory = async ({ data, image }) => {
//     console.log("Creating new category:", data);

//     if (!data?.name) {
//         throw new Error("Name is undefined");
//     }
//     if (!data?.slug) {
//         throw new Error("Slug is undefined");
//     }
//     if (!image) {
//         throw new Error("Image is not selected");
//     }

//     try {
//         const imageURL = await uploadImage(data.slug, image);

//         const fireStoreRef = doc(db, `categories/${data.slug}`);
//         await setDoc(fireStoreRef, {
//             ...data,
//             id: data.slug,
//             iconURL: imageURL,
//             timeStamp: Timestamp.now(),
//         });

//         console.log("Category created successfully:", data.slug);
//     } catch (error) {
//         console.error("Error creating category:", error);
//         throw new Error("Error creating category: " + error.message);
//     }
// };

// export const updateCategory = async ({ data, image }) => {
//     console.log("Updating category:", data);

//     if (!data?.name) {
//         throw new Error("Name is undefined");
//     }
//     if (!data?.slug) {
//         throw new Error("Slug is undefined");
//     }

//     let imageURL = data?.iconURL;

//     try {
//         if (image) {
//             console.log("New image provided, uploading...");
//             imageURL = await uploadImage(data.slug, image);
//         }

//         const fireStoreRef = doc(db, `categories/${data.slug}`);
//         await updateDoc(fireStoreRef, {
//             ...data,
//             iconURL: imageURL,
//             timeStamp: Timestamp.now(),
//         });

//         console.log("Category updated successfully:", data.slug);
//     } catch (error) {
//         console.error("Error updating category:", error);
//         throw new Error("Error updating category: " + error.message);
//     }
// };

import { db } from "../../FireBase";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
// import { createNewCategory, updateCategory } from "./path/to/your/cloudinaryUploadCode";

export async function uploadImageToCloudinary(image) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const timeStamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(timeStamp, apiSecret);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("timestamp", timeStamp);
    formData.append("signature", signature);
    formData.append("apiKey",apiKey)


    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await response.json();
    if (response.ok) {
        console.log(data.secure_url);
        return data.secure_url;
    } else {
        console.log("dataErrorMessage====>", data.error.message);
        throw new Error("Image upload failed: " + data.error.message);
    }
}

function generateSignature(timeStamp, apiSecret) {
    const crypto = require("crypto");
    const signature = crypto
        .createHash("sha256")
        .update(`timestamp=${timeStamp}${apiSecret}`)
        .digest("hex");
    return signature;
}

const uploadImage = async (slug, image) => {
    console.log(`Uploading image for ${slug} to Cloudinary...`);
    try {
        const imageURL = await uploadImageToCloudinary(image);
        console.log(`Image uploaded successfully, URL: ${imageURL}`);
        return imageURL;
    } catch (error) {
        console.log("Image upload failed: ", error);
        throw new Error("Image upload failed: " + error.message);
    }
};

export const createNewCategory = async ({ data, image }) => {
    console.log("Creating new category:", data);

    if (!data?.name) {
        throw new Error("Name is undefined");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }
    if (!image) {
        throw new Error("Image is not selected");
    }

    try {
        const imageURL = await uploadImage(data.slug, image);

        const fireStoreRef = doc(db, `categories/${data.slug}`);
        await setDoc(fireStoreRef, {
            ...data,
            id: data.slug,
            iconURL: imageURL,
            timeStamp: Timestamp.now(),
        });

        console.log("Category created successfully:", data.slug);
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Error creating category: " + error.message);
    }
};

export const updateCategory = async ({ data, image }) => {
    console.log("Updating category:", data);

    if (!data?.name) {
        throw new Error("Name is undefined");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }

    let imageURL = data?.iconURL;

    try {
        if (image) {
            console.log("New image provided, uploading to Cloudinary...");
            imageURL = await uploadImage(data.slug, image);
        }

        const fireStoreRef = doc(db, `categories/${data.slug}`);
        await updateDoc(fireStoreRef, {
            ...data,
            iconURL: imageURL,
            timeStamp: Timestamp.now(),
        });

        console.log("Category updated successfully:", data.slug);
    } catch (error) {
        console.error("Error updating category:", error);
        throw new Error("Error updating category: " + error.message);
    }
};
