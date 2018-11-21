
import Vue        from 'vue'
import Index      from './Index.vue'

new Vue({
	el: '#index',
	data: {
		shipments: null
	},
	render (createElement) {
		return createElement(Index)
	},
	beforeMount() {
		// parse API url & shipments from incoming json
		let data = JSON.parse(this.$el.dataset.json);
		this.shipments = data.shipments;
		this.apiUrl = data.apiUrl;
	}
})