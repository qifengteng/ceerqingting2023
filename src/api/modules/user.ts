import http from "../index";
import { PORT1 } from "../config/servicePort";
import { User, ResPage } from "../interface";

// 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
    return http.post<ResPage<User.ResUserList>>(PORT1 + `/user/list`, params);
};

// 获取用户性别字典
export const getUserGender = () => {
    return http.get<User.ResGender[]>(PORT1 + `/user/gender`);
};

// 获取用户状态字典
export const getUserStatus = () => {
    return http.get<User.ResStetus>(PORT1 + `/user/status`);
};

// 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
    return http.post(PORT1 + `/user/change`, params);
};
