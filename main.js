import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import ElementUI from 'element-ui'
import './node_modules/element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.axios = Axios
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
