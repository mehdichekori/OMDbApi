new Vue({
    el: "#app",
    data: {
        searchTerm: "",
        movies: [],
        currentPage: 1,
        show: false,
        movieDetails: []
    },
    created() {
        //this.fetchData()
    },
    methods: {
        fetchData() {
            console.log('http://www.omdbapi.com/?s=' + this.searchTerm + '&page='+this.currentPage+'&r=json')
            this.$http.get('http://www.omdbapi.com/?s=' + this.searchTerm + '&page='+this.currentPage+'&r=json')
                .then(result => {
                    this.movies = result.data
                    console.log(this.movies)
                })
        },
        displayDetails(movieId){
            this.$http.get('http://www.omdbapi.com/?i='+movieId)
            .then(result => {
                this.movieDetails = result.data;
                //this.show = !this.show;
                console.log(this.movieDetails)
            })
        }
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
        // movieDetails: function(val,oldVal){
        //     if (val !== oldVal) {
        //         console.log(val);
        //     }
        // },
        show: function(val,oldVal){
            if (val !== oldVal) {
                console.log("show = "+val);
            }
        }
    }
});
