//defined urls

export const GET_STORE_PROFILE = 'index/store/profile';

export function getStoreHost(req = null) {
    let host = '';
    if (process.server && req) {
        host = req.headers['host'].split(':')[0];
    } else if (!process.server) {
        host = window.location.hostname;
    }
    console.log("IsServer:", process.server, host);
    return host;
}
