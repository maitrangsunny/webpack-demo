import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchProduct = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        payload: products
    }
}

export const actFetchProductRequestAPI = () => {
    return (dispatch)=>{
        return callApi('products','GET',null).then(res=>{
            dispatch(actFetchProduct(res.data));
        })
    }
}
//local
export const actDeleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}
//api server
export const actDeleteProductRequestApi = (id) => {
    return (dispatch) => {
        return callApi(`products/${id}`, 'DELETE', null).then(res=>{
            console.log(res);
            dispatch(actDeleteProduct(id))
        })
    }
}

export const actAddProduct = (product) => {
    return {
        type : Types.ADD_PRODUCT,
        product
    }

}

export const actAddProducRequestApi = (product) => {
    return (dispatch) => {
        return callApi("products","POST",product).then(res=>{
            dispatch(actAddProduct(res.data));
        })
    }
}

export const actEditProduct = (product) =>{
    return {
        type: Types.EDIT_PRODUCT,
        product
    }
}

export const actEditProductRequestApi = (id) => {
    return (dispatch)=>{
        return callApi(`products/${id}`,'GET',null).then(res=>{
            dispatch(actEditProduct(res.data))
        })
    }
}

export const actUpdateProduct = (product) =>{
    console.log(product);
    return {
        type: Types.UPDATE_PRODUCT,
        product
    }
}

export const actUpdateProductRequestApi = (product) => {
    return (dispatch)=>{
        return callApi(`products/${product.id}`,'PUT',product).then(res=>{
            dispatch(actUpdateProduct(res.data))
        })
    }
}