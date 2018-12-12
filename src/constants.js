export const UserApi = "http://localhost:8081/user" //#
export const UserAdd = "/create"  //#
export const GetAllUsers = "/getall" //''
export const GetUser = "/get/" //''
export const DeleteUser = "/delete/"
export const UserDeleteCv = "/deleteUserAccount/{userId}"
export const UserUpdateCv = "/{userId}/{userName}/{password}"

export const AdminApi = "http://localhost:8084/admin" //#
export const GetAllAdmins = "/getall" //#
export const GetAdmin = "/get/" //#
export const AdminAddAdmin = "/create" //#
export const AdminDeleteAdmin = "/delete/" //#
export const AdminUpdateAdmin = "/delete/{id}" //#
export const AdminFlagUser = "/flagUser/"

export const CommentApi = "/Comment"
export const CommentAdd = "/addComment"
export const GetAllComments = "/getAllComments"
export const GetComment = "/getComment/{commentId}"
export const UpdateComment = "/{commentId}/{adminId}/{userId}/{cvId}"
export const DeleteComment = "/deleteComment/{commentId}"

export const CvApi = "/CV"
export const CvAdd = "/uploadCV/{userId}"
export const CvGet = "/downloadFile/{cvId}"
export const CvDelete = "/deleteCV/{cvId}"
