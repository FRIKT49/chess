<script>
    $('#online').on('click', function() {
        searchGame(`<?php echo $userInfo['userName'] ?>`)
        // console.log(`<?php echo $userInfo['userName'] ?>`);
    })



    // console.log(user);
    console.log('./inc/findGame.php?nick=' + name)
    function searchGame(name) {
        console.log('i am searchin game right now');
        setInterval(function() {
            fetch('./inc/findGame.php?nick=' + name)
                .then(res => res.json())
                .then(data => {
                    // обработка ответа, например:
                    if (data.start) {
                        // Игра найдена, можно начинать!
                        console.log('Game found!', data.players);
                        window.location.replace("/?site=game&game="+data.gameFile);
                    } else {
                        // Ждём второго игрока
                        console.log('Waiting for opponent...');
                        console.log(data);
                        
                    }
                });
        }, 500);
        $('.playOnline').css({
            display: 'none'
        })
        const searching = $('<div class="loading">Loading...</div>')
        $('#pPWrap').append(searching)

        // findGame('./inc/findGame.php/?nick=' + name)
        console.log('./inc/findGame.php/');

    }
</script>