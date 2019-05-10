/* tdTable - Developed by Sina SALIK (2004 - 2016)
    
   Kullanım :
   (Aşağıdaki conditions özelliğine ait alt özelliklerin serialize edilen sınıfın özelliği olarak karşılıkları olması gerekir JavaScriptSerializer için mesela.
   Bu özelliklerin webmethod tarafı isimleri yanlarına [Özellik İsmi, Özellik Türü] şeklinde tanımlanmıştır.
   Burada Fields özelliğini dönen veri List<ClassAdı> şeklinde değişken olacağından C#'ta dynamic yapmak en mantıklısı.)
   
   $("#dataTable").tdTable(
   {
       listmethod: "http://siteadi.com/Ajax/List", //(Tablonun veri döndüğü ajax method linki yazılır. WebMethod List<SınıfAdı> olarak veri dönmelidir)
       deletemethod: "http://siteadi.com/Ajax/Delete", //(İlgili satıra ait verinin silinmesi için çalışacak ajax method linki yazılır. Boolean olarak veri döner)
       datatype: "Categories", //(Tablo türü yazılır. C# tarafında tabloya list şeklinde dönen sınıf ismi.)
       title: "Son Veriler", //(Tablo başlığı yazılır.)
       showtitle: true, //(Tablo başlığının yazılıp yazılmaması seçeneği.)
       showheader: true, //(Header kısmının gösterilip gösterilmemesi seçeneği.)
       showfooter: true, //(Footer kısmının gösterilip gösterilmemesi seçeneği.)
       showcommands: true, //(İşlemler (Detay, Ekle, Düzenle, Sil gibi komut bölümlerinin gösterilip gösterilmemesi seçeneği.)
       showsearchfield: true, //(Arama kutusunun gösterilip gösterilmemesi seçeneği.)
       showpager: true, //(Sayfalama kısmının gösterilip gösterilmemesi seçeneği.)
       enablesorting: true, //(Tablo üzerinde sıralamada değişikliğe izin verilip verilmemesi seçeneği.)
       itemperpage: 10,  //(Tablonun her sayfasında kaçar eleman olduğu yazılır.)
       tablewidth: "", //(Tablonun boyutu. Yoksa css'ten alır.)
       cssclass: "", //(Tabloya özel css sınıfı eklenebilir.)
       theme: "red", //(Tabloya sınıf ismi olarak tema ekler. varsayılanı red yani kırmızıdır. Hazırda red, blue ve purple var.)
       paramname: "conditions", //(.cs tarafında webmethoda gönderilen serialize edilecek parametrenin ismidir. Varsayılanı "conditions" olarak belirlenmiştir. Siz .cs tarafında farklı bir parametre ismi kullanıyorsunuz onu belirtebilirsiniz.)
       conditions: {   //Listelenecek verilerin belli başlı şartlarını tutan nesnedir. C# tarafında listmethod'a gönderilen "conditions" parametresi deserialize edilirken bu nesneye ait aşağıdaki isimlerdeki özelliklere sahip bir sınıf türünde nesneye deserialize edilmelidir. Bu sayede C# tarafında bu verilerle filtrelemeleri yapabilirsiniz. Bu özelliklerin kontrolünü C# tarafında siz yapacağınız için verdiğiniz değerleri kontrol etmediğiniz sürece hiçbir anlam ifade etmeyecektir.
           SearchText: "", //(Aranacak kelime atanır. Varsayılanı boştur.) C# Özelliği -> [SearchText, string]
           OrderBy: "", //(Tablo hangi alan adına göre sıralanacaksa yazılır.) C# Özelliği -> [OrderBy, string]
           OrderDirection: "Asc", //(Tablo hangi yönde sıralanacaksa yazılır.) C# Özelliği -> [OrderDirection, string]
           Top: 0,  //(Select cümlesindeki top özelliği veya mysql deki limit özelliği. Varsayılanı 0'dır.) C# Özelliği -> [Top, int]
           Fields: {   //(Burada tabloda bulunan alanlar gerçek tablodaki aynı adları ile yazılır ve sadece yazılanlar tabloda gösterilir.) C# Özelliği -> [Fields, dynamic]
               ID: {
                   Title: "ID",  //(Tabloda gösterilen alanın başlığı)
                   Width: "40px",  //(Tabloda gösterilen alanın genişliği)
                   CssClass: "first",  //(İlgili alana ve headerına class ekler. Boşsa eklemez. Standart olarak sırasıyla ilk dört kolon için first, second, third ve fourth eklenebilir. hazır responsive tanımlanmıştır. özel classta tanımlanabilir.)
                   Show: false,   //(Alan gizlenmek istenirse eklenir. Normalde alan yazılmazsa zaten gösterilmez getiripte gösterilmek istenmiyorsa kullanılır. Özellikle commands özelliğindeki AddLink, UpdateLink ve DeleteLink gibi linklere parametre yollanırken parametre mecbur getirilen fieldlerden olmalı ama gösterilmek zorunda değil.)
                   ActiveText: "<img src=" + ImagePath + "/true.png />",  //(Alan bool ve true ise gösterilecek resim yada text yazılır)
                   PassiveText: "Pasif"  //(Alan bool ve false ise gösterilecek resim yada text yazılır)
               },
               DataName: {
                   Title: "Kategori Adı",
                   Width: "120px"
               },
               Active: {
                   Title: "Aktif",
                   Width: "80px"
               }
           },
       },
       commands: {   //(Tablodaki komut (Detay, Ekle, Düzenle ve Sil) linklerini, link textlerini ve gösterilip gösterilmeyeceğini atar. Boş kalırsa defaultları var.)
           DetailText: "Detay", //Detay butonunda yazacak metin.
           DetailLink: "javascript:;", //(Link bir route yada parametre olabilir. item-detail-{Kolon İsmi} veya detail.aspx?id={Kolon İsmi} şeklinde tanımlanabilir. Burada Kolon İsmi'ne ID yazarsanız linki o şekilde ekleyecektir veya köşeli parantezli ifadeyi belirtmezseniz direk o şekilde çalışır.)
           ShowDetailLink: true,  //(Showlarda default gösterir. false dersen göstermez.)
           
           AddText: "Ekle", //Ekle butonunda yazacak metin.
           AddLink: "javascript:;", //(Link bir route yada parametre olabilir. item-add-{Kolon İsmi} veya add.aspx?id={Kolon İsmi} şeklinde tanımlanabilir. Burada Kolon İsmi'ne ID yazarsanız linki o şekilde ekleyecektir veya köşeli parantezli ifadeyi belirtmezseniz direk o şekilde çalışır.)
           ShowAddLink: true,  //(Showlarda default gösterir. false dersen göstermez.)
           
           UpdateText: "Düzenle", //Düzenle butonunda yazacak metin.
           UpdateLink: "javascript:;", //(Link bir route yada parametre olabilir. item-update-{Kolon İsmi} veya update.aspx?id={Kolon İsmi} şeklinde tanımlanabilir. Burada Kolon İsmi'ne ID yazarsanız linki o şekilde ekleyecektir veya köşeli parantezli ifadeyi belirtmezseniz direk o şekilde çalışır.)
           ShowUpdateLink: true,  //(Showlarda default gösterir. false dersen göstermez.)
           
           DeleteText: "Sil", //Sil butonunda yazacak metin.
           DeleteLink: "javascript:;", //(Link bir route yada parametre olabilir. item-delete-{Kolon İsmi} veya delete.aspx?id={Kolon İsmi} şeklinde tanımlanabilir. Burada Kolon İsmi'ne ID yazarsanız linki o şekilde ekleyecektir veya köşeli parantezli ifadeyi belirtmezseniz direk o şekilde çalışır.)
           ShowDeleteLink: false  //(Showlarda default gösterir. false dersen göstermez.)
       }
   });
*/

