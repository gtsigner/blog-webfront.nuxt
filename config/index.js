const isDev = (process.env.NODE_ENV !== 'production');
import cDev from './config.dev'
import cProd from './config.pro'

let configs = {
  dev: isDev
};
if (isDev) {
  configs = Object.assign(configs, cDev);
} else {
  configs = Object.assign(configs, cProd);
}
export default configs;
