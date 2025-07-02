<script>
        $('#fileInput').on('change', function () {
        var file = this.files[0];
        if (file && file.type.startsWith('image/')) {
            // Удаляем предыдущий avatarCut, если есть
            $('#avatarCut').remove();

            // Создаём HTML с выбранной картинкой
            const imgURL = URL.createObjectURL(file);
            $('body').append(`
                <div id="avatarCut" >
                    <div style="background:#fff;position:relative;">
                        <div id="avatarС" >
                            <img src="${imgURL}" alt="Avatar Image" style="max-width:500px;max-height:500px;">
                            <div id="selectSquare"></div>
                        </div>
                        <div id="avatarControls" style="margin-top:10px;text-align:center;">
                            <button id="saveAvatar">Сохранить</button>
                            <button id="cancelAvatar">Отмена</button>
                        </div>
                    </div>
                </div>
            `);

            const $avatar = $('#avatarС');
            const $img = $('#avatarС img');
            const $cut = $('#selectSquare');
            const cutSize = 200;



            $avatar.on('mousemove', function (e) {
                $cut.show();
                const offset = $avatar.offset();
                let x = e.pageX - offset.left - cutSize / 2;
                let y = e.pageY - offset.top - cutSize / 2;
                x = Math.max(0, Math.min(x, $avatar.width() - cutSize));
                y = Math.max(0, Math.min(y, $avatar.height() - cutSize));


                $cut.css({
                    left: x + 'px',
                    top: y + 'px',
                    width: cutSize + 'px',
                    height: cutSize + 'px'
                });
            });

            $avatar.on('mouseleave', function () {
                $cut.hide();
            });
            var imgUrl;
            var isClicked = false;

            $avatar.on('click', function (e) {
                const offset = $avatar.offset();
                let x = e.pageX - offset.left - cutSize / 2;
                let y = e.pageY - offset.top - cutSize / 2;
                x = Math.max(0, Math.min(x, $avatar.width() - cutSize));
                y = Math.max(0, Math.min(y, $avatar.height() - cutSize));

                const canvas = document.createElement('canvas');
                canvas.width = cutSize;
                canvas.height = cutSize;
                const ctx = canvas.getContext('2d');
                const img = $img[0];


                const scaleX = img.naturalWidth / $avatar.width();
                const scaleY = img.naturalHeight / $avatar.height();

                ctx.drawImage(
                    img,
                    x * scaleX, y * scaleY, cutSize * scaleX, cutSize * scaleY,
                    0, 0, cutSize, cutSize
                );

                const dataURL = canvas.toDataURL('image/png');

                $(img).attr('src', dataURL);
                $cut.hide();
                imgUrl = dataURL;
                isClicked = true;

            });




            $('#cancelAvatar').on('click', function () {
                $('#avatarCut').remove();
                $('#fileInput').val('');
                isClicked = false;
            });


            $('#saveAvatar').on('click', function () {
                console.log(<?=SessionFunc::getUserId()?>);
                
                if (isClicked) {
                    $('#avatar img').attr('src', imgUrl);
                    $('#avatarCut').remove();
                    fetch('/inc/avatar.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            avatar: imgUrl,
                            id: <?=SessionFunc::getUserId()?>
                        })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Ошибка при сохранении аватара');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Аватар успешно сохранен:', data);
                    })
                    .catch(error => {
                        console.error('Ошибка при сохранении аватара:', error);
                    });
                } else {
                    $('#fileInput').val('');
                }


            });

        } else {
            alert('Выберите файл-изображение!');
            this.value = '';
        }
    });
</script>
