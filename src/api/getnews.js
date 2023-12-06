import { instance } from "./index";

export const getFetchNews = async () => {
    const resCatg = await instance.post("/get-all-news?candidate_id=2")

    return resCatg.data
}
export const getFetchAddNews = async (obj) => {
    const bodyObj = {
        id: obj.editingNewsId ? obj.editingNewsId:0,
        title: obj.title,
        description: obj.description,
        author_id: Number(obj.author),
        category_id: Number(obj.category),
        cover: obj.coverImage && obj.coverImage,
    }

    console.log(bodyObj.cover,bodyObj.author_id,bodyObj.category_id,bodyObj.date,bodyObj.id);

    const resCatg = await instance.post(`/add-edit-news?candidate_id=2&date=${obj.formattedCurrentDate}`,bodyObj)

    return resCatg.data
}

export const getDeleteNews= async (id) => {
    const resCatg = await instance.post(`/delete-news?candidate_id=2&id=${id}`)

    return resCatg.data
}
