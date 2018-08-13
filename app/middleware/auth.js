import Auth from "../plugins/utils/auth";

/**
 * 需要验证用户权限
 */
export default async function ({store, req, res, route, redirect}) {
  if (false === store.state.authenticated) {
    return redirect('/auth/login?type=wechat');
  }
}
