export const BaseUrl = () : string => {
    return "http://3.101.12.130:5000/api/v1/";
}

export const SignUpUrl = () : string => {
    return BaseUrl() + "auth/signup";
}

export const SignInUrl = () : string => {
    return BaseUrl() + "auth/login";
}

export const CreateUserPostUrl = () : string => {
    return BaseUrl() + "post/create-userpost";
}

export const GetUserPostById = () : string => {
    return BaseUrl() + "post/get-userpost-byUserId";
}

export const UpdateUserPostById = () : string => {
    return BaseUrl() + "post/get-userpost-byUserId";
}

export const deleteUserPost = () : string => {
    return BaseUrl() + "post/delete-userpost-byPostId";
}

export const GetAllPost = () : string => {
    return BaseUrl() + "post/get-all-post";
}

export const SIGN_IN = "auth/login";
export const GET_ALL_POST = "post/get-all-post";
export const POST_LIKE_POST = "post/create-like";
export const CREATE_POST = "api/v1/post/create-userpost"
export const BASE_URL = ' https://strengthholdings.com/'
export const RENDER_URL = ' https://strengthholdings.com/'
export const LIVE_URL = RENDER_URL;
export const IS_RENDER_URL = false;
export const CREATE_REPLY_URL = LIVE_URL + '/api/v1/post/'