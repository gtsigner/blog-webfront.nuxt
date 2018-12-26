export default function (context) {
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent;
    const { store, redirect, route } = context;
    const url = route.fullPath;
    if (false === store.state.authenticated) {
        return redirect('/passport/login?type=wechat&url=' + url);
    }
}
