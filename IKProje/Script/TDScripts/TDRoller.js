function TDRoller(direction, ulitem) {
    if (direction == "next" || direction == "prev") {
        var ulitemml = parseInt(ulitem.css("margin-left"));
        var pnwitdth = ulitem.children("li").first().width();

        if (direction == "next") {
            if (ulitemml != (-4 * pnwitdth)) {
                ulitem.animate({
                    "margin-left": "-=" + pnwitdth.toString() + "px"
                }, 100);
            }
            else {
                ulitem.animate({
                    "margin-left": "+=" + (4 * pnwitdth).toString() + "px"
                }, 100);
            }
        }
        else if (direction == "prev") {
            if (ulitemml != 0) {
                ulitem.animate({
                    "margin-left": "+=" + pnwitdth.toString() + "px"
                }, 100);
            }
            else {
                ulitem.animate({
                    "margin-left": "-=" + (4 * pnwitdth).toString() + "px"
                }, 100);
            }
        }
    }
    else if (direction == "up" || direction == "down") {
        var ulitemmt = parseInt(ulitem.css("margin-top"));
        var pnheight = ulitem.children("li").first().height();

        if (direction == "up") {
            if (ulitemmt != (-4 * pnheight)) {
                ulitem.animate({
                    "margin-top": "-=" + pnheight.toString() + "px"
                }, 100);
            }
            else {
                ulitem.animate({
                    "margin-top": "+=" + (4 * pnheight).toString() + "px"
                }, 100);
            }
        }
        else if (direction == "down") {
            if (ulitemmt != 0) {
                ulitem.animate({
                    "margin-top": "+=" + pnheight.toString() + "px"
                }, 100);
            }
            else {
                ulitem.animate({
                    "margin-top": "-=" + (4 * pnheight).toString() + "px"
                }, 100);
            }
        }
    }
}