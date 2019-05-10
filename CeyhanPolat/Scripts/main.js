$(function () {
    $(document).on("click", ".showreviews", function () {
        if ($(".reviews").is(":visible")) {
            $(".reviews").fadeOut("slow");
        }
        else {
            $(".reviews").fadeIn("slow");
        }
    });

    $(document).on("click", ".closereviews", function () {
        $(".reviews").fadeOut("slow");
    });

    $(document).on("click", ".addreview", function () {
        if ($(".sendreview").is(":visible")) {
            $(".sendreview").fadeOut("slow");
        }
        else {
            $(".sendreview").fadeIn("slow");
        }
    });

    $(document).on("click", ".closesendreview", function () {
        $(".sendreview").fadeOut("slow");
    });

    $(document).on("mouseover", ".menu .container ul li a", function () {
        $(this).animate({
            'color': '#C65378'
        }, '300');
    }).on("mouseleave", ".menu .container ul li a", function () {
        $(this).animate({
            'color': '#fff'
        }, '300');
    });

    $(document).on("mouseenter", "#siirliste li", function () {
        $(this).children("a").css("color", "#000!important");
    }).on("mouseleave", "#siirliste li", function () {
        $(this).children("a").css("color", "");
    });
});

$(document).ready(function () {
    $.datepicker.regional['tr'] = {
        closeText: 'kapat',
        prevText: 'geri',
        nextText: 'ileri',
        currentText: 'bugün',
        monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
            'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
        dayNamesShort: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
        dayNamesMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
        weekHeader: 'Hf',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['tr']);
});