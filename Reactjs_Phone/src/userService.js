import { orderBy } from "lodash";
import axios from "./axios"

const handleLoginApi = (userName, userPassword) => {
    return axios.post('/api/login', { taikhoan: userName, password: userPassword });
}

const getAllUser = (inputId) => {
    //teamplate String
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUseService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    //return axios.delete('/api/delete-user',{id:userId})
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)

}


// goi api cua products

const getAllProducts = (inputId, idne,idbrand, selectedPriceRange, orderBy) => {
    // Template String
    return axios.get(`api/get-all-products?id=${inputId}&idCate=${idne}&idBrand=${idbrand}&price=${selectedPriceRange}&orderBy=${orderBy}`);
}

const getDeltaiProduct = (inputId) => {
    //teamplate String
    return axios.get(`/api/get-deltai-product?id=${inputId}`)
}


const CreateProducts = (data) => {
    return axios.post('/api/create-new-products', data)
}
const deleteProducts = (productId) => {

    return axios.delete('/api/delete-products', {
        data: {
            id: productId
        }
    })
}
const updateProductData = (inputData) => {
    return axios.put('/api/edit-products', inputData)

}

// cua categories

const CreateCategories = (data) => {
    return axios.post('/api/create-new-categories', data)
}
const deleteCategories = (productId) => {

        return axios.delete('/api/delete-categories', {
            data: {
                id: productId
            }
        })
    }
    // lay tat ca loai san pham
const getAllCategories = (inputType) => {
    return axios.get(`/api/get-all-categories?id=${inputType}`)
}

const updateCategoriesData = (inputData) => {
    return axios.put('/api/edit-categories', inputData)

}

// api cua  orders 
const getAllOders = (inputType) => {
    return axios.get(`/api/get-all-orders?id=${inputType}`)
}

const Layhoadon = (inputType) => {
    return axios.get(`/api/get-lay-hoa-don?id=${inputType}`)
}
const CreateOrders = (data) => {
    return axios.post('/api/create-new-orders', data)
}

const deleteOrders = (productId) => {

    return axios.delete('/api/delete-orders', {
        data: {
            id: productId
        }
    })
}

const updateorderData = (inputData) => {
    return axios.put('/api/edit-orders', inputData)

}


// api cua  orders 
const getAllSale = (inputType) => {
    return axios.get(`/api/get-all-sale?id=${inputType}`)
}
const CreateSale = (data) => {
    return axios.post('/api/create-new-sale', data)
}

const deleteSale = (productId) => {

    return axios.delete('/api/delete-sale', {
        data: {
            id: productId
        }
    })
}

const updateSaleData = (inputData) => {
    return axios.put('/api/edit-sale', inputData)

}


 // call api cua brand 

const CreateBrand = (data) => {
    return axios.post('/api/create-new-brand', data)
}
const deleteBrand = (productId) => {

        return axios.delete('/api/delete-brand', {
            data: {
                id: productId
            }
        })
    }
    // lay tat ca loai san pham
const getAllBrand = (inputType) => {
    return axios.get(`/api/get-all-brand?id=${inputType}`)
}

const updateBrandData = (inputData) => {
    return axios.put('/api/edit-brand', inputData)

}









const CreateCart = (data) => {
    return axios.post('/api/create-new-cart', data)
}
const deleteCart = (productId) => {

        return axios.delete('/api/delete-cart', {
            data: {
                id: productId
            }
        })
    }

const getAllCart = (inputType) => {
    return axios.get(`/api/get-all-cart?id=${inputType}`)
}

const updateCartData = (inputData) => {
    return axios.put('/api/edit-cart', inputData)

}





const CreateOrderdetail = (data) => {
    return axios.post('/api/create-new-Orderdetail', data)
}
const deleteOrderdetail = (productId) => {

        return axios.delete('/api/delete-Orderdetail', {
            data: {
                id: productId
            }
        })
    }

const getAllOrderdetail = (inputType) => {
    return axios.get(`/api/get-all-Orderdetail?id=${inputType}`)
}

const updateOrderdetailData = (inputData) => {
    return axios.put('/api/edit-Orderdetail', inputData)

}



const locdonhang = (id,createdAt,order_status) => {
    // Template String
    return axios.get(`/api/loc-don-hang?id=${id}&createdAt=${createdAt}&order_status=${order_status}`);
}




export {
    handleLoginApi,
    getAllUser,
    createNewUseService,
    deleteUserService,
    editUserService,
    getAllProducts,
    getDeltaiProduct,
    CreateProducts,
    deleteProducts,
    updateProductData,
    CreateCategories,
    deleteCategories,
    getAllCategories,
    updateCategoriesData,
    getAllOders,
    Layhoadon,
    deleteOrders,
    CreateOrders,
    updateorderData,
    getAllSale,
    CreateSale,
    deleteSale,
    updateSaleData,
    CreateBrand,
    deleteBrand,
    getAllBrand,
    updateBrandData,
    CreateCart,
    deleteCart,
    getAllCart,
    updateCartData,
    CreateOrderdetail,
    deleteOrderdetail,
    getAllOrderdetail,
    updateOrderdetailData,
    locdonhang
    



}