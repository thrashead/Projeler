/* tdCalendar - Developed by Sina SALIK (2004 - 2016) */

(function ($) {
    var isfirsttime = true;
    var selectedDate = new Object();

    var CreateCalendar = function (Item, dateSelect, dateValues) {
        var guid = guid();
        var d;

        if (dateSelect != undefined && dateSelect != "") {
            d = new Date(dateSelect);

            if (d.toString() == "Invalid Date") {
                dateSelect = dateSelect.split('.')[1] + "." + dateSelect.split('.')[0] + "." + dateSelect.split('.')[2];
                d = new Date(dateSelect);
            }
        }
        else {
            d = new Date();
        }

        var current = new Object();

        if (dateValues == undefined) {
            current.Day = d.getDate();
            current.Month = d.getMonth() + 1;
            current.Year = d.getFullYear();
            current.WeekDay = d.getDay();
            var firstWeekDay = returnMonthFirstWeekDay(current) == 0 ? 7 : returnMonthFirstWeekDay(current);
            var februaryDays = returnFebruaryDays(current.Year);
            var monthDaysCount = returnMonthDaysCount(current.Month, current.Year);
        }
        else {
            current = dateValues;
            var firstWeekDay = returnMonthFirstWeekDay(dateValues) == 0 ? 7 : returnMonthFirstWeekDay(dateValues);
            var februaryDays = returnFebruaryDays(dateValues.Year);
            var monthDaysCount = returnMonthDaysCount(dateValues.Month, dateValues.Year);
        }

        createCalendar(Item);

        function guid() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        function createCalendar(item) {
            var calendarText = "tdCalendar" + guid;
            item.wrap("<div id='" + calendarText + "'></div>");
            item.after("<div></div>");
            item.parent("div").addClass("tdCalendar");
            item.next("div").addClass("tdmonth");
            item.next("div").append("<div class='tdconts'></div>");
            item.next("div").children("div.tdconts").append("<a onclick='javascript:;' class='tdprev'>\<</a>");
            item.next("div").children("div.tdconts").append("<div class='tdmonthname'>" + returnMonthName(current.Month) + "</div>");
            item.next("div").children("div.tdconts").append("<a onclick='javascript:;' class='tdnext'>\></a>");
            item.next("div").append("<div class='tdconts'><div class='tdday weekday'>P</div><div class='tdday weekday'>S</div><div class='tdday weekday'>Ç</div><div class='tdday weekday'>P</div><div class='tdday weekday'>C</div><div class='tdday weekday'>C</div><div class='tdday weekday'>P</div></div>");
            item.next("div").attr("data-month", current.Month);
            item.parent("div").attr("data-year", current.Year);

            var j = 1;
            var weekday = 0;
            var startemptydays = 0;

            for (var i = 1; i <= monthDaysCount + firstWeekDay - 1; i++) {
                if (i < firstWeekDay) {
                    item.next("div").append("<div class='tdday inactive'></div>");
                    startemptydays++;
                }
                else {
                    item.next("div").append("<div class='tdday' data-day='" + j.toString() + "'>" + j.toString() + "</div>");
                    j++;
                }
                weekday++;
            }

            weekmod = 7 - (weekday % 7);

            if (weekmod != 7) {
                for (var i = 0; i < weekmod; i++) {
                    item.next("div").append("<div class='tdday inactive'></div>");
                }
            }

            item.next("div").append("<div class='tdconts'>" + current.Year + "</div>");

            if (isfirsttime) {
                item.val(returnDayMonthWithZero(current.Day) + "." + returnDayMonthWithZero(current.Month) + "." + current.Year);

                selectedDate.Day = current.Day;
                selectedDate.Month = current.Month;
                selectedDate.Year = current.Year;

                isfirsttime = false;
            }
            else {
                if (item.next("div.tdmonth").is(":visible") == false) {
                    item.next("div.tdmonth").fadeIn("slow");
                }
            }

            if (current.Month == selectedDate.Month && current.Year == selectedDate.Year) {
                item.next("div").children(".tdday[data-day='" + selectedDate.Day + "']").addClass("selected");
            }

            item.focus(function (event) {
                $(this).next("div.tdmonth").fadeIn("slow");

                var tempMonth = parseInt(item.next("div.tdmonth").attr("data-month"));
                var tempYear = parseInt(item.parent("div").attr("data-year"));

                var selDay = item.val().split('.')[0];
                var selMonth = parseInt(item.val().split('.')[1]);
                var selYear = parseInt(item.val().split('.')[2]);

                if (tempYear > selYear) {
                    do {
                        $(".tdprev").click();
                        tempMonth--;

                        if (tempMonth == 0) {
                            tempMonth = 12;
                            tempYear--;
                        }
                    } while (tempYear != selYear);

                    if (tempMonth > selMonth) {
                        do {
                            $(".tdprev").click();
                            tempMonth--;
                        } while (tempMonth != selMonth);
                    }
                }
                else if (tempYear == selYear) {
                    if (tempMonth > selMonth) {
                        do {
                            $(".tdprev").click();
                            tempMonth--;
                        } while (tempMonth != selMonth);
                    }
                    else if (tempMonth < selMonth) {
                        do {
                            $(".tdnext").click();
                            tempMonth++;
                        } while (tempMonth != selMonth);
                    }
                }
                else if (tempYear < selYear) {
                    do {
                        $(".tdnext").click();
                        tempMonth++;

                        if (tempMonth == 13) {
                            tempMonth = 1;
                            tempYear++;
                        }
                    } while (tempYear != selYear);

                    if (tempMonth < selMonth) {
                        do {
                            $(".tdnext").click();
                            tempMonth++;
                        } while (tempMonth != selMonth);
                    }
                }
            });

            item.keydown(function (event) {
                event.preventDefault();
            });

            $("html").click(function (e) {
                var tdItem = $("#" + calendarText);
                var tdMonthItem = $("#" + calendarText + " .tdmonth");

                if (tdItem.offset() != undefined) {
                    var clickedPosX = e.pageX,
                        clickedPosY = e.pageY;

                    var posX = tdItem.offset().left,
                        posX2 = tdItem.offset().left + tdItem.width(),
                        posY = tdItem.offset().top,
                        posY2 = tdItem.offset().top + tdItem.height();

                    if (clickedPosX < posX || clickedPosY < posY || clickedPosX > posX2 || clickedPosY > posY2) {
                        if (tdMonthItem.offset() != undefined) {
                            clickedPosX = e.pageX,
                                clickedPosY = e.pageY;

                            posX = tdMonthItem.offset().left,
                                posX2 = tdMonthItem.offset().left + tdMonthItem.width(),
                                posY = tdMonthItem.offset().top,
                                posY2 = tdMonthItem.offset().top + tdMonthItem.height();


                            if (clickedPosX < posX || clickedPosY < posY || clickedPosX > posX2 || clickedPosY > posY2) {
                                item.next("div.tdmonth").fadeOut("slow");
                            }
                        }
                    }
                }
            });

            $(".tdnext").click(function () {
                prevMonth = parseInt(item.next("div.tdmonth").attr("data-month"));
                curYear = parseInt(item.parent("div").attr("data-year"));

                var valueDate = new Object();
                valueDate.Day = 1;

                if (prevMonth == 12) {
                    valueDate.Month = 1;
                    valueDate.Year = curYear + 1;
                }
                else {
                    valueDate.Month = prevMonth + 1;
                    valueDate.Year = curYear;
                }

                valueDate.WeekDay = ((7 - weekmod) + 1);

                item.unwrap();
                item.next("div").remove();

                new CreateCalendar(item, "", valueDate);
            });

            $(".tdprev").click(function () {
                nextMonth = parseInt(item.next("div.tdmonth").attr("data-month"));
                curYear = parseInt(item.parent("div").attr("data-year"));

                var valueDate = new Object();
                valueDate.Day = 1;

                if (nextMonth == 1) {
                    valueDate.Month = 12;
                    valueDate.Year = curYear - 1;
                }
                else {
                    valueDate.Month = nextMonth - 1;
                    valueDate.Year = curYear;
                }

                valueDate.WeekDay = 8 - ((returnMonthDaysCount(valueDate.Month, valueDate.Year) - startemptydays) % 7);

                item.unwrap();
                item.next("div").remove();

                new CreateCalendar(item, "", valueDate);
            });

            $(".tdday").click(function () {
                if ($(this).attr("data-day").length > 0) {
                    item.val(returnDayMonthWithZero($(this).attr("data-day")) + "." + returnDayMonthWithZero(current.Month) + "." + current.Year);
                    item.next("div").children(".tdday").removeClass("selected");
                    $(this).addClass("selected");

                    selectedDate.Day = parseInt($(this).attr("data-day"));
                    selectedDate.Month = current.Month;
                    selectedDate.Year = current.Year;

                    item.next("div.tdmonth").fadeOut("slow");
                }
            });
        }

        function returnFebruaryDays(year) {
            if (year % 4 == 1) {
                return 28;
            }
            else {
                return 29;
            }
        }

        function returnMonthFirstWeekDay(date) {
            var daymod = date.Day % 7;
            return (((date.WeekDay + 7) - daymod) + 1) % 7;

        }

        function returnMonthDaysCount(month, year) {
            switch (month) {
                case 1: return 31;
                case 2: return returnFebruaryDays(year);
                case 3: return 31;
                case 4: return 30;
                case 5: return 31;
                case 6: return 30;
                case 7: return 31;
                case 8: return 31;
                case 9: return 30;
                case 10: return 31;
                case 11: return 30;
                case 12: return 31;
                default: return 30;
            }
        }

        function returnMonthName(month) {
            switch (month) {
                case 1: return "Ocak";
                case 2: return "Şubat";
                case 3: return "Mart";
                case 4: return "Nisan";
                case 5: return "Mayıs";
                case 6: return "Haziran";
                case 7: return "Temmuz";
                case 8: return "Ağustos";
                case 9: return "Eylül";
                case 10: return "Ekim";
                case 11: return "Kasım";
                case 12: return "Aralık";
                default: return "";
            }
        }

        function returnDayMonthWithZero(dateVal) {
            if (dateVal < 10) {
                return "0" + dateVal;
            }
            else {
                return dateVal;
            }
        }
    }

    $.fn.tdCalendar = function (dateselect, datevalues) {
        return new CreateCalendar(this, dateselect, datevalues);
    };
})(jQuery);