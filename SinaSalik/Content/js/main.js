function favoriekle(baslik, url) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie 8") > -1) {
        external.AddToFavoritesBar(url, baslik, '');
    } else {
        try {
            window.external.addFavorite(url, baslik);
        } catch (e) {
            try {
                window.sidebar.addPanel(baslik, url, '');
            } catch (e) {
                alert("Lütfen Ctrl+D kısayolu ile favorilere eklemeyi deneyin.");
            }
        }
    }
}