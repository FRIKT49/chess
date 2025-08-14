<?
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Параметры - ASDChess</title>
    <link rel="stylesheet" href="./styles/bootstrap.min.css">
    <link rel="stylesheet" href="./styles/settings.css">
    <link rel="stylesheet" href="./styles/adminPanel.css">

    <script src="./js/jquery.min.js"></script> 
    <script src="./js/functions.js"></script>
    
</head>

<body>
    <div id="wrap">
        <div class="wrapH1"><span>Welcome to Admin Panel! </span> </div>
        <a href="javascript:window.history.back();"><button id="return" type="button" class="btn btn-secondary">Return</button></a>
        <div id="users">
            <table id = usersTable>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>email</td>
                        <td>password</td>
                        <td>regData</td>
                        <td>isAdm</td>
                        <td>rating</td>
                        <td>WTD</td>
                    </tr>
                </thead>
                <tbody id='tbody'>

                </tbody>
            </table>
        </div>
    </div>
    
    <script>
        fetch('./inc/adminPanelUsers.php?users=all&api=abcdefg12345')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.forEach(userInfo =>{
                    let data = new Date((userInfo['regData'])*1000);
                    data = data.toLocaleDateString()
                    let block = `

                        <tr>
                            <td class="id">${userInfo['id']}</td>
                            <td class="name">${userInfo['name']}</td>
                            <td class="email">${userInfo['email']}</td>
                            <td class="pass">${userInfo['pass']}</td>
                            <td class="regData">${data}</td>
                            <td class="isAdm">${userInfo['isAdm']}</td>
                            <td class="rating">${userInfo['rating']}</td>
                            <td class="WTD">
                                <img src="./img/trash-can.svg">
                            </td>
                        </tr>
                            

                        
                    `;
                    let usersBlock = $('#tbody');
                    usersBlock.append(block);
                    $('#usersTable').css({
                        'table-layout': 'fixed'
                    })
                    
                });
                $('#usersTable').on('click', '.WTD img', function () {
                    
                    const tr = $(this).closest('tr');
                    let id = tr.find('.id').text();
                    if (confirm(`Are you sure you want to delete user with id ${id}?`)) {
                        fetch(`./inc/adminPanelUsers.php?users=delete&id=${id}&api=abcdefg12345`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.status === 'success') {
                                    error('success','User deleted successfully',e);
                                    tr.remove();
                                } else {
                                    error('error','Error deleting user',e);
                                }
                            });
                    }
                });
                $('#usersTable').on('click', '.name', function () {

                    if ($(this).find('input').length) return;

                    const td = $(this);
                    const tr = td.closest('tr');
                    let id = tr.find('.id').text();
                    let nameValue = td.text().trim();


                    const oldHtml = td.html();

                    td.html(`
                        <input type="text" id="nameInput" value="${nameValue}" style="width: 80px;">
                        <button id="saveName" class="btn btn-success btn-sm">Ok</button>
                        <button id="cancelName" class="btn btn-secondary btn-sm">Отмена</button>
                    `);


                    td.find('#nameInput').focus();


                    td.find('#saveName').on('click', function (e) {
                        let val = td.find('#nameInput').val();
                        const rusCaseRegex = /[А-яа-я]/;
                        const specialCharRegex = /[@#$%&*!]/;
                        if(val.length >4 && val.length < 20 && !rusCaseRegex.test(val) && !specialCharRegex.test(val)&& nameValue != val){
                            fetch(`./inc/nameChange.php?nick=${val}&id=${id}`)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.success) {
                                        td.text(val);
                                        error('success', 'Name changed successfully', e);
                                    } else {
                                        error('error', 'Error changing name', e);
                                    }
                                });

                        }else{
                            error('danger', 'Invalid name. It should be between 4 and 20 characters long, contain no Cyrillic letters or special characters, and must be different from the current name.', e);
                        }


                    });

                    td.find('#cancelName').on('click', function () {
                        td.html(nameValue);
                    });


                    td.find('#nameInput').on('keydown', function(e) {
                        if (e.key === 'Enter') {
                            td.find('#saveName').click();
                        }
                        if (e.key === 'Escape') {
                            td.find('#cancelName').click();
                        }
                    });
                });
                $('#usersTable').on('click', '.email', function () {

                    if ($(this).find('input').length) return;

                    const td = $(this);
                    const tr = td.closest('tr');
                    let id = tr.find('.id').text();
                    let nameValue = td.text().trim();


                    const oldHtml = td.html();

                    td.html(`
                        <input type="text" id="nameInput" value="${nameValue}" style="width: 280px;">
                        <button id="saveName" class="btn btn-success btn-sm">Ok</button>
                        <button id="cancelName" class="btn btn-secondary btn-sm">Отмена</button>
                    `);


                    td.find('#nameInput').focus();


                    td.find('#saveName').on('click', function (e) {
                        let val = td.find('#nameInput').val();
                        const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                        if(emailValidator.test(val) && nameValue != val){
                            fetch(`./inc/adminPanelUsers.php?users=email&id=${id}&email=${val}&api=abcdefg12345`)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.success) {
                                        td.text(val);
                                        error('success', 'Email changed successfully', e);
                                    } else {
                                        error('error', 'Error changing email', e);
                                    }
                                });

                        }else{
                            error('danger', 'Invalid name. It should be between 4 and 20 characters long, contain no Cyrillic letters or special characters, and must be different from the current name.', e);
                        }


                    });

                    td.find('#cancelName').on('click', function () {
                        td.html(nameValue);
                    });


                    td.find('#nameInput').on('keydown', function(e) {
                        if (e.key === 'Enter') {
                            td.find('#saveName').click();
                        }
                        if (e.key === 'Escape') {
                            td.find('#cancelName').click();
                        }
                    });
                });
            })

    </script>
</body>

</html>
