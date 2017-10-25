import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import App from './components/App.vue'
import './font-awesome-4.7.0/css/font-awesome.min.css';

new Vue({
  store, // inject store to all children
  el: '#app',
  render: h => h(App)
});
