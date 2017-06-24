(function musicDb(){

    this.init = function(){
        this.search();
    };

    this.search = function(){
        var form = document.querySelector('#form');

        form.addEventListener("submit",function(e){
            e.preventDefault();
            var value = document.querySelector('#input_search').value;
            form.reset();

            getData(value.split(' ').join("+"));
        });
    };


    //  http://is3.mzstatic.com/image/thumb/Music/v4/8c/64/61/8c6461e2-0712-d9c1-f1d9-87efaefd440f/source/100x100bb.jpg

    this.getData = function(artist){
        var http = new XMLHttpRequest();
        var url = "https://itunes.apple.com/search?term="+ artist +"&entity=album";
        var method = "GET";

        var container = document.querySelector('#album_list_container');
        container.innerHTML = '';

        http.open(method,url);
        http.onreadystatechange = function(){

            if(http.readyState === XMLHttpRequest.DONE && http.status === 200){
                showArtists(JSON.parse(http.response));
            }else if(http.readyState === XMLHttpRequest.DONE &&  http.status !== 200){
                //
            }
        };
        http.send();
    };

    this.showArtists = function(obj){
        var container = document.querySelector('#album_list_container');
        var template = '';

        if(obj.results.length > 0){

            document.querySelector('#not_match').style.display = 'none';

            for(var i = 0 ; i < obj.results.length; i++){
                template += '<div class="col-sm-3 album_item">';
                template +=     '<div class="item_thmb" style="background:url('+ obj.results[i].artworkUrl100 + ')"></div>';
                template +=     '<div class="item_title">' + obj.results[i].collectionName + '</div>';
                template +=     '<div class="item_price"><span>Price: </span>' + obj.results[i].collectionPrice + 'USD </div>';
                template +=     '<a href="'+ obj.results[i].collectionViewUrl +'" target="_blank">Buy now</a>';
                template += '</div>';
            }

            container.innerHTML = '';
            container.insertAdjacentHTML('afterbegin', template);
        } else{
            document.querySelector('#not_match').style.display = 'block';
        }
    };


    this.init();
})();


