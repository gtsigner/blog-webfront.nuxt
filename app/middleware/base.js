/**
 * 需要验证用户权限
 */
export default async function ({ store, req, res, route, redirect }) {
  let accessToken = null;
  //传递Cookies到客户端
  console.log("AccessToken:", store.state.accessToken);
}
