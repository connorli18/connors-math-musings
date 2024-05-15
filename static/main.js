document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var searchBar = document.getElementById('search-bar');
    var searchValue = searchBar.value;

    if (searchValue) {
        window.location.href = '/search?query=' + encodeURIComponent(searchValue);
        searchBar.value = '';
    }
});