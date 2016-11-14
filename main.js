window.onload = function(){
    var app = new Vue({
      el: '#app',
      data: {
        agents: agents
    },
    methods: {
        addChieftain: function(event) {
            agents.push(new Chieftain)
        },
        addGatherer: function(event) {
            agents.push(new Gatherer)
        }
    }
})
}