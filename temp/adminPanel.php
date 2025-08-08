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
                                <img src="">
                            </td>
                        </tr>
                            

                        
                    `;
                    let usersBlock = $('#tbody');
                    usersBlock.append(block);
                    $('#usersTable').css({
                        'table-layout': 'fixed'
                    })
                    
                });
            })

    </script>
</body>

</html>
