import { instance } from "./index";

export const getFetchAuthors = async () => {
    const resCatg = await instance.post("/get-authors?candidate_id=2")

    return resCatg.data
}
export const getFetchAddAuthors = async (obj) => {
    const resCatg = await instance.post(`/add-edit-author?candidate_id=2&name=${obj.name}&id=${obj.editingAuthorId ? obj.editingAuthorId : 0}&birthday=${obj.birthday}&surname=${obj.surname}&degree=${obj.degree}`)

    return resCatg.data
}

export const getDeleteAuthor = async (id) => {
    const resCatg = await instance.post(`/delete-author?candidate_id=2&id=${id}`)

    return resCatg.data
}
