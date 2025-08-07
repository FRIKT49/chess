<?php
$html = file_get_contents('https://www.chess.com/news');
$newsList = [];

if (preg_match_all('/<article class="post-preview-component.*?<\/article>/is', $html, $articles)) {
    foreach ($articles[0] as $article) {


        preg_match('/<a[^>]*class="[^"]*post-preview-title[^"]*"[^>]*href="([^"]+)"/i', $article, $linkMatch);
        $link = $linkMatch[1] ?? '';
        if ($link && !str_starts_with($link, 'http')) {
            $link = 'https://www.chess.com' . $link;
        }

        preg_match('/<a[^>]*class="[^"]*post-preview-title[^"]*"[^>]*>(.*?)<\/a>/is', $article, $titleMatch);
        $title = trim(strip_tags($titleMatch[1] ?? ''));

        $img = '';
        if (preg_match('/<img[^>]*class="[^"]*post-preview-thumbnail[^"]*"[^>]*data-src="([^"]+)"/i', $article, $imgMatch)) {
            $img = $imgMatch[1];
        } elseif (preg_match('/<img[^>]*class="[^"]*post-preview-thumbnail[^"]*"[^>]*srcset="([^"]+)"/i', $article, $imgMatch)) {
            $img = preg_split('/\s+/', $imgMatch[1])[0]; 
        } elseif (preg_match('/<img[^>]*class="[^"]*post-preview-thumbnail[^"]*"[^>]*src="([^"]+)"/i', $article, $imgMatch)) {
            $img = $imgMatch[1];
        }

        preg_match('/<p class="post-preview-excerpt">(.*?)<\/p>/is', $article, $descMatch);
        $desc = trim(strip_tags($descMatch[1] ?? ''));

        $newsList[] = [
            'title' => $title,
            'link'  => $link,
            'image' => $img,
            'desc'  => $desc
        ];
    }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($newsList, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
