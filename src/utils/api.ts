export const BaseUrl = () : string => {
    return "https://app-backend-8r74.onrender.com/api/v1/";
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
export const CREATE_POST = "post/create-userpost"