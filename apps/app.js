new Vue({
    el: "#app",
    data: {
        searchTerm: "",
        movies: [],
        currentPage: 1,
        show: false,
        movieDetails: [],
        displayedDetails: [],
        lastClickedMovieId: null
    },
    computed:{
        moviesDetails: function(){
            for(value in moviesDetails){
                console.log(value);
            }

        }
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
                console.log("searchTerm went from "+oldVal+" to "+val)
                this.fetchData()
                this.show = false;
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
        show: function(val,oldVal){
            if (val !== oldVal) {
                console.log("show = "+val);
            }
        }
    }
});
