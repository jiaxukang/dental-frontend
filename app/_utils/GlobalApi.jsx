const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'https://dental-backend-mf9e.onrender.com/api',
});

axiosClient.defaults.timeout = 10000;
const getCategory = () => {
    return axiosClient.get('/categories?populate=*');
}

const getSlider = () => {
    return axiosClient.get('/sliders?populate=*');
}

const getProduct = () => {
    return axiosClient.get('/products?populate=*');
}

const getProductByCategory = (categoryName) => {
    return axiosClient.get(`/products?filters[categories][name][$in]=${categoryName}&populate=*`);
}

const registerUser = (username, email, password) => {
    return axiosClient.post('/auth/local/register', {
        username: username,
        email: email,
        password: password
    });
}

const signIn = (email, password) => {
    return axiosClient.post('/auth/local', {
        identifier: email,
        password: password
    });
}

const addToCart = (data, jwt) => {
    return axiosClient.post('/user-carts', data, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}

const getCarts = (userId, jwt) => {

    return axiosClient.get('/user-carts?filters[user_id][$eq]=' + userId + '&[populate][products][populate][images][populate][0]=url', {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }).then(res => {
        const data = res.data.data;
        console.log(data);
        return data.map((item, index) => ({
            name: item.attributes.products?.data[0].attributes.name,
            quantity: item.attributes.quantity,
            amount: item.attributes.amount,
            image: item.attributes.products?.data[0].attributes.images.data[0].attributes.url,
            actualPrice: item.attributes.products?.data[0].attributes.mrp,
            id: item.id,
            product: item.attributes.products?.data[0].id,
            size: item.attributes.size
        }));

    });
}

const deleteCart = (cartId, jwt) => {
    return axiosClient.delete('/user-carts/' + cartId, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}

const createOrder = (data, jwt) => {
    return axiosClient.post('/orders', data, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}

const getOrder = (userId, jwt) => {
    return axiosClient.get('/orders?filters[user_id][$eq]=' + userId + "&populate[orderItemList][populate][product][populate][images]=url", {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }).then(res => {
        const resp = res.data.data;
        return resp.map((item, index) => ({
            id: item.id,
            total_order_amount: item.attributes.total_order_amount,
            orderItemList: item.attributes.orderItemList,
            createdAt: item.attributes.createdAt,
            status: item.attributes.status
        }));
    });
}

export default {
    getCategory,
    getSlider,
    getProduct,
    getProductByCategory,
    registerUser,
    signIn,
    addToCart,
    getCarts,
    deleteCart,
    createOrder,
    getOrder
}