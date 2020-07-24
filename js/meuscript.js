//var nomeCanal = 'oloopinfinito';
var nomeCanal = 'backtotriangle';
var upload_id;
$(document).ready(function(){
    // alert("1");  para testar a conexao
    $.get("https://www.googleapis.com/youtube/v3/channels",{
            part: 'contentDetails',
            forUsername: nomeCanal,
            key: 'AIzaSyD-56SpKJZH2Hf51YDKsGzrbmBL4QVnyos'},

            function (data) {  
                // console.log(data.items[0].contentDetails.relatedPlaylists.uploads);
                upload_id = data.items[0].contentDetails.relatedPlaylists.uploads;
                pegarVideos(upload_id)
                }
        )

    function pegarVideos(id) {
        // console.log(id)  testa id
         $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
             part: 'snippet',
             maxResults:12,
             playlistId: id,
             key: 'AIzaSyD-56SpKJZH2Hf51YDKsGzrbmBL4QVnyos'},

             function (data) {
                // console.log(data);
                var imagem, arquivo;

                 $.each(data.items, function(i, item) {
                    imagem      = item.snippet.thumbnails.medium.url;
                    titulo      = item.snippet.title;
                    //descricao   = item.snippet.description;
                    publicado   = formatarData(item.snippet.publishedAt);
                    videoId     = item.snippet.resourceId.videoId;
                    arquivo = '<li class="principal"> <a class="fancybox-media" href="https://www.youtube.com/watch?v='+ videoId + '"><div class="foto"><img src="'+ imagem + '"/><div class="legenda"><h5>'+titulo+'</h5><p>'+ publicado +'</p></div></div></a></li>';
                    $('div#janela ul').append(arquivo);
                 });
             }
         )
    }

    function formatarData(data){
        return data.substr(8,2) + '/' + data.substr(5,2) + '/' + data.substr(0,4);
    }
});

