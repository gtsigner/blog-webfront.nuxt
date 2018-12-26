import * as types from '../store/mutation-types'
/**
 * 需要验证用户权限
 */
export default async function (context) {
    const { store, req, res, route, redirect } = context;
    let accessToken = null;
    //传递Cookies到客户端
    const isServer = process.server;
    if (isServer) {
        const accessToken = req.context.cookies.get('access_token');
        //获取cookie中的access_token
        store.commit(types.SET_ACCESS_TOKEN, accessToken);
    }
}
