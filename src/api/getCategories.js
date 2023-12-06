import { instance } from "./index";

export const getFetchCategories = async () => {
    const resCatg = await instance.post("/get-categories?candidate_id=2")

    return resCatg.data
}
export const getFetchAddCategories = async (obj) => {
    const resCatg = await instance.post(`/add-edit-category?candidate_id=2&name=${obj.name}&id=${obj.editingCategoryId ? obj.editingCategoryId : 0}`)

    return resCatg.data
}

export const getDeleteCategory = async (id) => {
    const resCatg = await instance.post(`/delete-category?candidate_id=2&id=${id}`)

    return resCatg.data
}