(function ($) {
    var CreateTable = function (item, tableOptions) {
        var TInfo = new Object();
        var TOpt = tableOptions != undefined ? tableOptions : {
            listmethod: "",
            deletemethod: "",
            datatype: "",
            title: "Tablo Adı",
            showtitle: true,
            showheader: true,
            showfooter: true,
            showcommands: true,
            showsearchfield: true,
            showpager: true,
            enablesorting: true,
            itemperpage: 10,
            tablewidth: "",
            cssclass: "",
            theme: "red",
            paramname: "conditions",
            guid: guid(),
            conditions: {
                SearchText: "",
                OrderBy: "",
                OrderDirection: "Asc",
                Top: 0,
                Fields: {}
            },
            commands: {
                DetailText: "Detay", DetailLink: "javascript:;", ShowDetailLink: true,
                AddText: "Ekle", AddLink: "javascript:;", ShowAddLink: true,
                UpdateText: "Düzenle", UpdateLink: "javascript:;", ShowUpdateLink: true,
                DeleteText: "Sil", DeleteLink: "javascript:;", ShowDeleteLink: true
            }
        }

        checkOptionValues(TOpt);

        checkConditions(TOpt.conditions);

        fillTableInfo(TInfo, TOpt);

        fillBlankPages(TOpt.commands);

        writeTable(item, TInfo, TOpt);

        function checkOptionValues(tOpt) {
            tOpt.listmethod = tOpt.listmethod == undefined ? "" : tOpt.listmethod;
            tOpt.deletemethod = tOpt.deletemethod == undefined ? "" : tOpt.deletemethod;
            tOpt.datatype = tOpt.datatype == undefined ? "" : tOpt.datatype;
            tOpt.title = tOpt.title == undefined ? "Tablo Adı" : tOpt.title;
            tOpt.showtitle = tOpt.showtitle == undefined ? true : tOpt.showtitle;
            tOpt.showheader = tOpt.showheader == undefined ? true : tOpt.showheader;
            tOpt.showfooter = tOpt.showfooter == undefined ? true : tOpt.showfooter;
            tOpt.showcommands = tOpt.showcommands == undefined ? true : tOpt.showcommands;
            tOpt.showsearchfield = tOpt.showsearchfield == undefined ? true : tOpt.showsearchfield;
            tOpt.showpager = tOpt.showpager == undefined ? true : tOpt.showpager;
            tOpt.enablesorting = tOpt.enablesorting == undefined ? true : tOpt.enablesorting;
            tOpt.itemperpage = tOpt.itemperpage == undefined ? 10 : tOpt.itemperpage;
            tOpt.tablewidth = tOpt.tablewidth == undefined ? "" : tOpt.tablewidth;
            tOpt.cssclass = tOpt.cssclass == undefined ? "" : tOpt.cssclass;
            tOpt.theme = tOpt.theme == undefined ? "red" : tOpt.theme;
            tOpt.paramname = tOpt.paramname == undefined ? "conditions" : tOpt.paramname;
            tOpt.guid = tOpt.guid == undefined ? guid() : tOpt.guid;
            tOpt.conditions = tOpt.conditions == undefined ? {} : tOpt.conditions;
            tOpt.commands = tOpt.commands == undefined ? {
                DetailText: "Detay", DetailLink: "javascript:;", ShowDetailLink: true,
                AddText: "Ekle", AddLink: "javascript:;", ShowAddLink: true,
                UpdateText: "Düzenle", UpdateLink: "javascript:;", ShowUpdateLink: true,
                DeleteText: "Sil", DeleteLink: "javascript:;", ShowDeleteLink: true
            } : tOpt.commands;
        }

        function guid() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        function checkConditions(conditions) {
            conditions.SearchText = conditions == undefined ? "" : conditions.SearchText == undefined ? "" : conditions.SearchText;
            conditions.OrderBy = conditions == undefined ? "" : conditions.OrderBy == undefined ? "" : conditions.OrderBy;
            conditions.OrderDirection = conditions == undefined ? "Asc" : conditions.OrderDirection == undefined ? "Asc" : conditions.OrderDirection;
            conditions.Top = conditions == undefined ? 0 : conditions.Top == undefined ? 0 : conditions.Top;
            conditions.Fields = conditions == undefined ? {} : conditions.Fields == undefined ? {} : conditions.Fields
        }

        function fillTableInfo(infoItem, tOpt) {
            infoItem.SearchText = tOpt.conditions.SearchText;
            infoItem.OrderBy = tOpt.conditions.OrderBy;
            infoItem.OrderDirection = tOpt.conditions.OrderDirection;
            infoItem.Top = tOpt.conditions.Top;

            fillBlankFields(tOpt.conditions.Fields);
            infoItem.Fields = tOpt.conditions.Fields;
        }

        function fillBlankPages(commands) {
            if (commands.DetailLink == undefined) {
                commands.DetailLink = "javascript:;";
            }

            if (commands.AddLink == undefined) {
                commands.AddLink = "javascript:;";
            }

            if (commands.UpdateLink == undefined) {
                commands.UpdateLink = "javascript:;";
            }

            if (commands.DeleteLink == undefined) {
                commands.DeleteLink = "javascript:;";
            }

            if (commands.DetailText == undefined) {
                commands.DetailText = "Detay";
            }

            if (commands.AddText == undefined) {
                commands.AddText = "Ekle";
            }

            if (commands.UpdateText == undefined) {
                commands.UpdateText = "Düzenle";
            }

            if (commands.DeleteText == undefined) {
                commands.DeleteText = "Sil";
            }

            if (commands.ShowDetailLink == undefined) {
                commands.ShowDetailLink = true;
            }

            if (commands.ShowAddLink == undefined) {
                commands.ShowAddLink = true;
            }

            if (commands.ShowUpdateLink == undefined) {
                commands.ShowUpdateLink = true;
            }

            if (commands.ShowDeleteLink == undefined) {
                commands.ShowDeleteLink = true;
            }
        }

        function fillBlankFields(fields) {
            $.each(fields, function (i, data) {
                if (data.Title == undefined) {
                    data.Title = "";
                }
                if (data.Width == undefined) {
                    data.Width = "";
                }
                if (data.CssClass == undefined) {
                    data.CssClass = "";
                }
                if (data.Show == undefined) {
                    data.Show = true;
                }
                if (data.ActiveText == undefined) {
                    data.ActiveText = "<div class=true></div>";
                }
                if (data.PassiveText == undefined) {
                    data.PassiveText = "<div class=false></div>";
                }
            });
        }

        function writeTable(tItem, tInfo, tOptions) {
            tItem.prev("h1").remove();
            if (tOptions.showtitle == true) {
                tItem.before("<h1 class=\"tdTableheader " + tOptions.theme + "\">" + tOptions.title + "</h1>");
            }

            tItem.css("width", tOptions.tablewidth);
            tItem.addClass("tdTable");
            tItem.addClass(tOptions.cssclass);
            tItem.addClass(tOptions.theme);
            tItem.html("<div class=\"tdLoader\"></div>");

            $.ajax({
                type: "POST",
                url: tOptions.listmethod,
                data: "{ " + tOptions.paramname + ": '" + JSON.stringify(tInfo) + "' }",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (answer) {
                    var returnData;

                    if (answer.d == undefined) {
                        returnData = answer;
                    }
                    else {
                        returnData = answer.d;
                    }

                    tItem.html("");
                    var _returnItem = "";

                    if (tOptions.showheader == true) {
                        /* Header Kısmı */
                        var twidth = tOptions.tablewidth == "" ? "" : " style=\"width:" + tOptions.tablewidth + "px;\"";

                        _returnItem += "<div class=\"row title\"" + twidth + ">";

                        var _arrow = "";

                        if (tOptions.enablesorting == true) {
                            var _arrow = tOptions.conditions.OrderDirection == "Asc" ? "uparrow" : "downarrow";
                            tOptions.conditions.OrderDirection = tOptions.conditions.OrderDirection == "Asc" ? "Desc" : "Asc";
                        }

                        var field = JSON.parse(JSON.stringify(tOptions.conditions.Fields));

                        $.each(Object.keys(field), function (index, key) {
                            var _tempItem = "";
                            var fieldOption = JSON.parse(JSON.stringify(field[key]));

                            fieldOption.CssClass = $.trim(fieldOption.CssClass) == "" ? "" : " " + fieldOption.CssClass;
                            fieldOption.Width = fieldOption.Width == "" ? "" : " style=\"width:" + fieldOption.Width + ";\"";

                            var disappear = "";
                            if (fieldOption.Show == false) {
                                disappear = " disappear";
                            }

                            if (tOptions.conditions.OrderBy == key && tOptions.enablesorting == true) {
                                _tempItem += "<a href=\"javascript:;\" class=\"cell" + fieldOption.CssClass + "" + disappear + "\"" + fieldOption.Width + " data-sorter=\"" + key + "\" data-sorter-dir=\"" + tOptions.conditions.OrderDirection + "\">" + fieldOption.Title + " <div class=\"" + _arrow + "\"></div></a>";
                            }
                            else {
                                _tempItem += "<a href=\"javascript:;\" class=\"cell" + fieldOption.CssClass + "" + disappear + "\"" + fieldOption.Width + " data-sorter=\"" + key + "\" data-sorter-dir=\"Asc\">" + fieldOption.Title + "</a>";
                            }

                            _returnItem += _tempItem;
                        });

                        if (tOptions.showcommands == true) {
                            _returnItem += "<div class=\"cell command\">İşlemler</div>";
                        }

                        _returnItem += "</div>";

                        tItem.append(_returnItem);

                        _returnItem = "";
                    }
                    /* Header Kısmı */

                    var totalpage = 1;

                    if (returnData != null) {
                        var _idValue = "";

                        var totalcount = returnData.length;
                        var counter = 0;
                        var pagecount = 0;
                        var currentpage = 1;
                        var modResult = totalcount % tOptions.itemperpage;

                        if (modResult > 0)
                            totalpage = ((totalcount - modResult) / tOptions.itemperpage) + 1;
                        else
                            totalpage = (totalcount / tOptions.itemperpage);

                        /* Data Rowları */

                        $(returnData).each(function (crap, data) {
                            if (counter % tOptions.itemperpage == 0)
                                pagecount++;

                            var displayrow = "";

                            if (pagecount == 1)
                                displayrow = " display:block;";
                            else
                                displayrow = " display:none;";

                            var alternateRow = "";
                            if (counter % 2 == 1) {
                                alternateRow = " alernate";
                            }

                            counter++;

                            var field = JSON.parse(JSON.stringify(tOptions.conditions.Fields));

                            var tempwidth = tOptions.tablewidth == "" ? " style=\"" : " style=\"width:" + tOptions.tablewidth + "px;";

                            var _tempItem = "<div class=\"row" + alternateRow + "\"" + tempwidth + "" + displayrow + "\" data-page=\"" + pagecount + "\">";

                            var dataid = "";
                            var dataidlink = tOptions.commands.UpdateLink;
                            if (dataidlink.indexOf('{') > -1 && dataidlink.indexOf('}') > -1) {
                                dataidlinkParamName = dataidlink.substr(dataidlink.indexOf('{'));
                                dataidlinkParamName = dataidlinkParamName.split('}')[0].replace("{", "");
                                if (data[dataidlinkParamName] != undefined) {
                                    dataid = data[dataidlinkParamName].toString();
                                }
                                else {
                                    dataid = "";
                                }
                            }
                            else {
                                dataid = "";
                            }

                            if (dataid != "") {
                                dataid = "data-id=\"" + dataid + "\"";
                            }

                            $.each(Object.keys(field), function (index, key) {
                                //key ID, CategoryName gibi isimleri
                                //kolon[key] Buda alt fieldlarını çeker
                                //data[key] Buda içeriğini çeker
                                //kolon.CategoryName.Title  kolon özelliklerine ulaşırsın

                                var fieldOption = JSON.parse(JSON.stringify(field[key]));

                                fieldOption.CssClass = $.trim(fieldOption.CssClass) == "" ? "" : " " + fieldOption.CssClass;
                                fieldOption.Width = fieldOption.Width == "" ? "" : " style=\"width:" + fieldOption.Width + ";\"";

                                if (data[key] != null) {
                                    data[key] = data[key].toString().toLowerCase() == "true" ? fieldOption.ActiveText : data[key];
                                    data[key] = data[key].toString().toLowerCase() == "false" ? fieldOption.PassiveText : data[key];

                                    if (data[key].toString().indexOf("Date(") > -1 && data[key].toString().lastIndexOf(")") == (data[key].toString().length - 2)) {
                                        var months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
                                        var date = new Date(parseInt(data[key].toString().substr(6)));

                                        data[key] = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
                                        data[key] = data[key] == "1.0.1" ? "Tanımlanmamış" : data[key];
                                    }
                                }
                                else {
                                    data[key] = "Tanımlanmamış";
                                }

                                var disappear = "";
                                if (fieldOption.Show == false) {
                                    disappear = " disappear";
                                }

                                _tempItem += "<div " + dataid + " class=\"cell" + fieldOption.CssClass + "" + disappear + "\"" + fieldOption.Width + ">" + data[key] + "</div>";
                            });

                            if (tOptions.showcommands == true) {
                                var dtLink = tOptions.commands.DetailLink;
                                var uLink = tOptions.commands.UpdateLink;
                                var dLink = tOptions.commands.DeleteLink;
                                var dtLinkParamName = dtLink;
                                var uLinkParamName = uLink;
                                var dLinkParamName = dLink;

                                if (dtLink.indexOf('{') > -1 && dtLink.indexOf('}') > -1) {
                                    dtLinkParamName = dtLink.substr(dtLink.indexOf('{'));
                                    dtLinkParamName = dtLinkParamName.split('}')[0].replace("{", "");
                                    if (data[dtLinkParamName] != undefined) {
                                        dtLink = dtLink.replace("{" + dtLinkParamName + "}", data[dtLinkParamName].toString());
                                        _idValue = data[dtLinkParamName].toString();
                                    }
                                }

                                if (uLink.indexOf('{') > -1 && uLink.indexOf('}') > -1) {
                                    uLinkParamName = uLink.substr(uLink.indexOf('{'));
                                    uLinkParamName = uLinkParamName.split('}')[0].replace("{", "");
                                    if (data[uLinkParamName] != undefined) {
                                        uLink = uLink.replace("{" + uLinkParamName + "}", data[uLinkParamName].toString());
                                        _idValue = data[uLinkParamName].toString();
                                    }
                                }

                                if (dLink.indexOf('{') > -1 && dLink.indexOf('}') > -1) {
                                    dLinkParamName = dLink.substr(dLink.indexOf('{'));
                                    dLinkParamName = dLinkParamName.split('}')[0].replace("{", "");
                                    if (data[dLinkParamName] != undefined) {
                                        dLink = dLink.replace("{" + dLinkParamName + "}", data[dLinkParamName].toString());
                                    }
                                }

                                _tempItem += "<div class=\"cell command\">";

                                if (tOptions.commands.ShowDetailLink == true) {
                                    _tempItem += "<a class=\"detaillink\" href=\"" + dtLink + "\" data-id=\"" + _idValue + "\">" + tOptions.commands.DetailText + "</a> ";
                                }
                                if (tOptions.commands.ShowUpdateLink == true) {
                                    _tempItem += "<a class=\"updatelink\" href=\"" + uLink + "\" data-id=\"" + _idValue + "\">" + tOptions.commands.UpdateText + "</a> ";
                                }
                                if (tOptions.commands.ShowDeleteLink == true) {
                                    _tempItem += "<a class=\"deletelink\" href=\"" + dLink + "\" data-id=\"" + _idValue + "\">" + tOptions.commands.DeleteText + "</a>";
                                }

                                _tempItem += "<select class=\"selectcommand\" data-id=\"" + _idValue + "\">";

                                _tempItem += "<option value=\"-\">-</option>";
                                if (tOptions.commands.ShowDetailLink == true) {
                                    _tempItem += "<option data-cmd-type=\"detail\" value=\"" + dtLink + "\">" + tOptions.commands.DetailText + "</option>";
                                }
                                if (tOptions.commands.ShowUpdateLink == true) {
                                    _tempItem += "<option data-cmd-type=\"update\" value=\"" + uLink + "\">" + tOptions.commands.UpdateText + "</option>";
                                }
                                if (tOptions.commands.ShowDeleteLink == true) {
                                    _tempItem += "<option data-cmd-type=\"delete\" value=\"" + dLink + "\">" + tOptions.commands.DeleteText + "</option>";
                                }

                                _tempItem += "</select>";

                                _tempItem += "</div>";
                            }

                            _tempItem += "</div>";

                            _returnItem += _tempItem;
                        });

                        /* Data Rowları */

                        if (counter > 0) {
                            tItem.append(_returnItem);
                        }
                        else {
                            _returnItem += "<div class=\"row noitem\"" + twidth + ">Aradığınız Kritere Uygun Sonuç Bulunamadı...</div>";

                            tItem.append(_returnItem);
                            _returnItem = "";
                        }

                    }
                    else {
                        _returnItem += "<div class=\"row noitem\"" + twidth + ">Aradığınız Kritere Uygun Sonuç Bulunamadı...</div>";

                        tItem.append(_returnItem);
                        _returnItem = "";
                    }

                    if (tOptions.showfooter == true) {
                        _returnItem = "<div class=\"row pager\"" + twidth + ">";

                        if (tOptions.showsearchfield == true) {
                            _returnItem += "<input type=\"text\" class=\"searchtext\" value=\"" + tOptions.conditions.SearchText + "\" /><input type=\"button\" class=\"searchbutton\" value=\"Ara\" />";
                        }

                        if (tOptions.showcommands == true) {
                            if (tOptions.commands.ShowAddLink == true) {
                                _returnItem += "<a class=\"addlink\" href=\"" + tOptions.commands.AddLink + "\">" + tOptions.commands.AddText + "</a>";
                                _returnItem += "<a class=\"addlinkplus\" href=\"" + tOptions.commands.AddLink + "\">+</a>";
                            }
                        }

                        if (tOptions.showpager == true) {
                            if (totalpage > 1) {
                                if (currentpage >= totalpage) {
                                    _returnItem += "<a class=\"page passive\" href=\"javascript:;\" data-spec=\"last\" title=\"Son Sayfa\">>|</a>";
                                }
                                else {
                                    _returnItem += "<a class=\"page\" href=\"javascript:;\" data-spec=\"last\" title=\"Son Sayfa\">>|</a>";
                                }

                                if (currentpage + 1 <= totalpage) {
                                    _returnItem += "<a class=\"page\" href=\"javascript:;\" data-spec=\"plus\" title=\"Önceki Sayfa\">></a>";
                                }
                                else {
                                    _returnItem += "<a class=\"page passive\" href=\"javascript:;\" data-spec=\"plus\" title=\"Önceki Sayfa\">></a>";
                                }

                                if (currentpage - 1 <= 0) {
                                    _returnItem += "<a class=\"page passive\" href=\"javascript:;\" data-spec=\"minus\" title=\"Sonraki Sayfa\"><</a>";
                                }
                                else {
                                    _returnItem += "<a class=\"page\" href=\"javascript:;\" data-spec=\"minus\" title=\"Sonraki Sayfa\"><</a>";
                                }

                                if (currentpage <= 1) {
                                    _returnItem += "<a class=\"page passive\" href=\"javascript:;\" data-spec=\"first\" title=\"İlk Sayfa\">|<</a>";
                                }
                                else {
                                    _returnItem += "<a class=\"page\" href=\"javascript:;\" data-page=\"1\" data-spec=\"first\" title=\"İlk Sayfa\">|<</a>";
                                }

                                var _selectDisplay = totalpage == 0 ? " style=\"display:none;\"" : "";

                                _returnItem += "<select" + _selectDisplay + ">";

                                for (var i = 1; i <= totalpage; i++) {
                                    var _selected = i == currentpage ? " selected=\"selected\" " : "";
                                    _returnItem += "<option value=\"" + i.toString() + "\"" + _selected + ">" + i.toString() + "</option>";
                                }

                                _returnItem += "</select>";

                            }
                            else {
                                _returnItem += "<a class=\"page passive\" href=\"javascript:;\">>|</a>";
                                _returnItem += "<a class=\"page passive\" href=\"javascript:;\">></a>";
                                _returnItem += "<a class=\"page passive\" href=\"javascript:;\"><</a>";
                                _returnItem += "<a class=\"page passive\" href=\"javascript:;\">|<</a>";
                                _returnItem += "<select>";
                                _returnItem += "<option value=\"1\" selected=\"selected\">1</option>";
                                _returnItem += "</select>";
                            }

                            _returnItem += "<input type=\"hidden\" id=\"hdnPC" + tOptions.guid + "\" value=\"" + totalpage.toString() + "\" />";
                        }
                        _returnItem += "</div>";
                        tItem.append(_returnItem);
                        _returnItem = "";
                    }

                    /* Sort */
                    if (tOptions.enablesorting == true) {
                        tItem.find(".row.title").find("a.cell").on("click", function () {
                            tOptions.conditions.OrderBy = $(this).attr("data-sorter");
                            tOptions.conditions.OrderDirection = $(this).attr("data-sorter-dir");

                            return new CreateTable(tItem, tOptions);
                        });
                    }
                    /* Sort */

                    /* Page */
                    if (totalpage > 1) {
                        tItem.find(".row.pager").find("a.page").on("click", function () {
                            switch ($(this).attr("data-spec")) {
                                case "first": currentpage = 1; break;
                                case "plus":
                                    if (currentpage < totalpage) {
                                        currentpage = currentpage + 1;
                                    }
                                    ; break;
                                case "minus":
                                    if (currentpage > 1) {
                                        currentpage = currentpage - 1;
                                    }
                                    break;
                                case "last": currentpage = totalpage; break;
                            }

                            tItem.find(".row").each(function () {
                                if ($(this).attr("data-page") != undefined) {
                                    if ($(this).attr("data-page") == tOptions.page) {
                                        $(this).css("display", "block");
                                    }
                                    else {
                                        $(this).css("display", "none");
                                    }
                                }
                            });

                            doPager(tItem, currentpage, parseInt($("#hdnPC" + tOptions.guid).val()));
                        });

                        tItem.find(".row.pager").find("select").on("change", function () {
                            currentpage = parseInt($(this).val());
                            tItem.find(".row").each(function () {
                                if ($(this).attr("data-page") != undefined) {
                                    if ($(this).attr("data-page") == tOptions.page) {
                                        $(this).css("display", "block");
                                    }
                                    else {
                                        $(this).css("display", "none");
                                    }
                                }
                            });

                            doPager(tItem, currentpage, parseInt($("#hdnPC" + tOptions.guid).val()));
                        });


                        function doPager(TItem, TPage, PageCount) {

                            TItem.find(".row.pager").find("a.page").removeClass("active");
                            TItem.find(".row.pager").find("a.page").removeClass("passive");

                            TItem.find(".row.pager").find("a.page").each(function () {
                                if (TPage == 1) {
                                    TItem.find(".row.pager").find("a.page[data-spec='first']").addClass("passive");
                                    TItem.find(".row.pager").find("a.page[data-spec='minus']").addClass("passive");
                                }
                                else if (TPage == PageCount) {
                                    TItem.find(".row.pager").find("a.page[data-spec='last']").addClass("passive");
                                    TItem.find(".row.pager").find("a.page[data-spec='plus']").addClass("passive");
                                }

                                TItem.find(".row.pager").find("select").val(TPage);
                            });

                            TItem.find(".row").each(function () {
                                if ($(this).attr("data-page") != undefined) {
                                    if ($(this).attr("data-page") == TPage) {
                                        $(this).css("display", "block");
                                    }
                                    else {
                                        $(this).css("display", "none");
                                    }
                                }
                            });
                        }
                    }
                    /* Page */

                    /* Search */
                    tItem.find(".row.pager").find(".searchbutton").on("click", function () {
                        tOptions.conditions.SearchText = tItem.find(".row.pager").find(".searchtext").val();
                        currentpage = 1;
                        tOptions.conditions.OrderDirection = tOptions.conditions.OrderDirection == "Asc" ? "Desc" : "Asc";

                        return new CreateTable(tItem, tOptions);
                    });
                    /* Search */

                    /* Cell Commands */
                    tItem.find(".row .cell.command").find("select.selectcommand").on("change", function () {
                        var cmdtype = $(this).children("option:selected").attr("data-cmd-type");
                        if (cmdtype == "update" || cmdtype == "detail") {
                            document.location.href = $(this).val();
                        }
                        else if (cmdtype == "delete") {
                            if (confirm("Silmek istediğinize emin misiniz?") == true) {
                                $.ajax({
                                    type: "POST",
                                    url: tOptions.deletemethod,
                                    data: "{ " + tOptions.paramname + ": '" + $(this).attr("data-id") + "' }",
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    success: function (answer) {
                                        if (answer.d == undefined) {
                                            var returnData = answer;
                                        }
                                        else {
                                            var returnData = answer.d;
                                        }

                                        if (returnData == true) {
                                            alert("Kayıt silinmiştir.");
                                            tOptions.conditions.OrderDirection = tOptions.conditions.OrderDirection == "Asc" ? "Desc" : "Asc";
                                            tOptions.page = 1;
                                            return new CreateTable(tItem, tOptions);
                                        }
                                        else {
                                            alert("Kayıt silinemedi. Bağlantılı kayıtlar var ise önce onları siliniz.");
                                        }
                                    },
                                    error: function (answer) {
                                        alert("Kayıt silinirken hata meydana geldi.");
                                    }
                                });
                            }
                        }
                    });
                    /* Cell Commands */

                    /* Delete Command */
                    tItem.find(".row .cell.command").find("a.deletelink").on("click", function () {
                        if (confirm("Silmek istediğinize emin misiniz?") == true) {
                            $.ajax({
                                type: "POST",
                                url: tOptions.deletemethod,
                                data: "{ " + tOptions.paramname + ": '" + $(this).attr("data-id") + "' }",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (answer) {
                                    if (answer.d == undefined) {
                                        var returnData = answer;
                                    }
                                    else {
                                        var returnData = answer.d;
                                    }

                                    if (returnData == true) {
                                        alert("Kayıt silinmiştir.");
                                        tOptions.conditions.OrderDirection = tOptions.conditions.OrderDirection == "Asc" ? "Desc" : "Asc";
                                        tOptions.page = 1;
                                        return new CreateTable(tItem, tOptions);
                                    }
                                    else {
                                        alert("Kayıt silinemedi. Bağlantılı kayıtlar var ise önce onları siliniz.");
                                    }
                                },
                                error: function (answer) {
                                    alert("Kayıt silinirken hata meydana geldi.");
                                }
                            });
                        }
                    });
                    /* Delete Command */
                },
                error: function () {
                    tItem.text(tOptions.headertext + " tablosu oluşturulamadı.");
                }
            });
        }

        if (!Object.keys) {
            Object.keys = (function () {
                'use strict';
                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                    dontEnums = [
                      'toString',
                      'toLocaleString',
                      'valueOf',
                      'hasOwnProperty',
                      'isPrototypeOf',
                      'propertyIsEnumerable',
                      'constructor'
                    ],
                    dontEnumsLength = dontEnums.length;

                return function (obj) {
                    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                        throw new TypeError('Object.keys called on non-object');
                    }

                    var result = [], prop, i;

                    for (prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop);
                        }
                    }

                    if (hasDontEnumBug) {
                        for (i = 0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i]);
                            }
                        }
                    }
                    return result;
                };
            }());
        }
    }

    $.fn.tdTable = function (tableOptions) {
        return new CreateTable(this, tableOptions);
    };
})(jQuery);