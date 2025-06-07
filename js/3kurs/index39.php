<?
	/*	Description:
		
		1) getNews.php?
		2) apiKey=1bc29b36f623ba82aaf6724fd3b16718
		3) &action=getSingleNews
		4) &newsId=1
		
		1) Handler
		2) Author API key
		3) action method
		4) more action info
	*/
	
	// Определение заголовка 
	header('Content-Type: application/json');
	
	
	// Данные для авторизации
	$authKey = '1bc29b36f623ba82aaf6724fd3b16718';
	$getKey = $_GET['apiKey'];
	
	// База данных
	$allNews = [
		1 => [
			'title' => 'В Японии автомобили научились говорить с собаками',
			'description' => 'Потрясающее открытие, теперь собаки лучший друг автомобиля, а не человека',
			'addDate' => date('d.m.Y h:i:s', 1674022523),
		],
		2 => [
			'title' => 'В США готовят потрсяющее шоу',
			'description' => 'Люди всего мира ожидают этого события. Правда пока не ясно, в какой части США будет проходить планируемое событие',
			'addDate' => date('d.m.Y h:i:s', 1674012513),
		],
		13 => [
			'title' => 'Роботы в шоке, люди научились писать программный код',
			'description' => 'Среди роботов ходят слухи, что готовятся восстание человечков. Роботы в страхе.',
			'addDate' => date('d.m.Y h:i:s', 1673002533),
		],
		14 => [
			'title' => 'Штыра научились самы открываться и закрываться',
			'description' => 'Люди совсем обленилсь. Умные дома портят внешний вид человечества. Спасайтесь глупцы!',
			'addDate' => date('d.m.Y h:i:s', 1674002533),
		],
		15 => [
			'title' => 'Штора научились самы открываться и закрываться',
			'description' => 'Люди совсем обленилсь. Умные дома портят внешний вид человечества. Спасайтесь глупцы!',
			'addDate' => date('d.m.Y h:i:s', 1674002533),
		],
		16 => [
			'title' => 'Шторы научились самы открываться и закрываться',
			'description' => 'Люди совсем обленилсь. Умные дома портят внешний вид человечества. Спасайтесь глупцы!',
			'addDate' => date('d.m.Y h:i:s', 1674002533),
		]
	];
	
	// Имитация долгой загрузки
	sleep(1); 

	
	if($getKey == $authKey){
		// Определение метода получения информации
		$action = $_GET['action'];
		
		if($action == 'getAllNews'){
			echo json_encode($allNews);
		}elseif($action == 'getSingleNews'){
			$newsId = (int) $_GET['newsId'];
			
			if($newsId){
				if($allNews[$newsId]){
					echo json_encode($allNews[$newsId]);
				}else{
					http_response_code(404);
				}
			}else{
				// Возвращает ошибку о том, что страница не найдена (не верно указан action)
				http_response_code(400);
			}
		}else{
			// Возвращает ошибку о том, что страница не найдена (не верно указан action)
			http_response_code(400);
		}
	}else{
		// Возвращает ошибку о том, что не авторизован
		http_response_code(401);
	}
?>
