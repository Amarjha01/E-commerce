const url = `https://api.cloudinary.com/v1_1/dbnticsz8/image/upload`

const uploadImages = async (image) => {
    const formdata = new FormData()
    formdata.append('file', image);
    formdata.append('upload_preset', 'mern_product')
const dataResponse = await fetch(url,{
    method: 'POST',
    body: formdata

})
return dataResponse.json()
}

export default uploadImages