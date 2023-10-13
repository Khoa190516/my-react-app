export const BASE_HEROKU_URL = "https://petgarden-f030018191f7.herokuapp.com/api";
export const BASE_LOCAL_URL = "https://localhost:7217/api";

export const ACCOUNT_CONTROLLER = "/account";
export const POST_CONTROLLER = "/post";

export const INSERT = "/insert";
export const UPDATE = "/update";
export const DELETE = "/delete";
export const PROFILE = "/profile";
export const UPDATE_PROFILE = "/update-profile";
export const MY_POST = "/get-posts-by-user";
export const UPLOAD_IMG = "/upload-images";
export const LOGIN = "/login";
export const GET_POST_BY_ID = "/get-by-id?postId=";

export const getPosts = async () => {
    try {
        const res = await fetch(BASE_HEROKU_URL + POST_CONTROLLER);
        if (res.status === 200) {
            var data = await res.json();
            return data;
        }
        return undefined;
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export const getProfile = async (token) => {
    try {
        const res = await fetch(BASE_HEROKU_URL + ACCOUNT_CONTROLLER + PROFILE, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        });

        if (res.status === 200) {
            var data = await res.json();
            return data;
        }
        return undefined
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export const getMyPosts = async (token) => {
    try {
        const res = await fetch(BASE_HEROKU_URL + ACCOUNT_CONTROLLER + MY_POST, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        });
        if (res.status === 200) {
            var data = await res.json()
            return data
        }
        return undefined
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export const uploadImages = async (formData) => {
    try {
        const res = await fetch(BASE_HEROKU_URL + POST_CONTROLLER + UPLOAD_IMG, {
            method: 'POST',
            body: formData,
        });
        if (res.status === 200) {
            const data = await res.json()
            return data
        }
        return undefined
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export const updatePost = async (post, token) => {
    try {
        const res = await fetch(BASE_HEROKU_URL + POST_CONTROLLER + UPDATE, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(post)
        })

        if (res.status === 200) {
            const isUpdated = await res.json();
            return isUpdated;
        }

        return false;
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deletePost = async (deletePost, token) => {
    try{
        const res = await fetch(BASE_HEROKU_URL + POST_CONTROLLER + DELETE, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(deletePost)
        })

        if (res.status === 200) {
            const isDeleted = await res.json();
            return isDeleted;
        }
        return false;
    }catch(error){
        console.log(error)
        return false;
    }
}

export const insertPost = async (newPost, token) => {
    try{
        const resCreate = await fetch(BASE_HEROKU_URL + POST_CONTROLLER + INSERT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify(newPost)
        })

        if (resCreate.status === 200) {
            const isCreated = await resCreate.json();
            return isCreated;
        }
        return false
    }catch(error){
        console.log(error)
        return false
    }
}

export const getPostById = async (postId) => {
    try{
        var res = await fetch(BASE_HEROKU_URL + POST_CONTROLLER + GET_POST_BY_ID + postId);
        if(res.status === 200){
            var data = await res.json();
            return data;
        }
        return undefined;
    }catch(error){
        console.log(error)
        return undefined
    }
}

export const updateProfile = async (profile, token) => {
    try {
        const res = await fetch(BASE_HEROKU_URL + ACCOUNT_CONTROLLER + UPDATE_PROFILE, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(profile)
        })

        if (res.status === 200) {
            const isUpdated = await res.json();
            return isUpdated;
        }

        return false;
    } catch (error) {
        console.log(error)
        return false
    }
}