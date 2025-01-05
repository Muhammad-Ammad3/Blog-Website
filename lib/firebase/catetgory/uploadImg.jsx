// export async function uplaodImage(file){
//     const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
//     const apiKey = process.env.CLOUDINARY_API_KEY;
//     const apiSecret = process.env.CLOUDINARY_API_SECRET;
//     const timeStamp = Math.floor(Date.now() /1000);
//     const signature = generateSignature(timeStamp,apiSecret);

//     const formData = new FormData();
//     formData.append("file",formInfo.get("image"));
//     formData.append("apiKey",apiKey)
//     formData.append("timeStamp",timeStamp)
//     formData.append("signature",signature)

//     const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         {
//             method : "POST",
//             body : formData,
//         }
//     );

//     const data = await response.json();
//     if(response.ok){
//         console.log(data.secure_url);
//     return data,secure_url        
//     }
//     else{
//         console.log("dataErrorMessage====>",data.error.message);
//         return data.error.message;
        
//     }

// }


// function generateSignature(timeStamp,apiSecret){
//     const crypto = require("crypto")
//     const signature = crypto
//     .createHash("sha256")
//     .update(`timeStamp=${timeStamp}${apiSecret}`)
//     .digest("hex")
//     return signature;

// }