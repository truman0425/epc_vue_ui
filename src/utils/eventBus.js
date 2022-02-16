import Vue from 'vue'

import App from '../App.vue'
/* export default new vue(); */


export default (Vue) =>{
	 const eventBus = new Vue();
	 
	 Vue.prototype.$bus={
		 $on(...event){
			 eventBus.$on(...event)
		 },
		 $off(...event){
		 	eventBus.$off(...event)
		 },
		 $once(...event){
		 	eventBus.$once(...event)
		 },
		 $emit(...event){
		 	eventBus.$emit(...event)
		 },
		 
	 }
}