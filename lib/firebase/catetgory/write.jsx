import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../../FireBase"
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"


export const createNewCategory = async ({data , image}) => {
    if(!data?.name){
        throw new Error('Name is undefined')
    }
    if(!data?.slug){
        throw new Error('Slug is undefined')
    }
    if(!image){
        throw new Error('Image is not selected')
    }

    const imageRef = ref(storage , `categories/${data?.slug}.png`)
    await uploadBytes(imageRef ,image)
    const imageURL = await getDownloadURL(imageRef)

    const fireStoreRef = doc(db,  `categories/${data?.slug}`)
    await setDoc(fireStoreRef, {
        ...data,
        id : data?.slug,
        iconURL : imageURL,
        timeStamp : Timestamp.now,

    });
}

export const updateCategory = async ({data , image}) => {
    if(!data?.name){
        throw new Error('Name is undefined')
    }
    if(!data?.slug){
        throw new Error('Slug is undefined')
    }
    let imageURL = data?.iconURL
    if(image){
        const imageRef = ref(storage , `categories/${data?.slug}.png`)
        await uploadBytes(imageRef ,image)
        imageURL = await getDownloadURL(imageRef)
     
    }


    const fireStoreRef = doc(db,  `categories/${data?.id}`)
    await updateDoc(fireStoreRef, {
        ...data,
        iconURL : imageURL,
        timeStamp : Timestamp.now,

    });
}