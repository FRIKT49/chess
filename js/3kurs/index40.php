<html>
	<head>
		<meta charset="UTF-8" />
		<title>Тема урока: Знакомство с AJAX запросами. XMLHttpRequest и API</title>
		<style>
			body{
				background-color:#333;
				color:white;
				padding:25px;
			}


			#newsWrap{
				border:2px solid red;
				margin:10px;
				padding:15px 15px 5px 15px;
			}


			.newsBox{
				border:3px solid orange;
				padding:5px;
				margin-bottom:10px;
			}


			.newsTitle{
				border:1px solid orange;
				padding:5px;
				margin-bottom:10px;
				font-size:21px;
			}


			.newsDescr{
				border:1px solid yellow;
				padding:5px;
			}
		</style>
	</head>
	
	<body>
		<h2>Новости сайта</h2> <button onclick="request()" id="updateNewsBtn">Загрузить новости</button>
		
		<div id="newsWrap"></div>
		
		<script type="text/javascript">

			var url = '/index39.php?apiKey=1bc29b36f623ba82aaf6724fd3b16718&action=getAllNews';
			
			async function request() {
				
				let response = await fetch(url);
				
				if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }else if (response.status == 200){
					let data = await response.json();
					if(data){
						let newsWrap = document.getElementById('newsWrap');
                        newsWrap.innerHTML = '';
						console.log(data);
						
                        for(item in data){
							console.log(data[item]);
							
							newsWrap.innerHTML += template(data[item]['title'],data[item]['description'],data[item]['addDate']);
						}
                           
                        
					}
					
				}
			}
			

			function template(title, description, date){
				return `
					<div class="newsBox">
						<div class="newsTitle">${title}</div>
						<div class="newsDescr">${description}<div>${date}</div></div>
					</div>
				`;
			}
			
		</script>
	</body>
</html> 
