new Vue({
    el: "#app",
    data: {
        searchTerm: "",
        movies: [],
        currentPage: 1,
        show: false,
        movieDetails: [],
        lastClickedMovieId: null
    },
    methods: {
        fetchData() {
            console.log('http://www.omdbapi.com/?s=' + this.searchTerm + '&page='+this.currentPage+'&r=json')
            this.$http.get('http://www.omdbapi.com/?s=' + this.searchTerm + '&page='+this.currentPage+'&r=json')
                .then(result => {
                    this.movies = result.data
                })
        },
        displayDetails(movieId){
            this.$http.get('http://www.omdbapi.com/?i='+movieId)
            .then(result => {
                this.movieDetails = result.data;
                this.verifyIfDetailsAreShown(movieId);
            })
        },
        verifyIfDetailsAreShown(movieId){
            if (movieId !== this.lastClickedMovieId || this.show == false) {
                this.lastClickedMovieId = movieId;
                this.show = true;
            }else{
                this.show = false;
            }
        }
    },
    watch: {
        searchTerm: function(val, oldVal){
            if (val !== oldVal) {
                console.log("searchTerm changed from "+oldVal+" to "+val)
                this.fetchData()
                this.show = false;
            }
        },
        currentPage: function(val, oldVal){
            if (val !== oldVal) {
                if(val == 0){
                    this.currentPage = 1;
                }
                console.log("Current page changed from "+oldVal+" to "+val)
                this.fetchData()
                this.show = false;
            }
        },
        show: function(val,oldVal){
            if (val !== oldVal) {
                console.log("show = "+val);
            }
        }
    }
});
