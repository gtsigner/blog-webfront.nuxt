import Vue from 'vue'
import {Api} from './utils/api'
import DayJs from 'dayjs'

Vue.config.productionTip = true;
Vue.config.debug = true;
Vue.use(Api);



Vue.filter('formatDate', (val) => {
  console.log(val);
  return DayJs(val).format('YYYY-MM-DD HH:mm:ss');
});

