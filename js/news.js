

fetch('./inc/news.php')
    .then(response => response.json())
    .then(data => {
        let i = 0;
        const params = new URLSearchParams(window.location.search);
        const site = params.get('site');
        data.forEach(item => {
            
            const { title, link, image, desc } = item;
            var newsContainer = $('#newsWrapper');
            if(site == 'main'){
               if (i == 8){

                    return;
                }
                
                newsContainer.append(`
                    <div class='newsItem'>
                        <img src='${image}' style='width:100%'><br>
                        <div><a href='${link}'>${title}</a></div>

                    </div>
                `); 
                i++;
            }else{
                newsContainers = $('#newsWrap');
                if(i == 0){
                    newsContainers.append(` 
                        <div class='newsItemsFirst newsItems'>
                            <img src='${image}'><br>
                            <div class="newsTitleFirst"><a href='${link}'>${title}</a></div>

                        </div>
                    `);
                }else{

                    newsContainers.append(` 
                        <div class='newsItemsNorm newsItems'>
                            <div class="NewsText">News</div>
                            <img src='${image}' ><br>
                            <div class="newsTitleNorm">
                                <a href='${link}'>${title}</a>
                                <div class="newsInfo">${desc}</div>
                            </div>
                            
                        </div>
                    `);
                }
                i++;
            }
            
           
        });
        newsContainer.append(`
            <div class='newsItemFooter'>
                <button id="login" type="submit">
                    <div class="loginShadow"></div><span>More News</span>
                </button>
            </div>
        `);
    })
    
 