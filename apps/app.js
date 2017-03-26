new Vue({
    el: "#app",
    data: {
        searchTerm: "",
        movies: [],
        currentPage: 1

    },
    created() {
        //this.fetchData()
    },
    methods: {
        fetchData() {
            this.$http.get('http://www.omdbapi.com/?s=' + this.searchTerm + '&page='+this.currentPage+'&r=json')
                .then(result => {
                    this.movies = result.data
                })
        },
    },
    watch: {
        searchTerm: function(val, oldVal){
            if (val !== oldVal) {
                console.log("searchTerm went from "+oldVal+" to "+val)
                this.fetchData()
            }
        },
        currentPage: function(val, oldVal){
            if (val !== oldVal) {
                if(val == 0){
                    this.currentPage = 1;
                }
                console.log("Current page went from "+oldVal+" to "+val)
                this.fetchData()
            }
        },

    }
});
