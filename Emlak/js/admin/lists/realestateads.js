/* Emlak List */

var formopencount = 1;
$(document).ready(function () {

    if ($("#RealEstateAdsTableContainer").length > 0) {
        $("#RealEstateAdsTableContainer").jtable({
            title: "Kategoriler",
            paging: true,
            pageSize: 10,
            sorting: true,
            defaultSorting: 'ID ASC',
            actions: {
                listAction: ProjectPath + "/Ajax/RealEstateAds/List",
                createAction: ProjectPath + "/Ajax/RealEstateAds/Insert?userID=" + UserID,
                updateAction: ProjectPath + "/Ajax/RealEstateAds/Update?userID=" + UserID,
                deleteAction: ProjectPath + "/Ajax/RealEstateAds/Delete"
            },
            fields: {
                Contents: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (contData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/contentlist.png" title="Bağlı İçerikler" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı İçerikler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListContent?realestateadsID=" + contData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeleteContent?realestateadsID=" + contData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        ContentName: {
                                            title: "İçerik Adı",
                                            width: "250px",
                                            create: false,
                                            edit: false,
                                        },
                                        Sample: {
                                            title: "Örnek Metin",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (contData) {
                                                return contData.record.Sample;
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                Files: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (fileData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/fileslist.png" title="Bağlı Dosyalar" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListFiles?realestateadsID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeleteFiles?realestateadsID=" + fileData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        Sample: {
                                            title: "Örnek Dosya",
                                            width: "100px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (fileData) {
                                                return fileData.record.Sample == "" ? '<center style="color:Red;">Dosya Eklenmemiş</center>' : '<center><a target="_blank" href="' + UploadPath + '/File/' + fileData.record.Sample + '">' + fileData.record.Sample + '</a></center>';
                                            }
                                        },
                                        FileName: {
                                            title: "Dosya Adı",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                FilesNoLang: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (fileData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/filesnolanglist.png" title="Bağlı Dosyalar (Dilsiz)" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Dosyalar (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListFilesNoLang?realestateadsID=" + fileData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeleteFilesNoLang?realestateadsID=" + fileData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        FileName: {
                                            title: "Dosya",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (fileData) {
                                                return fileData.record.FileName == "" ? '<font style="color:Red;">Dosya Eklenmemiş</font>' : '<a target="_blank" href="' + UploadPath + '/File/' + fileData.record.FileName + '">' + fileData.record.FileName + '</a>';
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "300px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                Gallery: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (galData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/gallerylist.png" title="Bağlı Galeriler" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Galeriler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListGallery?realestateadsID=" + galData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeleteGallery?realestateadsID=" + galData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        GalleryName: {
                                            title: "Galeri Adı",
                                            width: "250px",
                                            create: false,
                                            edit: false,
                                        },
                                        Sample: {
                                            title: "Örnek Metin",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (galData) {
                                                return galData.record.Sample;
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                Pictures: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (picData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/picturelist.png" title="Bağlı Resimler" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Resimler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListPictures?realestateadsID=" + picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeletePictures?realestateadsID=" + picData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        Sample: {
                                            title: "Örnek Resim",
                                            width: "100px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (picData) {
                                                return picData.record.Sample == "" ? '<center style="color:Red;">Resim Eklenmemiş</center>' : '<center><img width="50" height="50" src="' + UploadPath + "/Gallery/Thumb/" + picData.record.Sample + '" /></center>';
                                            }
                                        },
                                        PictureName: {
                                            title: "Resim Adı",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "200px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                PicturesNoLang: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (picData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/picturenolanglist.png" title="Bağlı Resimler (Dilsiz)" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Resimler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListPicturesNoLang?realestateadsID=" + picData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeletePicturesNoLang?realestateadsID=" + picData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        PictureName: {
                                            title: "Resim",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (picData) {
                                                return picData.record.PictureName == "" ? '<font style="color:Red;">Resim Eklenmemiş</font>' : '<img width="50" height="50" src="' + UploadPath + "/Gallery/Thumb/" + picData.record.PictureName + '" />';
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "300px",
                                            create: false,
                                            edit: false,
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                URLink: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (linkData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/urlinklist.png" title="Bağlı Linkler" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListURLink?realestateadsID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeleteURLink?realestateadsID=" + linkData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        URLinkName: {
                                            title: "Link Adı",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "300px",
                                            create: false,
                                            edit: false,
                                            list: true
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                URLinkNoLang: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (linkData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/urlinknolanglist.png" title="Bağlı Linkler (Dilsiz)" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Bağlı Linkler (Dilsiz)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListURLinkNoLang?realestateadsID=" + linkData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeleteURLinkNoLang?realestateadsID=" + linkData.record.ID
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: true
                                        },
                                        URL: {
                                            title: "Link",
                                            width: "350px",
                                            create: false,
                                            edit: false,
                                            list: true,
                                            display: function (data) {
                                                return '<a target="_blank" href="' + data.record.URL + '">' + data.record.URL + '</a>';
                                            }
                                        },
                                        Code: {
                                            title: "Kod",
                                            width: "300px",
                                            create: false,
                                            edit: false,
                                            list: true
                                        }
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                },
                //Rank: {
                //    title: "",
                //    width: '15px',
                //    sorting: false,
                //    edit: false,
                //    create: false,
                //    listClass: 'child-opener-image-column',
                //    display: function (rankData) {
                //        var $img = $('<img class="jtable-command-button jtable-edit-command-button" src="' + ImagePath + '/ranklist.png" title="Bağlı Puanlamalar" />');
                //        $img.click(function () {
                //            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                //                $img.closest('tr'),
                //                {
                //                    title: "Bağlı Puanlamalar",
                //                    ajaxSettings: {
                //                        type: "POST",
                //                        dataType: "json",
                //                        contentType: "application/json; charset=utf-8",
                //                    },
                //                    actions: {
                //                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListRank?realestateadsID=" + rankData.record.ID,
                //                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeleteRank?realestateadsID=" + rankData.record.ID
                //                    },
                //                    fields: {
                //                        ID: {
                //                            title: "ID",
                //                            key: true,
                //                            create: false,
                //                            edit: false,
                //                            list: true
                //                        },
                //                        RankName: {
                //                            title: "Puanlama Adı",
                //                            width: "350px",
                //                            create: false,
                //                            edit: false,
                //                            list: true
                //                        },
                //                        Code: {
                //                            title: "Kod",
                //                            width: "300px",
                //                            create: false,
                //                            edit: false,
                //                            list: true
                //                        }
                //                    }
                //                }, function (data) {
                //                    data.childTable.jtable('load');
                //                });
                //        });
                //        return $img;
                //    }
                //},
                ID: {
                    title: "ID",
                    width: "20px",
                    key: true,
                    create: false,
                    edit: false,
                },
                Baslik: {
                    title: "Emlak Baslik",
                    width: "200px",
                },
                Queue: {
                    title: "Sıra",
                    width: "20px"
                },
                KatID: {
                    title: "Kategorisi",
                    width: "80px",
                    list: false,
                    options: ProjectPath + "/Ajax/CommonData/GetMainCategories?parentID=0"
                },
                AltKatID: {
                    title: "Alt Kategorisi",
                    width: "80px",
                    dependsOn: 'KatID',
                    options: function (data) {
                        return ProjectPath + "/Ajax/CommonData/GetMainCategories?empty=1&parentID=" + data.dependedValues.KatID;
                    }
                },
                Code: {
                    title: "Kod",
                    width: "110px",
                    list: false,
                },
                Fiyat: {
                    title: "Fiyatı (Sayısal)",
                    list: false
                },
                Enlem: {
                    title: "Enlem",
                    width: "200px",
                    list: false
                },
                Boylam: {
                    title: "Boylam",
                    width: "200px",
                    list: false
                },
                Yeni: {
                    title: "Yeni mi?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                GununEmlagi: {
                    title: "G.E.?",
                    list: true,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Satilik: {
                    title: "Satılık mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Sehir: {
                    title: "Şehir",
                    list: false,
                    options: ProjectPath + "/Ajax/CommonData/GetCity",
                },
                Ilce: {
                    title: "İlçe",
                    list: false
                },
                Semt: {
                    title: "Semt",
                    list: false
                },
                Sahibi: {
                    title: "Emlak Sahibi",
                    list: false
                },
                OdaSayisi: {
                    title: "Oda Sayısı (Sayısal)",
                    list: false
                },
                KatSayisi: {
                    title: "Kat Sayısı (Sayısal)",
                    list: false
                },
                IsinmaTipi: {
                    title: "Isınma Tipi",
                    list: false,
                    options: ProjectPath + "/Ajax/CommonData/GetWarmTypes"
                },
                SalonSayisi: {
                    title: "Salon Sayısı (Sayısal)",
                    list: false
                },
                BulunduguKat: {
                    title: "Bulunduğu Kat (Sayısal)",
                    list: false
                },
                YakitTipi: {
                    title: "Yakıt Tipi",
                    list: false,
                    options: ProjectPath + "/Ajax/CommonData/GetFuelTypes"
                },
                Alan: {
                    title: "Alanı (m'2) (Sayısal)",
                    list: false
                },
                Durum: {
                    title: "Durum",
                    list: false,
                    options: ProjectPath + "/Ajax/CommonData/GetSituation"
                },
                BinaYasi: {
                    title: "Bina Yaşı (Sayısal)",
                    list: false
                },
                ArkaCephe: {
                    title: "Arka Cephe",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                OnCephe: {
                    title: "Ön Cephe",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                CaddeyeYakin: {
                    title: "Caddeye Yakın mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                DenizeSifir: {
                    title: "Denize Sıfır mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                DenizeYakin: {
                    title: "Denize Yakın mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Manzara: {
                    title: "Manzaralı mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Merkezde: {
                    title: "Merkezde mi?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Metro: {
                    title: "Metroya Yakın mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Otoban: {
                    title: "Otobana Yakın mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                TopluUlasim: {
                    title: "Toplu Ulaşıma Yakın mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Asansor: {
                    title: "Asansöre Yakın mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Bahce: {
                    title: "Bahçeye Yakın mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Guvenlik: {
                    title: "Guvenliğe Yakın mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Hidrofor: {
                    title: "Hidrofor Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Mantolama: {
                    title: "Mantolama Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Jenerator: {
                    title: "Jenerator Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Kapici: {
                    title: "Kapıcı Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Otopark: {
                    title: "Otopark Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                OyunParki: {
                    title: "Oyun Parkı Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                PVCDograma: {
                    title: "PVC Doğrama Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                SiteIci: {
                    title: "Site İçi mi?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                YanginMerdiveni: {
                    title: "Yangın Merdiveni Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                YuzmeHavuzu: {
                    title: "Yüzme Havuzu Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Alarm: {
                    title: "Alarm Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Balkon: {
                    title: "Balkon Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                CelikKapi: {
                    title: "Çelik Kapı Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                GoruntuluDiafon: {
                    title: "Görüntülü Diyafon Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Jakuzi: {
                    title: "Jakuzi Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                KabloTVUydu: {
                    title: "Kablo-TV Uydu Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Klima: {
                    title: "Klima Var mı?",
                    list: false,
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                Active: {
                    title: "Aktif mi?",
                    width: "40px",
                    type: "checkbox",
                    values: { "false": '<center><img class="jtableximage" src="' + ImagePath + '/error.png" /></center>', "true": '<center><img class="jtableximage" src="' + ImagePath + '/valid.png" /></center>' },
                    defaultValue: "true",
                },
                GununEmlagiYap: {
                    title: '',
                    width: '16px',
                    edit: false,
                    create: false,
                    sorting: false,
                    display: function (data) {
                        return '<a class="todaysre" href="javascript:TodaysRE(' + data.record.ID + ');" title="Günün Emlağı Yap"><img src="' + ImagePath + '/todaysre.png" /></a>';
                    }
                },
                LangField: {
                    title: "",
                    width: '15px',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'child-opener-image-column',
                    display: function (realestateadsData) {
                        var $img = $('<img class="jtable-command-button jtable-edit-command-button" data-cmd="lang' + realestateadsData.record.ID + '" src="' + ImagePath + '/langlist.png" title="Dil İçerikleri" />');
                        $img.click(function () {
                            $('#RealEstateAdsTableContainer').jtable('openChildTable',
                                $img.closest('tr'),
                                {
                                    title: "Dil İçerikleri (Emlak)",
                                    ajaxSettings: {
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                    },
                                    actions: {
                                        listAction: ProjectPath + "/Ajax/RealEstateAds/ListLang?realestateadsID=" + realestateadsData.record.ID,
                                        createAction: ProjectPath + "/Ajax/RealEstateAds/InsertLang?realestateadsID=" + +realestateadsData.record.ID,
                                        updateAction: ProjectPath + "/Ajax/RealEstateAds/UpdateLang?realestateadsID=" + +realestateadsData.record.ID,
                                        deleteAction: ProjectPath + "/Ajax/RealEstateAds/DeleteLang"
                                    },
                                    fields: {
                                        ID: {
                                            title: "ID",
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: false
                                        },
                                        EmlakID: {
                                            title: "Emlak ID",
                                            width: "20px",
                                            edit: false,
                                            create: false,
                                            list: false
                                        },
                                        Baslik: {
                                            title: "Emlak Baslık",
                                            width: "650px"
                                        },
                                        Language: {
                                            title: "Dil",
                                            width: "50px",
                                            options: ProjectPath + "/Ajax/CommonData/GetLanguages"
                                        },
                                        Code: {
                                            title: "Kod",
                                            list: false
                                        },
                                        Aciklama: {
                                            title: "Açıklama",
                                            type: "textarea",
                                            inputClass: "ckeditor",
                                            list: false
                                        }
                                    },
                                    formCreated: function (event, data) {
                                        $('textarea.ckeditor').ckeditor(
                                        {
                                            enterMode: Number(2),
                                            width: "600px",
                                            height: "300px",
                                            contentsLanguage: "tr",
                                            skin: "office2003"
                                        });
                                        formopencount++;
                                    },
                                    formSubmitting: function (event, data) {
                                        $('textarea.ckeditor').each(function () {
                                            $(this).attr("id", "Edit-" + $(this).attr("data-id"));
                                            $(this).attr("name", $(this).attr("data-id"));
                                        });
                                    },
                                    recordAdded: function (event, data) {
                                        $(".jtable-command-button.jtable-edit-command-button[data-cmd='lang" + data.record.EmlakID + "']").click();
                                    }
                                }, function (data) {
                                    data.childTable.jtable('load');
                                });
                        });
                        return $img;
                    }
                }
            }
        });

        //$('#RealEstateAdsTableContainer').jtable('load');

        $('#filterButton').click(function (e) {
            e.preventDefault();
            $('#RealEstateAdsTableContainer').jtable('load', {
                realestateadsName: $('#realestateadsName').val(),
                active: $('#active').val()
            });
        });

        $('#filterButton').click();
    }
});

function TodaysRE(reID) {
    var reObject = new Object();
    reObject.ID = reID;

    $.ajax({
        type: "POST",
        url: ProjectPath + "/Ajax/CommonData/TodaysRE",
        data: "{ re: '" + JSON.stringify(reObject) + "' }",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (answer) {
            if (answer == true) {
                alert("İlgili ilan Günün İlanı olarak atandı.");
            }
            else {
                alert("İşlem sırasında bir hata meydana geldi.");
            }

            $('#filterButton').click();
        }
    });
}

/* Emlak List */
