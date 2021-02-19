const BATTAL_TASKS = {

    0: {
        ar_title: "غزو"
    },
    1: {
        ar_title: "استيلاء"
    },
    2: {
        ar_title: "انضمام للهجوم "
    },
    3: {
        ar_title: "انضمام للدفاع"
    },
    4: {
        ar_title: "تجسس"
    },
    5: {
        ar_title: "امداد"
    },
    6: {
        ar_title: "نقل"
    }

};



var ARMY_CONVERT = {

    "sol-0": {
        city: null,
        db: 0
    },
    "sol-1": {
        city: "army_a",
        db: 1,
        img: "images/tech/soldier01.jpg"
    },
    "sol-2": {
        city: "army_b",
        db: 2,
        img: "images/tech/soldier02.jpg"
    },
    "sol-3": {
        city: "army_c",
        db: 3,
        img: "images/tech/soldier03.jpg"
    },
    "sol-4": {
        city: "army_d",
        db: 4,
        img: "images/tech/soldier04.jpg"
    },
    "sol-5": {
        city: "army_e",
        db: 5,
        img: "images/tech/soldier05.jpg"
    },
    "sol-6": {
        city: "army_f",
        db: 6,
        img: "images/tech/soldier06.jpg"
    }

};

/*  this glo*/
var hero_medal = {
    "medal_ceasro": "0",
    "medal_den": "0",
    "medal_leo": "0",
    "ceaser_eagle": "0"
};
// this by default will be the current hero 
// will be used in every thig will be the first  to show


var current_hero_army;
// the second hero it relatedonly with  swap army between two heros
// first hero (current Hero) secound hero  (sechero

var current_hero_equi;


/*
 * the default value for battel if the  player tryed to attack
 * 
 */
var battel_data = {
    x_coord: null,
    y_coord: null,
    ar_title: "",
    task: "",
    time: 0,
    task_title: "",
    type: null
};

/*
 * image of army in  all places exept battel Reports
 * 0 for no army
 * 1 for مشاه
 * 2 for فرسان
 * 3 for مدرعين
 * 4 رماه 
 * 5 مقاليع 
 * 6 منجنيق
 */
var army_typs = [
    "no_army.png",
    "soldier01.jpg",
    "soldier02.jpg",
    "soldier03.jpg",
    "soldier04.jpg",
    "soldier05.jpg",
    "soldier06.jpg"
];

function refreshDownTradeArmy()
{
    $("#d_1").children(".amount").attr("amount", Elkaisar.CurrentCity.City.army_a);
    $("#d_1").children(".amount").html(getArabicNumbers(Elkaisar.CurrentCity.City.army_a));

    $("#d_2").children(".amount").attr("amount", Elkaisar.CurrentCity.City.army_b);
    $("#d_2").children(".amount").html(getArabicNumbers(Elkaisar.CurrentCity.City.army_b));

    $("#d_3").children(".amount").attr("amount", Elkaisar.CurrentCity.City.army_c);
    $("#d_3").children(".amount").html(getArabicNumbers(Elkaisar.CurrentCity.City.army_c));

    $("#d_4").children(".amount").attr("amount", Elkaisar.CurrentCity.City.army_d);
    $("#d_4").children(".amount").html(getArabicNumbers(Elkaisar.CurrentCity.City.army_d));

    $("#d_5").children(".amount").attr("amount", Elkaisar.CurrentCity.City.army_e);
    $("#d_5").children(".amount").html(getArabicNumbers(Elkaisar.CurrentCity.City.army_e));

    $("#d_6").children(".amount").attr("amount", Elkaisar.CurrentCity.City.army_f);
    $("#d_6").children(".amount").html(getArabicNumbers(Elkaisar.CurrentCity.City.army_f));


}

function heroAvailableForTask(id_hero)
{
    id_hero = Number(id_hero);

    for (var index in Elkaisar.DPlayer.Heros) {



        if (Number(Elkaisar.DPlayer.Heros[index].Hero.id_hero) === Number(id_hero)) {

            for (var iii in Elkaisar.DPlayer.City)
            {
                if (Number(Elkaisar.CurrentCity.City.console) === Number(id_hero))
                    return false;

            }

            if (Number(Elkaisar.DPlayer.Heros[index].Hero.in_city) === 1) {
                return true;
            } else {
                return false;
            }

        }

    }
}
/*
 * DATA of equipments 
 * every type is object  has 5 object
 * sword , helmet ,shield , armor and boot 
 */
var EQUIP_DATA;


/*
 *الاراى دة فيه الانواع بتاعة بتاعة الجيش كل نوع بياخد سكان اد ايه 
 *واول نوع دة الى هو مش نوع خالص يعنى لما يكون الوع صفر يبقى مش جيب 
 *فميخدش من السكان
 */
var soldier_cap = [
    0, // مكان خالى
    1, //  مشاة
    3, //  فرسان
    6, //  مدرعين
    1, //  رماة
    4, //   مقاليع
    8]; //  منجنيق


function getHeroById(id_hero) {
    for (var iii in Elkaisar.DPlayer.Heros)
    {

        if (Number(Elkaisar.DPlayer.Heros[iii].Hero.id_hero) === Number(id_hero))
        {
            return Elkaisar.DPlayer.Heros[iii];
        }

    }
}
/*
 * 
 * @param {moues event} ev
 * @returns {undefined}
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/*
 * 
 * @param {int} lvl
 * @returns {power of hero}
 * بترجع اعلى طاقة ممكن البطل يوصلها
 */
function getMaxPower(lvl) {
    if (lvl >= 100) {
        return 150;
    } else {
        return 50 + parseInt(lvl);
    }
}

/*
 * 
 * @param {Array of Obj} hero_army
 * @returns {Number}
 * هنا دة عشان احسب البطل شايل ناس اد اى 
 * خلى  بالك ان كل نوع من الجيش ليه عدد معين من الناس
 */
function getHeroCap(hero_army) {

    var total_cap = 0;
    total_cap += soldier_cap[hero_army.f_1_type] * hero_army.f_1_num;
    total_cap += soldier_cap[hero_army.f_2_type] * hero_army.f_2_num;
    total_cap += soldier_cap[hero_army.f_3_type] * hero_army.f_3_num;
    total_cap += soldier_cap[hero_army.b_1_type] * hero_army.b_1_num;
    total_cap += soldier_cap[hero_army.b_2_type] * hero_army.b_2_num;
    total_cap += soldier_cap[hero_army.b_3_type] * hero_army.b_3_num;

    return total_cap;
}

function getHeroCapById(id_hero) {


    var hero_army = Elkaisar.Hero.getHero(id_hero).Army;

    var total_cap = 0;
    total_cap += soldier_cap[hero_army.f_1_type] * hero_army.f_1_num;
    total_cap += soldier_cap[hero_army.f_2_type] * hero_army.f_2_num;
    total_cap += soldier_cap[hero_army.f_3_type] * hero_army.f_3_num;
    total_cap += soldier_cap[hero_army.b_1_type] * hero_army.b_1_num;
    total_cap += soldier_cap[hero_army.b_2_type] * hero_army.b_2_num;
    total_cap += soldier_cap[hero_army.b_3_type] * hero_army.b_3_num;

    return total_cap;
}


/*
 * 
 * @param {int} id_hero
 * @param {object} hero_army
 * @returns {Number}
 * 
 * return  the  number of hero can hold over it has
 * 
 */
function getAvailPlaces(id_hero, hero_army)
{
    id_hero = Number(id_hero);
    /* first  get hero */
    var hero = Elkaisar.Hero.getHero(id_hero);

    /*second   we calculate*/
    return getHeroMaxCap(hero) - getHeroCapById(id_hero);
}


/*
 * 
 * @param {object} hero
 * @returns {undefined}
 */
function getHeroMaxCap(hero)
{

    var base_cap = Math.ceil((30000 + (Number(hero.Hero.point_a) + Number(hero.Hero.point_a_plus)) * 500));
    var after_study = Math.ceil(base_cap) * (Elkaisar.DPlayer.PlayerEdu.leader) * 3 / 100;
    var after_medal_cap = (hero.Medal.medal_ceasro > Date.now() / 1000 ? (Number(hero.Hero.point_a) + Number(hero.Hero.point_a_plus)) * 500 * 25 / 100 : 0);
    var after_eagle = hero.Medal.ceaser_eagle > Date.now() / 1000 ? (Number(hero.Hero.point_a) + Number(hero.Hero.point_a_plus)) * 500 * 25 / 100 : 0;


    return (base_cap + after_medal_cap + after_eagle + after_study);

}


function getReqHeroXp(lvl) {

    var baseXp = Math.pow(lvl, 2);
    var studyEffect = 0;
    if (Elkaisar.DPlayer.PlayerEdu["scholership"] >= 20)
        studyEffect = 0.3 + 0.2 + (Elkaisar.DPlayer.PlayerEdu["scholership"] - 20) * 0.015;
    else if (Elkaisar.DPlayer.PlayerEdu["scholership"] >= 10)
        studyEffect = 0.3 + (Elkaisar.DPlayer.PlayerEdu["scholership"] - 10) * 0.02;
    else
        studyEffect = Elkaisar.DPlayer.PlayerEdu["scholership"] * 0.03;


    return Math.floor(baseXp * (1 - studyEffect) * 125);

}
/*
 * 
 * @param {Moues Event} ev
 * @param {DOM obj} el
 * @returns {undefined}
 * هنا الصورة هى الى بيحصل لها  دراج
 * واليست الى الى بيتعمل عليها دروب
 */
function drag(e, el) {
    var ev = e.originalEvent;

    if (Number($(el).next(".amount").attr("amount")) <= 0) {
        ev.preventDefault();
        return;
    }

    $(el).parents(".sol").removeAttr("ondragover");
    // هنا بجيب الاى دى عشا يتبعت مع  الصورة للخانة الى هتتبعت
    ev.dataTransfer.setData("text", ev.target.id);
    /*
     * @type jQuery
     * ev.target  this is the dom object of image being drag
     */
    var hold_type = $(ev.target).attr("army-type");
    /*
     * هنا  بلف على كل الوحدات الى فيها جيش
     * لو نوع الجيش واحد بقفى الطبقة الشفافة 
     * ولو النوع مختلف بفضل سايب الطبقة الشفافة
     */
    $(".sol").each(function () {
        if ($(this).attr("army-type") === hold_type || $(this).attr("army-type") === "sol-0") {
            $(this).children(".permit-layer").hide();


        } else {
            $(this).children(".permit-layer").show();
            $(this).removeAttr("ondragover");
        }
    });

}

/*
 * 
 * @returns {undefined}
 * بناديها لما الدراج يخلص وكل الى انا بعمله بشيل الطبقة الشفافة
 */
function dragend() {

    $(".sol").each(function () {
        /*   remve layer */
        $(this).children(".permit-layer").hide();
        /*   add allwow drope function*/
        $(this).attr("ondragover", "allowDrop(event)");
    });

}


/*
 * 
 * @param {moues event} ev
 * @param {li DOM obj} el_to
 * @returns {undefined}
 * 
 * دى اهم فنكشن
 * دى بقى بتشتغل لما بسيب الماوس على  الصورة بتاعة الجيش
 * هوة بقى بينقل الجيش من المدينة للبطل
 */
function drop(e, el_to) {
    var ev = e.originalEvent;

    ev.preventDefault();
    /*
     * @type text
     * دة الايدى الى اتبعت معا الدراج فوق
     * باخد الايدى دة عشان امسك العنصر الى مبعوت منة الدراج
     */
    var id = ev.dataTransfer.getData("text", ev.target.id);

    /**
     * @type Element DOM
     * دة العنصر الى اتنقل وبيكون صورة
     */
    var el_from = document.getElementById(id);


    /*
     * 
     * @type jQuery
     * هنا بقى انا بحدد الجيش جاى منين ورايح فين 
     * يعنىى ممكن جاى من المدينة ورايح البطل 
     * او من البطل ورايح المدينة  او  ن بطل للتانى
     */
    var army_from = $(el_from).parents(".army_container").attr("army"); // 
    var army_to = $(el_to).parents(".army_container").attr("army"); // li 

    /* هحدد العدد المسموح للنقل لو الجيش بيتنقل للبطل*/

    var max_num = Number($(el_from).next(".amount").attr("amount"));
    /* بحدد نوع الجيش */
    var army_type = $.trim($(el_from).attr("army-type"));

    /* تانى حاجة هجيب العدد  بتاع الفرد من الجيش كام*/

    var sol_cap = soldier_cap[army_type.split("-")[1]];

    var available_place = 0;

    if (sol_cap <= 0) {
        alert_box.failMessage("خطاء نوع الجيش");
        $("#dialg_box .left-nav .selected").click();
        return;
    }
    /*
     * 
     * @type String
     *  هشوف  لو انا ببعت اجيش دة للبطل
     *  
     */
    if (army_to === "hero") {

        /*  هشوف دة انهى بطل البطل الاول ولا التانى*/
        var hero_place = $(el_to).parent('ol').attr("id");

        var max = 0;

        if (hero_place === "hero-right-ol") { // sec hero

            available_place = getAvailPlaces(Elkaisar.NextHero.Hero.id_hero, Elkaisar.NextHero.Army);

            if (!heroAvailableForTask(Elkaisar.NextHero.Hero.id_hero)) {

                alert_box.confirmMessage("لا يمكن نقل القوات </br> البطل فى مهمة");
                return false;

            }


            //var diff =  parseInt($(".hero-2  ol li:nth-child(2) .header-2:nth-child(2)").html().split("/")[1])- parseInt($(".hero-2  ol li:nth-child(2) .header-2:nth-child(2)").html().split("/")[0]);




        } else if (hero_place === "hero-left-ol") {  // current hero

            available_place = getAvailPlaces(Elkaisar.CurrentHero.Hero.id_hero, Elkaisar.CurrentHero.Army);

            if (!heroAvailableForTask(Elkaisar.CurrentHero.Hero.id_hero)) {
                alert_box.confirmMessage("لا يمكن نقل القوات </br> البطل فى مهمة");
                return false;

            }

            // var diff =  parseInt($(".hero-1  ol li:nth-child(2) .header-2:nth-child(2)").html().split("/")[1])- parseInt($(".hero-1  ol li:nth-child(2) .header-2:nth-child(2)").html().split("/")[0]);

            max = Math.min(max_num, Math.floor(available_place / sol_cap));
        }



        max_num = Math.floor(Math.min(available_place / sol_cap, max_num));
        if (max_num < 1) {
            alert_box.failMessage("لا توجد امكان خالية للقوات");
            return;
        }
    }

    // كدة انا معايا  اقصر رقم يتبعت من البطل للبطل التانى





    /*
     * @type String
     * دة بيبقى المحتوى بتاع البوكس الصغير الى بنقل بية
     */

    var conetnt = alert_box.alert_content_army(el_from, el_to, max_num);
    // alert box complete
    var alert_ = alert_box.alert("نقل القوات", conetnt);

    $("body").append((alert_));// add to body

    //$(el_to).children(".unit-wrapper").attr("ondragstart" ,"drag(event , this)");


    // when confirm button is clicked

    $(document).on("click", ".trans-con", function () {



        /* 
         * هنا بقى لما زرار التاكيد يضغط علية*/
        var amount = Math.floor($("#input-army-move").val()) || 0; // amount in  input
        var curent_amount = Math.floor($(el_to).children(".amount").attr("amount")) || 0; // amount on hero or city whichever

        /* لو ان الانبوت فية صفر مش محتاج اروح للدات بيز*/
        if (amount < 1) {
            $("#over_lay_alert").remove();
            return;
        }

        /* بحدد نوع الجيش */
        var army_type = $.trim($(el_from).attr("army-type"));
        var id_hero = Number($(el_to).parents(".army_container").attr("id_hero"));
        /*  بحدد المكان الى البطل رايح لية  هنا اكيد مكان فى البطل عشان  احنا اخترنا  من المدينة للبطل*/
        var army_place = $.trim($(el_to).attr("army_place"));

        /* هغير العدد الى اتنقل هزود عدد جنود الفيلق*/
        if (army_to === "hero") {

            var filak = $(el_to).parents(".army_container").prev(".part-2").children("ol").children("li").next().children().next().html();
            var new_amount = Number(getHeroCapById(id_hero)) + sol_cap * amount;

            $(el_to).parents(".army_container").prev(".part-2").children().children("li:nth-child(2)").children().next().html(new_amount + "/" + getHeroMaxCap(Elkaisar.Hero.getHero(id_hero)));
            //$(el_to).parents(".army_container").prev(".part-2").children().children("li:nth-child(2)").children().next().html(new_amount+"/"+filak.split("/")[1]);

            if (Number(new_amount) > getHeroMaxCap(Elkaisar.Hero.getHero(id_hero))) {

                alert_box.confirmMessage("لا يمكنك نقل هذة الكمية");
                return;

            }

        }



        /* هغير العدد الى اتنقل هزود عدد جنود الفيلق*/
        if (army_from === "hero") {

            var id_hero_from = Number($(el_from).parents(".army_container").attr("id_hero"));
            var filak = $(el_from).parents(".army_container").prev(".part-2").children("ol").children("li").next().children().next().html();

            var new_amount = Number(getHeroCapById(id_hero_from)) + soldier_cap[army_type.split("-")[1]] * amount;
            $(el_from).parents(".army_container").prev(".part-2").children().children("li:nth-child(2)").children().next().html(new_amount + "/" + getHeroMaxCap(Elkaisar.Hero.getHero(id_hero_from)));
        }




        // case the army transformed from  city to hero
        if (army_from === "city" && army_to === "hero") {

            $(document).off("click", ".trans-con");/*  بوقف الايفنت عشان  كان بيشتغل على النتيجة الى قبلها */



            $.ajax({
                url: `${API_URL}/api/AHeroArmy/transArmyFromCityToHero`,
                data: {
                    idHero: id_hero,
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    ArmyPlace: army_place,
                    ArmyType: ARMY_CONVERT[army_type].city,
                    server: Elkaisar.Config.idServer,
                    token: Elkaisar.Config.OuthToken

                },
                type: 'POST',
                beforeSend: function (xhr) {
                    console.log(this.data)
                    replaceImage(el_to, el_from, amount);
                },
                success: function (data, textStatus, jqXHR) {
                    $("#over_lay_alert").remove();

                    if (isJson(data)) {
                        var json_data = JSON.parse(data);
                    } else {
                        alert(data);
                        return;
                    }

                    if (json_data.state === "ok") {

                        Elkaisar.CurrentCity.City = json_data.City;
                        Elkaisar.Hero.getHero(id_hero).Army = json_data.HeroArmy;


                        army.refreshArmy_rightTrade();
                        army.refreshArmy_leftTrade();

                        city_profile.refresh_army_view();

                        $("#down-trade-army").html(army.downTradeArmy());

                    } else if (json_data.state === "error_3") {
                        alert_box.failMessage("لا يمكن نقل هذه الكمية");
                    } else if (json_data.state === "error_4") {
                        alert_box.failMessage("سعة البطل لا تكفى");
                        console.log(json_data);
                        console.log(getHeroCapById(Number(id_hero)) - getHeroMaxCap(Elkaisar.Hero.getHero(id_hero)));
                    } else if (json_data.state === "error_5") {
                        alert_box.failMessage("البطل ليس فى المدينة");
                    } else if (json_data.state === "error_6") {
                        alert_box.failMessage("لا يوجد جيش يكفى فى المدينة");

                        Elkaisar.City.getCityBase().done(function (data) {
                            $("#down-trade-army").html(army.downTradeArmy());
                        });

                    } else {

                        alert(data);

                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }



        // case army transported from hero to another hero
        else if (army_from === "hero" && army_to === "hero") {

            var id_hero_from = Number($(el_from).parents(".army_container").attr("id_hero"));
            var id_hero_to = Number($(el_to).parents(".army_container").attr("id_hero"));
            var place_from = $.trim($(el_from).parents(".sol").attr("army_place"));
            var place_to = $.trim($(el_to).attr("army_place"));
            var army_type = $.trim($(el_from).attr("army-type"));





            $.ajax({
                url: `${API_URL}/api/AHeroArmy/transArmyFromHeroToHero`,
                data: {
                    amount: amount,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    idHeroFrom: id_hero_from,
                    idHeroTo: id_hero_to,
                    ArmyPlaceFrom: place_from,
                    ArmyPlaceTo: place_to,
                    token: Elkaisar.Config.OuthToken
                },
                type: 'POST',
                beforeSend: function (xhr) {
                    replaceImage(el_to, el_from, amount);
                },
                success: function (data, textStatus, jqXHR) {

                    $("#over_lay_alert").remove();
                    if (isJson(data)) {
                        var json_data = JSON.parse(data);
                    } else {
                        alert(data);
                        return;
                    }


                    if (json_data.state === "ok") {

                        Elkaisar.Hero.getHero(id_hero_from).Army = json_data.HeroArmyFrom;
                        Elkaisar.Hero.getHero(id_hero_to).Army = json_data.HeroArmyTo;

                        army.refreshArmy_leftTrade();
                        army.refreshArmy_rightTrade();


                    } else if (json_data.state === "error_0") {
                        alert_box.failMessage("لا تمتلك هذا البطل");
                    } else if (json_data.state === "error_3") {
                        alert_box.failMessage("لا توجد قوات كافية");
                    } else if (json_data.state === "error_4") {
                        alert_box.failMessage("سعة البطل غير كافية");
                    } else if (json_data.state === "error_5") {
                        alert_box.failMessage("الابطال ليست بالمدينة");
                    } else {
                        alert(data);
                    }


                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }

            });

        }

        // casse hero transported from hero and add in city
        else if (army_from === "hero" && army_to === "city") {

            var army_type = $(el_from).attr("army-type");
            var id_hero = Number($(el_from).parents(".army_container").attr("id_hero"));
            var army_place = $(el_from).parents(".sol").attr("army_place");

            $(document).off("click", ".trans-con");
            var idCity = Elkaisar.CurrentCity.City.id_city;
            $.ajax({
                url: `${API_URL}/api/AHeroArmy/transArmyFromHeroToCity`,
                data: {
                    amount: amount,
                    idHero: id_hero,
                    idCity: Elkaisar.CurrentCity.City.id_city,
                    ArmyPlace: army_place,
                    token: Elkaisar.Config.OuthToken,
                    server: Elkaisar.Config.idServer

                },
                type: 'POST',
                beforeSend: function (xhr) {
                    replaceImage(el_to, el_from, amount);
                },
                success: function (data, textStatus, jqXHR) {
                    $("#over_lay_alert").remove();

                    if (isJson(data)) {
                        var json_data = JSON.parse(data);
                    } else {
                        alert(data);
                        return;
                    }


                    if (json_data.state === "ok") {

                        Elkaisar.City.getCity(idCity).City = json_data.City;
                        Elkaisar.Hero.getHero(id_hero).Army = json_data.HeroArmy;

                        if (Number(id_hero) === Number(Elkaisar.CurrentHero.Army.id_hero)) {
                            Elkaisar.CurrentHero.Army = json_data.HeroArmy;
                            army.refreshArmy_leftTrade();
                        } else if (Number(id_hero) === Number(Elkaisar.NextHero.Army.id_hero)) {
                            Elkaisar.NextHero.Army = json_data.HeroArmy;
                            army.refreshArmy_rightTrade();
                        }



                        $("#down-trade-army").html(army.downTradeArmy());

                    } else if (json_data.state === "error_0") {
                        alert_box.failMessage("لا تمتلك هذا البطل");
                    } else if (json_data.state === "error_1") {
                        alert_box.failMessage("البطل لا يمتلك هذه الخانة");
                    } else if (json_data.state === "error_2") {
                        alert_box.failMessage("نوع القوات غير صحيح");
                    } else if (json_data.state === "error_3") {
                        alert_box.failMessage("القيمة اقل من صفر");
                    } else if (json_data.state === "error_4") {
                        alert_box.failMessage("لا توجد قوات كافية بالبطل");
                    } else if (json_data.state === "error_5") {
                        alert_box.failMessage("البطل ليس بالمدينة");
                    } else {

                        alert(data);

                    }

                    city_profile.refresh_army_view();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
        $(document).off("click", ".trans-con");/*  بوقف الايفنت عشان  كان بيشتغل على النتيجة الى قبلها */

    });




}



function replaceImage(el_to, el_from, amount) {


    /* بجيب الصورة  بتاعة النوع الى انا ساحبة */
    var src = $(el_from).attr("src");
    var army_type = $(el_from).attr("army-type");/* هنا بجيبب النوع ذات نفسة*/
    var img = ARMY_CONVERT[army_type].img;

    $(el_to).children("button").children(".img-bg").css({"background-image": `url(${img})`});/* ببدل صورة العنصر الى انا رايحلة بالصورة  الى معايا*/
    $(el_to).children("button").attr("army-type", army_type);/* بغير نوع الجيش الى انا رايحلة بالجنوع الى معايا */
    $(el_to).attr("army-type", army_type);/* بغير النوع بردوا بس للاب الة هو ليست ايتم*/


    var el_to_amount = $(el_to).children(".amount").attr("amount");
    var el_from_amount = $(el_from).next(".amount").attr("amount");

    $(el_to).children(".amount").attr("amount", Number(amount) + Number(el_to_amount));
    $(el_to).children(".amount").html(Number(amount) + Number(el_to_amount));


    $(el_from).next(".amount").attr("amount", Number(el_from_amount) - Number(amount));
    $(el_from).next(".amount").html(Number(el_from_amount) - Number(amount));

    /* بعد دة بقى لما يكون انا واخد جيش بس مش من المدينة 
     *  كدة ممكن اكون ساحب الجيش كله
     *  عشان كدة انا محتاج اغير وع الجيش والصورة*/
    if ($(el_from).parents(".army_container").attr("army") !== "city") {

        if (Number(el_from_amount) - Number(amount) === 0) {
            /* change image*/
            $(el_from).attr("src", "images/tech/no_army.png");
            $(el_from).children(".img-bg").css({"background-image": `url(images/tech/no_army.png)`});
            ;

            $(el_from).parents(".sol").attr("army-type", "sol-0");/* change_parent attr*/
            $(el_from).attr("army-type", "sol-0");/*  change  image  army type*/

        }

    }
}


// get hero equip
function getHeroEquip(id_hero) {


}

// get equip images and data

function getEquipData(eq_part) {

    if (eq_part) {
        var image = Equipment.getImage(eq_part["type"], eq_part["part"], eq_part["lvl"] || 1);
        var EquData = Equipment.getEquipData(eq_part["type"], eq_part["part"], eq_part["lvl"] || 1);
        var data = {
            image: image,
            id_equip: eq_part.id_equip,
            type: eq_part.type,
            vit: EquData.vit,
            attack: EquData.attack,
            defence: EquData.defence,
            damage: EquData.damage,
            lvl: eq_part["lvl"]
        };
        return data;
    }
    return {
        image: "images/tech/no_army.png",
        id_equip: -1,
        type: "none",
        vit: 0,
        attack: 0,
        defence: 0,
        damage: 0,
        lvl: 0
    };
}


function getMinSpeed()
{
    var min = 900; // fastest speed

    if (min > speeds[Elkaisar.CurrentHero.Army.f_1_type] && Number(Elkaisar.CurrentHero.Army.f_1_type) !== 0) {

        min = speeds[Elkaisar.CurrentHero.Army.f_1_type];

    }
    if (min > speeds[Elkaisar.CurrentHero.Army.f_2_type] && Number(Elkaisar.CurrentHero.Army.f_2_type) !== 0) {

        min = speeds[Elkaisar.CurrentHero.Army.f_2_type];

    }
    if (min > speeds[Elkaisar.CurrentHero.Army.f_3_type] && Number(Elkaisar.CurrentHero.Army.f_3_type) !== 0) {

        min = speeds[Elkaisar.CurrentHero.Army.f_3_type];

    }
    if (min > speeds[Elkaisar.CurrentHero.Army.b_1_type] && Number(Elkaisar.CurrentHero.Army.b_1_type) !== 0) {

        min = speeds[Elkaisar.CurrentHero.Army.b_1_type];

    }
    if (min > speeds[Elkaisar.CurrentHero.Army.b_2_type] && Number(Elkaisar.CurrentHero.Army.b_2_type) !== 0) {

        min = speeds[Elkaisar.CurrentHero.Army.b_2_type];

    }
    if (min > speeds[Elkaisar.CurrentHero.Army.b_3_type] && Number(Elkaisar.CurrentHero.Army.b_3_type) !== 0) {

        min = speeds[Elkaisar.CurrentHero.Army.b_3_type];

    }
    return min;
}

/*   calculate time needed to attak */
function calAttakTime()
{

    var x_coord = battel_data.x_coord;
    var y_coord = battel_data.y_coord;
    var type = Number(WorldUnit.getWorldUnit(battel_data.x_coord, battel_data.y_coord).ut);

    if (!x_coord || !y_coord || !type) {
        return (0);
    }

    if (WorldUnit.isAsianSquads(type)
            || WorldUnit.isGangStar(type)
            || WorldUnit.isCarthagianArmies(type)
            || WorldUnit.isArenaChallange(type)
            || WorldUnit.isArenaDeath(type)
            || WorldUnit.isArmyCapital(type)
            || WorldUnit.isMonawrat(type)) {
        battel_data.time = 120;
        return 120;
    } else if (WorldUnit.isArenaGuild(type)) {
        return  5 * 60;
    } else if (WorldUnit.isCity(type)) {

        var dist = getDistance(x_coord, y_coord);
        battel_data.time = Math.ceil(dist / getMinSpeed());
        return Math.max(Math.ceil(dist / getMinSpeed()), 15 * 60);

    } else {
        var dist = getDistance(x_coord, y_coord);
        battel_data.time = Math.ceil(dist / getMinSpeed());
        return Math.ceil(dist / getMinSpeed());
    }


}


/*            is hero empty*/
function heroIsEmpty() {

    for (var cell in Elkaisar.CurrentHero.Army) {
        if (parseInt(Elkaisar.CurrentHero.Army[cell]) !== 0 && cell !== "id_hero" && cell !== "id_player") {

            return false;
        }

    }

    return true;

}


$(document).on("mousedown", ".sol img", function () {

    if ($(this).attr("army-type") === "sol-0") {
        $(this).attr("ondragstart", "return false;");
    }
});




var army = {

    dialogBox: function (title, nav_bar, content) {
        var nav_list = "";
        nav_bar.forEach(function (one, index)
        {
            nav_list += ` <li head_title = "${one["title"]}" class="${index === 0 ? "selected" : ""}" >
                                   ${one[("title_" + UserLag.language)] }
                               </li>`;
        });



        return `
                    <div id='dialg_box'>
                        <div class="head_bar">
                           <img src="images/style/head_bar.png">
                           <div class="title">${title} </div>
                        </div>
                        <div class="nav_bar">
                            <div class="left-nav">
                                <ul>${nav_list}</ul>
                            </div>
                            <div class="right-nav">
                                <div class="nav_icon">
                                    <img  class ="close_dialog" src="images/btns/close_b.png">
                                </div>
                            </div>
                        </div>
                        ${content}
                    </div>`;
    },

    /*
     * this will be the global list of hero
     * if   the list is for hero  all heros will be shown
     */
    hero_list: function () {


        var all_heros = "";
        var HeroLen = 0;
        var consoleHero = Elkaisar.CurrentCity.City.console;
        for (var iii in Elkaisar.DPlayer.Heros)
        {
            var Hero = Elkaisar.DPlayer.Heros[iii];
            var sel = "";
            if (Number(Hero.Hero.id_city) !== Number(Elkaisar.CurrentCity.City.id_city))
                continue;

            var state = '<img src="images/icons/h_s_incity.png" >';
            if (Number(Hero.Hero.id_hero) === Number(consoleHero)) {

                state = '<img src="images/icons/h_s_console.png">';

            } else if (Number(Hero.Hero.in_city) === 0) {

                state = '<img src="images/icons/h_s_attack_2.png">';

            } else if (Number(Hero.Hero.in_city) === -1) {

                state = '<img src="images/icons/h_s_support.png">';

            }

            if (Number(Hero.Hero.id_hero) === Number(Elkaisar.CurrentHero.Hero.id_hero)) {
                sel = "selected";
            }

            all_heros += `             <div class="tr ${sel} flex" id_hero="${Hero.Hero.id_hero}">
                                            <div class="pull-L hero_lvl-box">${getArabicNumbers(Hero.Hero.lvl)}</div>
                                            <div class="hero-name ellipsis pull-L ${Hero.Hero.ultra_p > 0 ? "POT-HERO" : ""}">${Hero.Hero.name}</div>
                                            <div class="hero-state pull-L">${state}</div>
                                        </div>`;
            HeroLen++;
        }

        if (HeroLen > 13) {
            return all_heros;

        } else {
            for (var iii = 0; iii < 13 - HeroLen; iii++) {
                all_heros += "<div class='tr'></div>";
            }
            return all_heros;
        }
    },
    left_content: function () {


        var left_content = `<div class="left-content ">
                                <div id="city-hero-list" class="hero-list scrollable">
                              ${this.hero_list()}
                                </div>
                                <div id="order-hero">
                                    <div class="wrapper">
                                        <button class="order-up" data-order="up"></button>
                                        <button class="order-down" data-order="down"></button>
                                    </div>
                                </div>
                            </div>`;
        return left_content;
    },
    middle_content: function (hero) {

        if (parseInt(Elkaisar.CurrentHero.Hero.console) === 0) {
            var console = Translate.Button.Hero.AppointConsul[UserLag.language];
            var console_class = "add_console";
        } else {
            var console = Translate.Button.Hero.DismissConsul[UserLag.language];
            var console_class = "remove_console";
        }

        Elkaisar.CurrentHero.Hero.add_p_a = 0;
        Elkaisar.CurrentHero.Hero.add_p_b = 0;
        Elkaisar.CurrentHero.Hero.add_p_c = 0;


        var state = '<img src="images/icons/h_s_incity.png" class="img-sml pull-R" >';
        var state_ar_title = "فى المدينة";

        if (Number(Elkaisar.CurrentHero.Hero.console) === 1) {

            state = '<img src="images/icons/h_s_console.png"  class="pull-R">';
            state_ar_title = "قنصل المدينة";

        } else if (Number(Elkaisar.CurrentHero.Hero.in_city) === 0) {

            state = '<img src="images/icons/h_s_attack_2.png"  class="img-sml pull-R">';
            state_ar_title = "يهاجم";

        } else if (Number(Elkaisar.CurrentHero.Hero.in_city) === -1) {

            state = '<img src="images/icons/h_s_support.png" class="img-sml pull-R">';
            state_ar_title = "حراسة";
        }

        var middle_content = `<div class="middle-content hero-profile">
                                    <div class="part-1 flex">
                                        <div class="hero_img pull-L">
                                            <img class="img-mid" src ="${Elkaisar.BaseData.HeroAvatar[Elkaisar.CurrentHero.Hero.avatar]}"/>
                                            <div class="hero_lvl-box" hero-lvl="${hero.Hero.lvl}">
                                                ${getArabicNumbers(hero.Hero.lvl)}
                                            </div>
                                        </div>
                                        <div class="hero-data pull-L">
                                            <div class="upper">
                                                <div class="pull-R">
                                                    <img src="images/btns/edit.png" class="img-sml" id="change-hero-name"/>
                                                </div>
                                                <div class="pull-R ${hero.Hero.ultra_p > 0 ? "POT-HERO" : ""}">
                                                   ${hero.Hero.name}
                                                </div>
                                            </div>
                                            <hr/>
                                            <div class="bottom flex">
                                                <div class="state-hero flex">
                                                    <span class="header-2">${state_ar_title}</span> 
                                                    ${state}
                                                </div>
                                                <div class="train btn-sml pull-R">
                                                    <button class="full-btn full-btn-3x">${Translate.Button.Hero.Exercise[UserLag.language]}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="part-2 prief">
                                        <table border="1">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        المستوى
                                                    </td>
                                                    <td colspan="1"  hero-lvl="${hero.Hero.lvl}">
                                                      ${ getArabicNumbers(hero.Hero.lvl)}
                                                    </td>
                                                    <td colspan="2">
                                                        <button class="full-btn full-btn-1x btn-sml hero_up_lvl pull-R ellipsis" ${(hero.Hero.exp > getReqHeroXp(hero.Hero.lvl)) ? "" : "disabled='disabled'"}>
                                                            ${Translate.Button.General.Upgrade[UserLag.language]}
                                                        </button>
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td>
                                                        الراتب
                                                    </td>
                                                    <td colspan="1">
                                                        ${getArabicNumbers(hero.Hero.lvl * 20)}
                                                    </td>
                                                    <td colspan="2">
                                                        <button class="full-btn btn-sml pull-R full-btn-1x FIRE_HERO">${Translate.Button.Hero.Dismiss[UserLag.language]}</button>
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td>
                                                        الامكانيات
                                                    </td>
                                                    <td colspan="3" ${hero.Hero.ultra_p > 0 ? "class='POT-HERO'" : ""}>
                                                        ${getArabicNumbers(hero.Hero.ultra_p)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="part-2 part-3">
                                        <table border="1">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        الخبرة
                                                    </td>
                                                    <td colspan="2">
                                                        <div class="over-text ">${hero.Hero.lvl < 255 ? getArabicNumbers(hero.Hero.exp) : ""}/${hero.Hero.lvl < 255 ? (getReqHeroXp(hero.Hero.lvl)) : ""}</div>
                                                        <div class="colored-bar exp" style="width: ${Math.min((hero.Hero.exp / getReqHeroXp(hero.Hero.lvl)) * 100, 100)}%"></div>
                                                    </td>
                                                    <td>
                                                        <div class="full-btn btn-sml pull-R">
                                                            <div class="add_xp pluse"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td>
                                                        القوة البدنية
                                                    </td>
                                                    <td colspan="2">
                                                        <div class="over-text">${getArabicNumbers(hero.Hero.power)}/${getArabicNumbers(getMaxPower(hero.Hero.lvl))}</div>
                                                        <div class="colored-bar power" style="width: ${Math.min((hero.Hero.power / getMaxPower(hero.Hero.lvl)) * 100, 100)}%"></div>
                                                    </td>
                                                    <td>
                                                        <div class="full-btn btn-sml pull-R">
                                                            <div class="add_power pluse"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td>
                                                        الولاء
                                                    </td>
                                                    <td colspan="2">
                                                        <div class="over-text">${getArabicNumbers(hero.Hero.loyal)}/100</div>
                                                        <div class="colored-bar loy" style="width: ${hero.Hero.loyal}%"></div>
                                                    </td>
                                                    <td>
                                                        <div class="full-btn btn-sml pull-R">
                                                            <div class="add_loy pluse"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                   <div class="part-2 part-4">
                                        <table border="1">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        نقاط التقسيم
                                                    </td>
                                                    <td p-num="${hero.Hero.points}">
                                                       ${getArabicNumbers(hero.Hero.points)}
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td>
                                                        قوة السيطرة
                                                    </td>
                                                    <td>
                                                         <div class="pull-L  domain-point">
                                                            <div class="point pull-L" p-num="${Number(hero.Hero.point_a)}">
                                                                ${Number(hero.Hero.point_a) + Math.ceil(Elkaisar.CurrentHero.Medal.medal_ceasro > Date.now() / 1000 ? (hero.Hero.point_a * 25 / 100) : 0)}
                                                            </div>
                                                            <div class="point pull-R">
                                                               + ${getArabicNumbers(hero.Hero.point_a_plus)}
                                                            </div>
                                                        </div>
                                                        <div class="pull-R">
                                                            <button class="add_point" ${Elkaisar.CurrentHero.Hero.points > 0 ? "" : 'disabled="disabled"'} data-point="point_a" amount="1" for="add_p_a">+</button>
                                                            <button class="add_point" ${Elkaisar.CurrentHero.Hero.points > 0 ? "" : 'disabled="disabled"'} data-point="point_a" amount="3" for="add_p_a">3</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td>
                                                        الشجاعة
                                                    </td>
                                                    <td>
                                                        <div class="pull-L attack-point">
                                                            <div class="point pull-L" p-num="${Number(hero.Hero.point_b)}">
                                                              ${Number(hero.Hero.point_b) + Math.ceil(Elkaisar.CurrentHero.Medal.medal_den > Date.now() / 1000 ? (hero.Hero.point_b * 25 / 100) : 0)}
                                                            </div>
                                                            <div class="point pull-R">
                                                               + ${getArabicNumbers(hero.Hero.point_b_plus)}
                                                            </div>
                                                        </div>
                                                        <div class="pull-R">
                                                            <button class="add_point" ${Elkaisar.CurrentHero.Hero.points > 0 ? "" : 'disabled="disabled"'} data-point="point_b" amount="1" for="add_p_b">+</button>
                                                            <button class="add_point" ${Elkaisar.CurrentHero.Hero.points > 0 ? "" : 'disabled="disabled"'} data-point="point_b" amount="3" for="add_p_b">3</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        الدفاع
                                                    </td>
                                                    <td>
                                                        <div class="pull-L def-point">
                                                            <div class="point pull-L" p-num="${Number(hero.Hero.point_c)}">
                                                               ${parseInt(hero.Hero.point_c) + Math.ceil(Elkaisar.CurrentHero.Medal.medal_leo > Date.now() / 1000 ? (hero.Hero.point_c * 25 / 100) : 0)}
                                                            </div>
                                                            <div class="point pull-R">
                                                               + ${getArabicNumbers(hero.Hero.point_c_plus)}
                                                            </div>
                                                        </div>
                                                        <div class="pull-R">
                                                            <button class="add_point" ${Elkaisar.CurrentHero.Hero.points > 0 ? "" : 'disabled="disabled"'} data-point="point_c" amount="1" for="add_p_c">+</button>
                                                            <button class="add_point" ${Elkaisar.CurrentHero.Hero.points > 0 ? "" : 'disabled="disabled"'} data-point="point_c" amount="3" for="add_p_c">3</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="part-5">
                                        <div class="pull-R"><button class="full-btn full-btn-3x return_points_all">${Translate.Button.Hero.Reverse[UserLag.language]}</button></div>
                                        <div class="pull-L"><button class="full-btn full-btn-3x return_points" disabled="disabled">${Translate.Button.Hero.Reset[UserLag.language]}</button></div>
                                        <div class="pull-L"><button class="full-btn full-btn-3x save_points" disabled="disabled">${Translate.Button.Hero.Save[UserLag.language]}</button></div>
                                    </div>
                                    <div class="part-6">
                                         <div class="full-btn full-btn-2x  ${console_class}">${console}</div>
                                    </div>
                                </div>`;
        return middle_content;
    },
    getCurrentArmy: function (hero) {


        return $.ajax({
            url: `${API_URL}/api/AHeroArmy/refreshHeroArmy`,
            data: {
                idHero: hero.Hero.id_hero,
                token: Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'GET',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                if (!Elkaisar.LBase.isJson(data))
                    return Elkaisar.LBase.Error(data);

                var JsonObject = JSON.parse(data);
                Elkaisar.Hero.getHero(hero.Hero.id_hero).Army = JsonObject.HeroArmy;

                $("#after-ajax-hero-army").html(Hero.armyReview());
                $("#after-ajax-hero-cap").html(getArabicNumbers(getHeroCap(Elkaisar.Hero.getHero(hero.Hero.id_hero).Army)) + "/" + getArabicNumbers(getHeroMaxCap(Elkaisar.Hero.getHero(hero.Hero.id_hero))));
                $("#after-ajax-hero-cap").next(".filak").css("width", (getHeroCap(Elkaisar.Hero.getHero(hero.Hero.id_hero).Army) * 100 / getHeroMaxCap(Elkaisar.Hero.getHero(hero.Hero.id_hero))) + "%");

                army.refreshArmy_leftTrade();
                army.refreshArmy_rightTrade();

            },

            error: function (jqXHR, textStatus, errorThrown) {

                console.log(errorThrown);

            }
        });
    },
    refreshArmy_leftTrade: function (army) {
        if (!army)
            army = Elkaisar.CurrentHero.Army;
        var army_list = `
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="f_1_1" army_place="f_1"  army-type="sol-${army.f_1_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-1" army-type="sol-${army.f_1_type}" src="images/tech/${army_typs[army.f_1_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.f_1_type]})"></div>
                            </button>
                             
                            <div class="amount ${Fixed.getArmyAmountColor(army.f_1_num)}" amount="${army.f_1_num}">${getArabicNumbers(army.f_1_num)}</div>
                        </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="f_2_1" army_place="f_2"  army-type="sol-${army.f_2_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-2" army-type="sol-${army.f_2_type}" src="images/tech/${army_typs[army.f_2_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.f_2_type]})"></div>
                            </button>
                            <div class="amount ${Fixed.getArmyAmountColor(army.f_2_num)}" amount="${army.f_2_num}">${getArabicNumbers(army.f_2_num)}</div>
                        </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="f_3_1" army_place="f_3"  army-type="sol-${army.f_3_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-3" army-type="sol-${army.f_3_type}" src="images/tech/${army_typs[army.f_3_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.f_3_type]})"></div>
                            </button>
                            <div class="amount ${Fixed.getArmyAmountColor(army.f_3_num)}" amount="${army.f_3_num}">${getArabicNumbers(army.f_3_num)}</div>
                        </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="b_1_1" army_place="b_1"  army-type="sol-${army.b_1_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-4" army-type="sol-${army.b_1_type}" src="images/tech/${army_typs[army.b_1_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.b_1_type]})"></div>
                            </button>
                            <div class="amount ${Fixed.getArmyAmountColor(army.b_1_num)}" amount="${army.b_1_num}">${getArabicNumbers(army.b_1_num)}</div>
                         </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="b_2_1" army_place="b_2"  army-type="sol-${army.b_2_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-5" army-type="sol-${army.b_2_type}" src="images/tech/${army_typs[army.b_2_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.b_2_type]})"></div>
                            </button>
                            <div class="amount ${Fixed.getArmyAmountColor(army.b_2_num)}" amount="${army.b_2_num}">${getArabicNumbers(army.b_2_num)}</div>
                         </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="b_3_1" army_place="b_3"  army-type="sol-${army.b_3_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-6" army-type="sol-${army.b_3_type}" src="images/tech/${army_typs[army.b_3_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.b_3_type]})"></div>
                            </button>
                            <div class="amount ${Fixed.getArmyAmountColor(army.b_3_num)}" amount="${army.b_3_num}">${getArabicNumbers(army.b_3_num)}</div>
                        </li>
                            `;


        $("#hero-left-ol").html(army_list);
        $("#A_A_R_Hero_cap").html(getHeroCapById(army.id_hero) + "/" + getHeroMaxCap(Elkaisar.Hero.getHero(army.id_hero)));

    },
    refreshArmy_rightTrade: function (army) {

        if (!army)
            army = Elkaisar.NextHero.Army;
        if(!army)
            return ;

        var army_list = `
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="f_1_2" army_place="f_1"  army-type="sol-${army.f_1_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-1-2" army-type="sol-${army.f_1_type}" src="images/tech/${army_typs[army.f_1_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.f_1_type]})"></div>
                            </button>
                            <div class="amount ${Fixed.getArmyAmountColor(army.f_1_num)}" amount="${army.f_1_num}">${getArabicNumbers(army.f_1_num)}</div>
                        </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="f_2_2" army_place="f_2"  army-type="sol-${army.f_2_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-2-2" army-type="sol-${army.f_2_type}" src="images/tech/${army_typs[army.f_2_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.f_2_type]})"></div>
                            </button>
                            <div class="amount stroke ${Fixed.getArmyAmountColor(army.f_2_num)}" amount="${army.f_2_num}">${getArabicNumbers(army.f_2_num)}</div>
                         </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="f_3_2" army_place="f_3"  army-type="sol-${army.f_3_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-3-2" army-type="sol-${army.f_3_type}" src="images/tech/${army_typs[army.f_3_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.f_3_type]})"></div>
                            </button>
                            <div class="amount stroke ${Fixed.getArmyAmountColor(army.f_3_num)}" amount="${army.f_3_num}">${getArabicNumbers(army.f_3_num)}</div>
                        </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="b_1_2" army_place="b_1"  army-type="sol-${army.b_1_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-4-2" army-type="sol-${army.b_1_type}" src="images/tech/${army_typs[army.b_1_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.b_1_type]})"></div>
                            </button>
                            <div class="amount stroke ${Fixed.getArmyAmountColor(army.b_1_num)}" amount="${army.b_1_num}">${getArabicNumbers(army.b_1_num)}</div>
                        </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="b_2_2" army_place="b_2"  army-type="sol-${army.b_2_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-5-2" army-type="sol-${army.b_2_type}" src="images/tech/${army_typs[army.b_2_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.b_2_type]})"></div>
                            </button>

                             <div class="amount stroke ${Fixed.getArmyAmountColor(army.b_2_num)}" amount="${army.b_2_num}">${getArabicNumbers(army.b_2_num)}</div>
                         </li>
                        <li class="sol hero_sol dropArmyImage dargOverArmyImage" id="b_3_2" army_place="b_3"  army-type="sol-${army.b_3_type}">
                            <div class="permit-layer"></div>
                            <button class="unit-wrapper armyImageDragToChange" id="cell-6-2" army-type="sol-${army.b_3_type}" src="images/tech/${army_typs[army.b_3_type]}" draggable="true"  >
                               <div class="img-bg" style="background-image: url(images/tech/${army_typs[army.b_3_type]})"></div>
                            </button>
                            <div class="amount stroke ${Fixed.getArmyAmountColor(army.b_3_num)}" amount="${army.b_3_num}">${getArabicNumbers(army.b_3_num)}</div>
                        </li>
                        `;


        $("#hero-right-ol").html(army_list);
        $("#sec-hero-filak").html(getHeroCapById(Number(army.id_hero)) + "/" + getHeroMaxCap(Elkaisar.Hero.getHero(army.id_hero)));

    },
    dialogBoxContent_forHeroRight: function (hero) {

        return  `   <div id="hero-wrapper">
                        ${this.middle_content(hero)}
                        <div class="right-content">
                             <div class="row row-1">
                                 <div class="medal mid-1">
                                     <img src="images/icons/hero/25_domain.png" class="pull-L" m_type="medal_ceasro"/>
                                     <div class="header-2 pull-R">
                                        ${Elkaisar.CurrentHero.Medal.medal_ceasro > Date.now() / 1000 ? ` زيادة السيطرة بنسبة ٢٥%  : <span class="time_counter" time-end="${(Elkaisar.CurrentHero.Medal.medal_ceasro)}"></span>` : ""}
                                     </div>
                                 </div>
                                 <div class="medal mid-2">
                                     <img src="images/icons/hero/25_attack.png" class="pull-L" m_type="medal_den"/> 
                                     <div class="header-2 pull-R">
                                     ${Elkaisar.CurrentHero.Medal.medal_den > Date.now() / 1000 ? ` زيادة الشجاعة بنسبة ٢٥%  : <span class="time_counter" time-end="${(Elkaisar.CurrentHero.Medal.medal_den)}"></span>` : ""}
                                     </div>
                                 </div>
                                 <div class="medal mid-3">
                                     <img src="images/icons/hero/25_def.png" class="pull-L" m_type="medal_leo"/>
                                     <div class="header-2 pull-R">
                                         ${Elkaisar.CurrentHero.Medal.medal_leo > Date.now() / 1000 ? ` زيادة الدفاع بنسبة ٢٥%  : <span class="time_counter" time-end="${(Elkaisar.CurrentHero.Medal.medal_leo)}"></span>` : ""}
                                     </div>
                                 </div>
                                 <div class="medal mid-4">
                                     <img src="images/icons/hero/ceaser_eagle.png" class="pull-L" m_type="ceaser_eagle"/>
                                     <div class="header-2 pull-R"> 
                                         ${Elkaisar.CurrentHero.Medal.ceaser_eagle > Date.now() / 1000 ? `زيادة السعة بنسبة ٢٥%  : <span class="time_counter" time-end="${(Elkaisar.CurrentHero.Medal.ceaser_eagle)}"></span>` : ""}
                                     </div>
                                 </div>
                             </div>
                             <div class="row row-2 equi_preveiw">
                                ${Hero.equipBreview()}
                             </div>
                             <div class="row row-3">
                                 <div class="pull-L col-1">الجنود- الفيلق</div>                       
                                 <div class="pull-L col-2">
                                     <div class="over-text " id="after-ajax-hero-cap">${getHeroCapById(Elkaisar.CurrentHero.Hero.id_hero) + "/" + getHeroMaxCap(Elkaisar.CurrentHero)}</div>
                                     <div class="colored-bar filak" style="width: ${Math.min((getHeroCapById(Elkaisar.CurrentHero.Hero.id_hero) * 100 / getHeroMaxCap(Elkaisar.CurrentHero)), 100) + "%"}"></div>
                                 </div>
                                 <div class="pull-L col-3">
                                     <div class="pluse add-eagle-to-hero"></div>
                                 </div>
                             </div>
                             <div class="row row-4">
                                 <div class="col-1" id="after-ajax-hero-army">
                                     ${Hero.armyReview()}
                                 </div>
                                 <div class="col-2">
                                         <button class="full-btn full-btn-3x" ${Hero.inBattel(Elkaisar.CurrentHero) ? "" : "disabled = 'disabled'"}>استعادة</button>
                                 </div>
                             </div>
                         </div>
                    
                    </div>`;


    },
    dialogBoxContent_forHero: function (hero) {

        var hero_content = ` <div  id="hero-dial-over-view" class="box_content hero_dial">
                               ${this.left_content()}
                               ${this.dialogBoxContent_forHeroRight(hero)}
                            </div>`;
        return hero_content;
    },
    dialogBoxContent_forCampRight: function (hero, battel) {

        if (typeof battel !== "undefined") {
            battel_data.x_coord = battel.x_coord;
            battel_data.y_coord = battel.y_coord;
            battel_data.ar_title = battel.ar_title;
            battel_data.task = battel.task;
            battel_data.time = battel.time;
            battel_data.task_title = BATTAL_TASKS[battel.task].ar_title;
            battel_data.type = battel.type;
        }


        return `<div id="hero-wrapper">
                ${this.middle_content(Elkaisar.CurrentHero)}
                <div class="right-content">
                    <div class="row row-1">
                        <div>
                             <label class="header-2">المهام</label>
                            <select name="target">

                                <option value="${battel_data.task}" selected> ${battel_data.task_title}</option>

                            </select>
                            <label class="header-2">هدف</label>
                            <select name="tasks">
                                <option> ${battel_data.ar_title}</option>
                            </select>
                        </div>
                        <div style="direction: rtl">
                            <label class="header-2"> وقت الارسال:</label> <span id="AFTER_AJAX_ATTACK_TIME">${changeTimeFormat(calAttakTime())}</span>
                        </div>
                        <div style="direction: rtl">
                            <label class="header-2">اعلان:</label> 
                            <input type="checkbox" name="friend" value="ON" />
                            <label class="header-2">الاصدقاء</label> 
                            <input type="checkbox" name="friend" value="ON" />
                            <label class="header-2">${Translate.Button.Chat.League[UserLag.language]}</label> 
                        </div>
                        <h1 class="header-2">شروط الانسحاب</h1>
                        <div style="direction: rtl">
                            <div>
                                <input type="checkbox" name="friend" value="ON" />
                                <label class="header-2">انتهاء كل قواتك</label> 
                            </div>
                            <div>
                                <input type="checkbox" name="friend" value="ON" />
                                <label class="header-2">انتهاء نسبة من قواتك</label> 
                            </div>
                        </div>
                    </div>
                    <div class="row row-2 equi_preveiw">
                        ${Hero.equipBreview()}
                    </div>
                    <div class="row row-3">
                        <div class="pull-L col-1">الجنود- الفيلق</div>                       
                        <div class="pull-L col-2">
                            <div class="over-text "> ${(getHeroCapById(Elkaisar.CurrentHero.Hero.id_hero))}/${(getHeroMaxCap(Elkaisar.CurrentHero))}</div>
                            <div class="colored-bar filak" style="width:${getHeroCapById(Elkaisar.CurrentHero.Hero.id_hero) * 100 / getHeroMaxCap(Elkaisar.CurrentHero)}%"></div>
                        </div>
                        <div class="pull-L col-3">
                            <div class="pluse add-eagle-to-hero"></div>
                        </div>
                    </div>
                    <div class="row row-4">
                        <div class="col-1" id="after-ajax-hero-army">
                          ${Hero.armyReview()}
                        </div>
                        <div class="col-2">
                              <button class="full-btn full-btn-3x enter" id="start_battel"  ${ Hero.readyForBattel() ? "" : "disabled='disabled'"}>${Translate.Button.Hero.Launch[UserLag.language]}</button>
                              <button id="confirm_battel"  ${ Hero.readyForBattel() ? "" : "disabled='disabled'"}></button>
                        </div>
                    </div>
                </div>
                 </div>`;
    },
    dialogBoxContent_forCamp: function (hero, battel) {




        var camp_content = `<div class="box_content hero_dial" id="hero-dial-camp">
                                ${this.left_content()}
                                ${this.dialogBoxContent_forCampRight(hero, battel)}
                            </div>`;
        return camp_content;
    },
    rightTrade: function (sec_hero) {

        if (!sec_hero) {
            return;
        }
        Elkaisar.NextHero = sec_hero;
        var state = '<img src="images/icons/h_s_incity.png" class="img-sml pull-R " >';
        var state_ar_title = "فى المدينة";
        if (parseInt(sec_hero.Hero.console) === 1) {

            state = '<img src="images/icons/h_s_console.png"  class="pull-R">';
            state_ar_title = "قنصل المدينة";

        } else if (parseInt(sec_hero.Hero.in_city) === 0) {

            state = '<img src="images/icons/h_s_attack_2.png"  class="img-sml pull-R">';
            state_ar_title = "يهاجم";

        } else if (Number(sec_hero.Hero.in_city) === -1) {

            state = '<img src="images/icons/h_s_support.png" class="img-sml pull-R">';
            state_ar_title = "حراسة";
        }



        var right = `
                    <div class="part-1 flex">
                        <div class="hero_img pull-L">
                            <img class="img-mid" src ="${Elkaisar.BaseData.HeroAvatar[Elkaisar.NextHero.Hero.avatar]}"/>
                            <div class="hero_lvl-box">
                                   ${(Elkaisar.NextHero.Hero.lvl)}
                            </div>
                        </div>
                        <div class="hero-data pull-L">
                            <div class="upper">
                                 <div class="pull-R" style="background-color: red; ">

                                </div>
                                <div class="pull-R">
                                    <div id="selected_hero">
                                        <span  ${Elkaisar.NextHero.Hero.ultra_p > 0 ? "class='POT-HERO'" : ""}>${Elkaisar.NextHero.Hero.name}</span>
                                        <span class="pull-R" style="margin-right: 3px; margin-top: 1px; display:block"><img src="images/btns/down.png" style=" height: 17px;"/></span>
                                    </div>
                                    <div id="select_hero" class="select_option" id_hero="${Elkaisar.NextHero.Hero.id_hero}">
                                        <ol>

                                        </ol>
                                    </div>                    
                                </div> 
                            </div>
                            <hr/>
                            <div class="bottom flex">
                                <div class="state-hero flex">
                                    <span class="header-2">${state_ar_title}</span>
                                    ${state}
                                </div>
                                <div class="train btn-sml pull-R">
                                    <button class="full-btn full-btn-3x"> ${Translate.Button.Hero.Exercise[UserLag.language]}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="part-2 hero-2">
                        <ol style="direction: rtl; clear: both">
                            <li><div class="header-2">القوة البدنية</div> <div class="header-2">${Elkaisar.NextHero.Hero.power}/${getMaxPower(Elkaisar.NextHero.Hero.lvl)}</div></li>
                            <li><div class="header-2">الجنود - الفيلق</div><div class="header-2"  id="sec-hero-filak">${getHeroCap(Elkaisar.NextHero.Army)}/${getHeroMaxCap(Elkaisar.NextHero)}</div></li>
                            <li><div class="header-2">قوة السيطرة</div><div class="header-2 ltr">
                                   ${(parseInt(Elkaisar.NextHero.Hero.point_a) + Math.ceil(Elkaisar.NextHero.Medal.medal_ceasro > Date.now() / 1000 ? (Elkaisar.NextHero.Hero.point_a * 25 / 100) : 0))} + ${sec_hero.Hero.point_a_plus}</div></li>
                            <li><div class="header-2">الشجاعة</div><div class="header-2 ltr">
                                   ${(parseInt(sec_hero.Hero.point_b) + Math.ceil(sec_hero.Medal.medal_den > Date.now() / 1000 ? (sec_hero.Hero.point_b * 25 / 100) : 0))} + ${sec_hero.Hero.point_b_plus}</div></li>
                            <li><div class="header-2"> الدفاع</div><div class="header-2 ltr">
                                   ${(parseInt(sec_hero.Hero.point_c) + Math.ceil(sec_hero.Medal.medal_leo > Date.now() / 1000 ? (sec_hero.Hero.point_c * 25 / 100) : 0))} + ${sec_hero.Hero.point_c_plus}</div></li>    
                        </ol>
                    </div>
                    <div class="row row-4 army_container" id_hero="${Elkaisar.NextHero.Army.id_hero}"  army="hero">
                        <div class="col-1 full">
                            <ol id="hero-right-ol">

                            </ol>
                        </div>
                    </div>
                `;

        $("#after-call-rightTrade").html(right);
        this.getCurrentArmy(Elkaisar.NextHero);
        



    },
    dialogBoxContent_forHeroTradeRight: function (hero_sec) {

        var state = '<img src="images/icons/h_s_incity.png" class="img-sml pull-R" >';
        var state_ar_title = "فى المدينة";
        if (parseInt(Elkaisar.CurrentHero.Hero.console) === 1) {

            state = '<img src="images/icons/h_s_console.png"  class="pull-R">';
            state_ar_title = "قنصل المدينة";

        } else if (parseInt(Elkaisar.CurrentHero.Hero.in_city) === 0) {

            state = '<img src="images/icons/h_s_attack_2.png"  class="img-sml pull-R">';
            state_ar_title = "يهاجم";

        } else if (Number(Elkaisar.CurrentHero.Hero.in_city) === -1) {

            state = '<img src="images/icons/h_s_support.png" class="img-sml pull-R">';
            state_ar_title = "حراسة";
        }
        return `
                        <div id="hero-wrapper">
                            <div class="middle-content">
                                <div class="part-1 flex">
                                    <div class="hero_img pull-L">
                                        <img class="img-mid" src ="${Elkaisar.BaseData.HeroAvatar[Elkaisar.CurrentHero.Hero.avatar]}"/>
                                        <div class="hero_lvl-box">
                                           ${getArabicNumbers(Elkaisar.CurrentHero.Hero.lvl)}
                                        </div>
                                    </div>
                                    <div class="hero-data pull-L">
                                        <div class="upper">
                                            <div class="pull-L"></div>
                                            <div class="pull-R">
                                                   ${Elkaisar.CurrentHero.Hero.name}
                                            </div>
                                        </div>
                                        <hr/>
                                        <div class="bottom flex">
                                            <div class="state-hero flex">
                                                <span class="header-2">${state_ar_title}</span>
                                                ${state}
                                            </div>
                                            <div class="train btn-sml pull-R">
                                                <button class="full-btn"> ${Translate.Button.Hero.Exercise[UserLag.language]}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="part-2 hero-1">
                                    <ol style="direction: rtl; clear: both">
                                        <li><div class="header-2">القوة البدنية</div> <div class="header-2">${Elkaisar.CurrentHero.Hero.power}/${getMaxPower(Elkaisar.CurrentHero.Hero.lvl)}</div></li>
                                        <li><div class="header-2">الجنود - الفيلق</div><div class="header-2" id="A_A_R_Hero_cap">${getHeroCap(Elkaisar.CurrentHero.Army)}/${getHeroMaxCap(Elkaisar.CurrentHero)}</div></li>
                                        <li><div class="header-2">قوة السيطرة</div><div class="header-2 ltr">
                                            ${parseInt(Elkaisar.CurrentHero.Hero.point_a) + Math.ceil(Elkaisar.CurrentHero.Medal.medal_ceasro > Date.now() / 1000 ? (Elkaisar.CurrentHero.Hero.point_a * 25 / 100) : 0)} + ${Elkaisar.CurrentHero.Hero.point_a_plus}</div></li>
                                        <li><div class="header-2">الشجاعة</div><div class="header-2 ltr">
                                            ${parseInt(Elkaisar.CurrentHero.Hero.point_b) + Math.ceil(Elkaisar.CurrentHero.Medal.medal_den > Date.now() / 1000 ? (Elkaisar.CurrentHero.Hero.point_b * 25 / 100) : 0)} + ${Elkaisar.CurrentHero.Hero.point_b_plus}</div></li>
                                        <li><div class="header-2"> الدفاع</div><div class="header-2 ltr">
                                            ${parseInt(Elkaisar.CurrentHero.Hero.point_c) + Math.ceil(Elkaisar.CurrentHero.Medal.medal_leo > Date.now() / 1000 ? (Elkaisar.CurrentHero.Hero.point_c * 25 / 100) : 0)} + ${Elkaisar.CurrentHero.Hero.point_c_plus}</div></li>    
                                    </ol>
                                </div>
                                <div class="row row-4 army_container" id_hero="${Elkaisar.CurrentHero.Hero.id_hero}"  army="hero">
                                    <div class="col-1 full">
                                        <ol id="hero-left-ol">
                                         
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div class="mid-of-mid pull-L">
                                <div class="trade-btns">
                                    <div class="trade">
                                        <button  id="swap_army"></button>
                                    </div>
                                    <div class="down">
                                        <button  id="left-down" id_hero = "${Elkaisar.CurrentHero.Hero.id_hero}"></button>
                                        <button  id="right-down" id_hero = "${Elkaisar.NextHero !== null ? Elkaisar.NextHero.Hero.id_hero : -1}"></button>
                                    </div>
                                </div>
                            </div>
                            <div class="right-content" id="after-call-rightTrade"> 
                                
                            </div>
                               
                            <div id="down-trade-army" class="down-trade army_container" army="city">
                                ${this.downTradeArmy()}
                            </div>
                        </div>`;
    },
    dialogBoxContent_forHeroTrade: function (hero_sec) {



        var heroTrade = `<div class="box_content hero_dial for_trade">
                            ${this.left_content()}
                            ${this.dialogBoxContent_forHeroTradeRight(hero_sec)}
                        </div>`;
        return heroTrade;
    },
    downTradeArmy() {
        return `<ul>
                    <li class="sol dropArmyImage dargOverArmyImage"  id="d_1"  army-type="sol-1">
                        <div class="permit-layer"></div>
                        <button class="sol-down img armyImageDragToChange" id="sol-1" army-type="sol-1" src="images/tech/soldier01.jpg" draggable="true"  >
                            <div class="img-bg" style="background-image: url(images/tech/soldier01.jpg)"></div>
                        </button>
                        <div class="amount stroke ${Fixed.getArmyAmountColor(Elkaisar.CurrentCity.City.army_a)}" amount="${Elkaisar.CurrentCity.City.army_a}">${Elkaisar.CurrentCity.City.army_a}</div>
                    </li>
                    <li class="sol dropArmyImage dargOverArmyImage"  id="d_2"  army-type="sol-2">
                        <div class="permit-layer"></div>
                        <button class="sol-down img armyImageDragToChange" id="sol-2" army-type="sol-2" src="images/tech/soldier02.jpg" draggable="true"  >
                             <div class="img-bg" style="background-image: url(images/tech/soldier02.jpg)"></div>
                        </button>
                        <div class="amount stroke ${Fixed.getArmyAmountColor(Elkaisar.CurrentCity.City.army_b)}" amount="${Elkaisar.CurrentCity.City.army_b}">${Elkaisar.CurrentCity.City.army_b}</div>
                    </li>
                    <li class="sol dropArmyImage dargOverArmyImage"  id="d_3"  army-type="sol-3">
                        <div class="permit-layer"></div>
                        <button class="sol-down img armyImageDragToChange" id="sol-3" army-type="sol-3" src="images/tech/soldier03.jpg" draggable="true"  >
                             <div class="img-bg" style="background-image: url(images/tech/soldier03.jpg)"></div>
                        </button>
                        <div class="amount stroke ${Fixed.getArmyAmountColor(Elkaisar.CurrentCity.City.army_c)}" amount="${Elkaisar.CurrentCity.City.army_c}">${Elkaisar.CurrentCity.City.army_c}</div>
                    </li>
                    <li class="sol dropArmyImage dargOverArmyImage"  id="d_4"  army-type="sol-4">
                        <div class="permit-layer"></div>
                        <button class="sol-down img armyImageDragToChange" id="sol-4" army-type="sol-4" src="images/tech/soldier04.jpg" draggable="true"  >
                             <div class="img-bg" style="background-image: url(images/tech/soldier04.jpg)"></div>
                        </button>
                        <div class="amount stroke ${Fixed.getArmyAmountColor(Elkaisar.CurrentCity.City.army_d)}" amount="${Elkaisar.CurrentCity.City.army_d}">${Elkaisar.CurrentCity.City.army_d}</div>
                    </li>
                    <li class="sol dropArmyImage dargOverArmyImage"  id="d_5"  army-type="sol-5">
                        <div class="permit-layer"></div>
                        <button  class="sol-down img armyImageDragToChange" id="sol-5" army-type="sol-5" src="images/tech/soldier05.jpg" draggable="true"  >
                             <div class="img-bg" style="background-image: url(images/tech/soldier05.jpg)"></div>
                        </button>
                        <div class="amount stroke ${Fixed.getArmyAmountColor(Elkaisar.CurrentCity.City.army_e)}" amount="${Elkaisar.CurrentCity.City.army_e}">${Elkaisar.CurrentCity.City.army_e}</div>
                    </li>
                    <li class="sol dropArmyImage dargOverArmyImage"  id="d_6"  army-type="sol-6">
                        <div class="permit-layer"></div>
                        <button class="sol-down img armyImageDragToChange"  id="sol-6" army-type="sol-6" src="images/tech/soldier06.jpg" draggable="true"  >
                            <div class="img-bg" style="background-image: url(images/tech/soldier06.jpg)"></div>
                        </button>
                        <div class="amount stroke ${Fixed.getArmyAmountColor(Elkaisar.CurrentCity.City.army_f)}" amount="${Elkaisar.CurrentCity.City.army_f}">${Elkaisar.CurrentCity.City.army_f}</div>
                    </li>
                </ul>`;
    },
    getEquipList: function (offset, part) {

        if (isNaN(offset)) {
            offset = 0;
        }

        if (typeof part !== "string") {
            part = "all";
        }


        var all_equip = "";
        var conter = 0;
        var total = 0;





        var end = Math.min(Elkaisar.DPlayer.Equip.length - offset, 24);

        for (var iii = 0 + offset; iii < Elkaisar.DPlayer.Equip.length; iii++) {

            if ((part === Elkaisar.DPlayer.Equip[iii]["part"] || part === "all") && Elkaisar.DPlayer.Equip[iii].id_hero <= 0) {

                if (conter < end) {

                    var unit_type = Elkaisar.DPlayer.Equip[iii]["type"];
                    var unit_part = Elkaisar.DPlayer.Equip[iii]["part"];
                    var unit_lvl = Elkaisar.DPlayer.Equip[iii]["lvl"];

                    all_equip += `                 <div class="unite-eq">
                                                           <button style="background-image: url(${Equipment.getImage(unit_type, unit_part, unit_lvl - 1)})" 
                                                        id_equip ="${Elkaisar.DPlayer.Equip[iii]["id_equip"]}"
                                                                equip_part="${Elkaisar.DPlayer.Equip[iii]["part"]}"
                                                                equip_type="${Elkaisar.DPlayer.Equip[iii]["type"]}"
                                                                data-offset="${iii}"
                                                                class="avail_equip putable-equi equip-unit" data-equi-part="${unit_part}" data-equi-lvl="${unit_lvl}" data-equi-type="${unit_type}"
                                                               ></button>
                                                    </div>  `;
                    conter++;
                }

                total++;

            }


        }

        for (var jjj = 0; jjj < 24 - conter; jjj++) {
            all_equip += `                 <div class="unite-eq">
                                                       <button disabled="disabled" class="avail_equip" style="background-image: url(images/icons/hero/eq-bg.png)"></button>
                                                </div>  `;
        }


        var i = Math.ceil(offset / 24) + 1;
        var t = Math.floor(total / 24) + 1;
        $("#navigate-btn .lable").html(i + "/" + t);
        return all_equip;
    },
    dialogBoxContent_forEquiRight: function () {
        var all_equip = this.getEquipList();

        var sword = getEquipData(Elkaisar.CurrentHero.Equip.sword);
        var helmet = getEquipData(Elkaisar.CurrentHero.Equip.helmet);
        var boot = getEquipData(Elkaisar.CurrentHero.Equip.boot);
        var armor = getEquipData(Elkaisar.CurrentHero.Equip.armor);
        var shield = getEquipData(Elkaisar.CurrentHero.Equip.shield);

        var belt = getEquipData(Elkaisar.CurrentHero.Equip.belt);
        var necklace = getEquipData(Elkaisar.CurrentHero.Equip.necklace);
        var pendant = getEquipData(Elkaisar.CurrentHero.Equip.pendant);
        var ring = getEquipData(Elkaisar.CurrentHero.Equip.ring);
        var steed = getEquipData(Elkaisar.CurrentHero.Equip.steed);

        return `<div id="hero-wrapper">
                    <div class="middle-content">
                        <div class="part-1 hero-name">
                            <h1 class="header-2 banner-red">${Elkaisar.CurrentHero.Hero.name}</h1>
                        </div>
                        <div class="equip">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="eq-helmet">
                                            <div class="wrapper">
                                                <button data-cat="main" style="background-image: url(${helmet.image})" id="helmet" equip_part="helmet" id_equip="${helmet.id_equip}" class="on_equip" equip_type="${helmet.type}" data-lvl="${helmet.lvl}"></button>
                                            </div>
                                        </td>
                                        <td colspan="2"></td>
                                        <td class="eq-beads">
                                            <div class="wrapper">
                                                <button data-cat="sec" style="background-image: url(${pendant.image})"  id="pendant" equip_part="pendant" id_equip="${pendant.id_equip}" class="on_equip" equip_type="${pendant.type}" data-lvl="${pendant.lvl}"></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="eq-neck">
                                            <div class="wrapper">
                                                <button data-cat="sec" style="background-image: url(${necklace.image})"  id="necklace" equip_part="necklace" id_equip="${necklace.id_equip}" class="on_equip" equip_type="${necklace.type}" data-lvl="${necklace.lvl}"></button>
                                            </div>
                                        </td>
                                        <td colspan="2"></td>
                                        <td class="eq-belt">
                                            <div class="wrapper">
                                                <button data-cat="sec" style="background-image: url(${belt.image})"  id="belt" equip_part="belt" id_equip="${belt.id_equip}" class="on_equip" equip_type="${belt.type}" data-lvl="${belt.lvl}"></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="wrapper">
                                                <button data-cat="main"  style="background-image: url(${armor.image})" id="armor" equip_part="armor" id_equip="${armor.id_equip}" class="on_equip" equip_type="${armor.type}" data-lvl="${armor.lvl}"></button>
                                            </div>
                                        </td>
                                        <td colspan="2"></td>
                                        <td class="eq-ring">
                                            <div class="wrapper">
                                                <button data-cat="sec" style="background-image: url(${ring.image})"  id="ring" equip_part="ring" id_equip="${ring.id_equip}" class="on_equip" equip_type="${ring.type}" data-lvl="${ring.lvl}"></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="eq-boot">
                                            <div class="wrapper">
                                                <button data-cat="main" style="background-image: url(${boot.image})" id="boot" equip_part="boot" id_equip="${boot.id_equip}" class="on_equip" equip_type="${boot.type}" data-lvl="${boot.lvl}"></button>
                                            </div>
                                        </td>
                                        <td class="eq-sword">
                                            <div class="wrapper">
                                                <button data-cat="main" style="background-image: url(${sword.image})" id="sword" equip_part="sword" id_equip="${sword.id_equip}" class="on_equip" equip_type="${sword.type}" data-lvl="${sword.lvl}"></button>
                                            </div>
                                        </td>
                                        <td class="eq-shield">
                                            <div class="wrapper">
                                                <button data-cat="main" style="background-image: url(${shield.image})" id="shield" equip_part="shield" id_equip="${shield.id_equip}" class="on_equip" equip_type="${shield.type}" data-lvl="${shield.lvl}"></button>
                                            </div>
                                        </td>
                                        <td class="eq-horse">
                                            <div class="wrapper">
                                                <button data-cat="sec" style="background-image: url(${steed.image})"  id="steed" equip_part="steed" id_equip="${steed.id_equip}" class="on_equip" equip_type="${steed.type}" data-lvl="${steed.lvl}"></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row row-4">
                            <div class="col-1 full" id="after-ajax-hero-army">
                               ${Hero.armyReview()}
                            </div>
                        </div>
                    </div>
                    <div class="right-content blue-ribbon"> 
                        <div  id="eq-part-select"  class="eq-select-bar">
                            <ul>
                                <li class="selected">
                                    <button data-equi-part="all" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-all.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="sword" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-sword.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="shield" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-shield.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="helmet" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-helmet.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="armor" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-armor.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="belt" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-belt.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="ring" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-ring.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="necklace" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-necklase.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="boot" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-boot.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="pendant" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-meskah.png)"></button>
                                </li>
                                <li>
                                    <button data-equi-part="steed" class="eq-unit-select" style="background-image: url(images/icons/hero/eq-list-horse.png)"></button>
                                </li>
                            </ul>
                        </div>
                        <div id="equip-list-heroDia" class="all-eq-table">
                            ${all_equip}
                        </div>
                        <div id="navigate-btn">
                            <div class="wrapper">
                                <div class="left">
                                    <button  class="GO_L_1 go-one-page-eq-left"></button>
                                </div>
                                <div class="lable">
                                    1/${Math.floor(Elkaisar.DPlayer.Equip.length / 24) + 1}
                                </div>
                                <div class="right">
                                    <button class="GO_R_1 go-one-page-eq-right"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

    },
    dialogBoxContent_forEqui: function () {



        var equi = ` <div  id="hero-dial-equip" class="box_content hero_dial hero-equip">
                       ${this.left_content() }  
                       ${this.dialogBoxContent_forEquiRight()}
                    </div>`;
        return equi;
    },
    dialogBoxContent_forHeroLearnRight: function (hero) {

        return `
                <div id="hero-wrapper">
                    ${this.middle_content(hero)}
                    <div class="right-content learn_hero">
                        <div class="row row-1">
                            <p>
                                 بعد اختيار احدى صفات البطل  ( الشجاعة , قوة السيطرة , الدفاع)
                                 التى تريد تطويرها عليك اختيار نوع الميدالية ثم اضغط تعليم
                                 لانهاء العملية لكل نوع من الميداليات  نسب مختلفة من النجح والفشل
                            </p>
                            <ul>
                                <li>    
                                    <input id="trigger_1" type="radio" name="point_plus_for" checked="true"  value="point_a_plus">
                                    <label for="trigger_1" class="checker"></label>
                                    <span> قوة السيطرة</span>
                                </li>
                                <li>    
                                    <input id="trigger_2" type="radio" name="point_plus_for"  value="point_b_plus">
                                    <label for="trigger_2" class="checker"></label>
                                    <span> الشجاعة</span>
                                </li>
                                <li>    
                                    <input id="trigger_3" type="radio" name="point_plus_for"  value="point_c_plus">
                                    <label for="trigger_3" class="checker"></label>
                                    <span> الدفاع</span>
                                </li>
                            </ul>
                        </div>
                        <div class="row row-2">
                            <div class="max-point">
                                <h1>
                                    اقصى عدد نقاط للسيطرة: ١٠ نقاط
                                </h1>
                                <h1>
                                    اقصى عدد نقاط للشجاعة: ١٠ نقاط
                                </h1>
                                <h1>
                                    اقصى عدد نقاط للدفاع: ١٠ نقاط
                                </h1>

                            </div>
                            <div class="promotion">
                                <div class="th ellipsis">${Translate.Title.TH.RquiredNobleRank[UserLag.language]}</div>
                                <div class="trow bg-btn-blu" id="req_for_medal">قسطور</div>
                                <div class="th ellipsis">${Translate.Title.TH.CurrentNobleRank[UserLag.language]}</div>
                                <div class="trow bg-btn-blu" >${Elkaisar.BaseData.Promotion[Elkaisar.DPlayer.Player.porm].Title}</div>
                            </div>
                        </div>
                        <div class="row row-3">
                        </div>
                        <div class="row row-4">
                            <div matrial_type="motiv_7" class="matrial_unit">
                                <img src=" images/style/Border-up.png" class="border_up">
                                <div class="img-inside-box">
                                    <div class="player_amount">
                                        <img src="images/icons/shopQuantityBG.png">
                                        <p id="medal_amount_player">${getArabicNumbers(Matrial.getPlayerAmount("medal_bronz"))}</p>
                                    </div>
                                    <img id="medal_image" src="${Elkaisar.BaseData.Items['medal_bronz'].image}" class="big-img">

                                </div>
                            </div>
                            <div class="col-2">
                                <ul>
                                    <li>    
                                        <input id="use_coper_med" type="radio" name="used_meddal" class="check-for-medal" checked="true" value="medal_bronz">
                                        <label for="use_coper_med" class="checker"></label>
                                        <span>استعمال ١٠ ميداليات نحاسية</span>
                                    </li>
                                    <li>    
                                        <input id="use_silver_med" type="radio" name="used_meddal" class="check-for-medal"  value="medal_silver">
                                        <label for="use_silver_med" class="checker"></label>
                                        <span>استعمال ١٠ ميداليات فضية</span>
                                    </li>
                                    <li>    
                                        <input id="use_golden_med" type="radio" name="used_meddal" class="check-for-medal"   value="medal_gold">
                                        <label for="use_golden_med" class="checker"></label>
                                        <span>استعمال ١٠ ميداليات ذهبية</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row row-5">
                            <button  class="full-btn full-btn-3x" id="learn-hero-point">${Translate.Button.Hero.Educate[UserLag.language]}</button>
                        </div>
                    </div>
                </div>`;
    },
    dialogBoxContent_forHeroLearn: function (hero) {

        var camp_content = `<div class="box_content hero_dial">
                                ${this.left_content()}
                                ${this.dialogBoxContent_forHeroLearnRight(hero)}
                            </div>`;
        return camp_content;
    }
};

$(document).on("drop", ".dropArmyImage", function (e) {
    e.preventDefault();
    e.stopPropagation();
    drop(e, this);
});
$(document).on("dragover", ".dargOverArmyImage", function (e) {

    allowDrop(e);
});
$(document).on("dragstart", ".armyImageDragToChange", function (e) {

    drag(e, this);
});
$(document).on("dragend", ".armyImageDragToChange", function (e) {

    dragend();
});
/*___________________________clickable nav bar________________________________*/

$(document).on("click", ".left-nav ul  li", function () {

    var head_tite = $(this).attr("head_title");

    switch (head_tite) {
        case "hero":
            var content = army.dialogBoxContent_forHeroRight(Elkaisar.CurrentHero);
            $("#hero-wrapper").replaceWith(content);
            $(".box_content").attr("class", "box_content hero_dial");
            $(".box_content").attr("id", "hero-dial-over-view");
            break;
        case "trade":
            Elkaisar.NextHero = null;
            for (var iii in Elkaisar.DPlayer.Heros)
            {
                var Hero = Elkaisar.DPlayer.Heros[iii];
                if (Number(Elkaisar.CurrentCity.City.id_city) !== Number(Hero.Hero.id_city))
                    continue;
                if (Number(Elkaisar.CurrentHero.Hero.id_hero) === Number(Hero.Hero.id_hero))
                    continue;
                if (Number(Hero.Hero.in_city) !== 1)
                    continue;
                Elkaisar.NextHero = Hero;
                break;
            }

            var content = army.dialogBoxContent_forHeroTradeRight();
            $("#hero-wrapper").replaceWith(content);
            $(".box_content").attr("class", "box_content hero_dial for_trade");
            $(".box_content").removeAttr("id");
            army.rightTrade(Elkaisar.NextHero);
            army.refreshArmy_leftTrade();
            break;

        case "equi":
            var content = army.dialogBoxContent_forEquiRight();
            $("#hero-wrapper").replaceWith(content);
            $(".box_content").attr("class", "box_content hero_dial hero-equip");
            $(".box_content").attr("id", "hero-dial-equip");
            getPlayerEquip();
            break;

        case "camp":

            var content = army.dialogBoxContent_forCampRight(Elkaisar.CurrentHero);
            $("#hero-wrapper").replaceWith(content);
            $(".box_content").attr("class", "box_content hero_dial");
            $(".box_content").attr("id", "hero-dial-camp");
            break;
        case "hero_learning":

            var content = army.dialogBoxContent_forHeroLearnRight(Elkaisar.CurrentHero);
            $("#hero-wrapper").replaceWith(content);
            $(".box_content").attr("class", "box_content hero_dial");
            $(".box_content").removeAttr("id");
            break;
    }

});

$(document).on("click", "#left-down , #right-down", function () {

    // get id_hero
    var id_hero = $(this).attr("id_hero");

    if (!heroAvailableForTask(id_hero)) {
        $("body").append(alert_box.confirmMessage("لا يمكن نقل القوات </br> البطل فى مهمة"));
        return false;

    }

    if ($(this).attr("id") === "left-down") {
        if (getHeroCapById(Elkaisar.CurrentHero.Hero.id_hero) <= 0) {
            return;
        }
    } else {
        if (getHeroCapById(Elkaisar.NextHero.Hero.id_hero) <= 0) {
            return;
        }
    }

    var id_city = Elkaisar.CurrentCity.City.id_city;
    var this_ = $(this);

    $.ajax({
        url: `${API_URL}/api/AHeroArmy/clearHeroArmy`,
        data: {
            idHero: id_hero,
            token: Elkaisar.Config.OuthToken,
            server: Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            waitCursor();
            $("#left-down , #right-down").attr("disabled", "disabled");
        },
        success: function (data, textStatus, jqXHR) {
            unwaitCursor();
            $("#left-down , #right-down").removeAttr("disabled");
            if (isJson(data)) {
                var json_data = JSON.parse(data);
            } else {
                alert(data);
                return;
            }

            if (json_data.state === "ok")
            {
                Elkaisar.City.getCity(id_city).City = json_data.City;

                Elkaisar.Hero.getHero(id_hero).Army = json_data.HeroArmy;

            } else if (json_data.state === "error_1") {
                alert_box.failMessage("البطل ليس فى المدينة");
            }


            city_profile.refresh_army_view();
            army.refreshArmy_leftTrade();
            army.refreshArmy_rightTrade();
            $("#down-trade-army").html(army.downTradeArmy());
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

});


// to  swap  army brtween heros
$(document).on("click", "#swap_army", function () {



    var right_hero_id = $(".right-content").children(".army_container").attr("id_hero");
    var left_hero_id = $(".middle-content").children(".army_container").attr("id_hero");
    var id_city = Elkaisar.CurrentCity.City.id_city;
    var temp_ol = $("#hero-right-ol").html();
    var temp_o_l = $("#hero-left-ol").html();


    var first_cap = getHeroCap(Elkaisar.CurrentHero.Army);
    var sec_cap = getHeroCap(Elkaisar.NextHero.Army);
    var first_max = getHeroMaxCap(Elkaisar.CurrentHero);
    var sec_max = getHeroMaxCap(Elkaisar.NextHero);

    if (first_cap === 0 && sec_cap === 0) {
        return;
    }

    if (!heroAvailableForTask(right_hero_id) || !heroAvailableForTask(left_hero_id)) {
        $("body").append(alert_box.confirmMessage("لا يمكن نقل القوات </br> البطل فى مهمة"));
        return false;
    }

    if (first_cap > sec_max || sec_cap > first_max) {

        $("body").append(alert_box.confirmMessage("لا يمكن نقل القوات"));
        return;
    }

    $.ajax({
        url: `${API_URL}/api/AHeroArmy/swapHeroArmy`,
        data: {
            idHeroRight : right_hero_id,
            idHeroLeft  : left_hero_id,
            token       : Elkaisar.Config.OuthToken,
            server      : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            $("#swap_army").attr("disabled", "disabled");
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            unwaitCursor();
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var JsonObject = JSON.parse(data);
            
            if(JsonObject.state === 'ok'){
                
                Elkaisar.NextHero.Army = JsonObject.HeroArmyRight;
                Elkaisar.CurrentHero.Army = JsonObject.HeroArmyLeft;
                $("#swap_army").removeAttr("disabled");
                $("#hero-left-ol").html(temp_ol);
                $("#hero-right-ol").html(temp_o_l);
                $(".hero-1  ol li:nth-child(2) .header-2:nth-child(2)").html(sec_cap + "/" + first_max);
                $(".hero-2  ol li:nth-child(2) .header-2:nth-child(2)").html(first_cap + "/" + sec_max);
            } else if(JsonObject.state === "error_1")
                alert_box.failMessage("البطل لايستوعب العدد الحالى");
            else if(JsonObject.state === "error_2")
                alert_box.failMessage("البطل ليس فى المدينة");
            

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
});




function findMaxNumForArmyBuild(army_type)
{
    var army_obj = Elkaisar.BaseData.Army[army_type];

    var min_num = parseInt(Elkaisar.CurrentCity.City.food / army_obj.food);

    if (army_obj.coin !== 0 && (Elkaisar.CurrentCity.City.coin / army_obj.coin) < min_num) {

        min_num = parseInt(Elkaisar.CurrentCity.City.coin / army_obj.coin);

    }
    if (army_obj.wood !== 0 && (Elkaisar.CurrentCity.City.wood / army_obj.wood) < min_num) {

        min_num = parseInt(Elkaisar.CurrentCity.City.wood / army_obj.wood);

    }
    if (army_obj.stone !== 0 && (Elkaisar.CurrentCity.City.stone / army_obj.stone) < min_num) {

        min_num = parseInt(Elkaisar.CurrentCity.City.stone / army_obj.stone);

    }
    if (army_obj.metal !== 0 && (Elkaisar.CurrentCity.City.metal / army_obj.metal) < min_num) {

        min_num = parseInt(Elkaisar.CurrentCity.City.metal / army_obj.metal);

    }
    if (army_obj.people !== 0 && (Elkaisar.CurrentCity.City.pop / army_obj.people) < min_num) {

        min_num = parseInt(Elkaisar.CurrentCity.City.pop / army_obj.people);

    }


    if (army_type === "wall_a" || army_type === "wall_b" || army_type === "wall_c") {
        var total_space = Number(Elkaisar.CurrentCity.City.wall_a) * 1
                + Number(Elkaisar.CurrentCity.City.wall_b) * 3
                + Number(Elkaisar.CurrentCity.City.wall_c) * 5;


        min_num = Math.min(Math.max(Elkaisar.CurrentCity.City.wall_cap - total_space, 0) / army_obj.wall_space, min_num);
    }


    return min_num;
}

// build army




$(document).on("dragover dragenter drop paste", "input, .only_num", function (e) {
    if ($(this).attr("data-pastable") !== "true") {
        e.preventDefault();
        alert_box.failMessage("لا يمكنك النسخ بهذة الطريقة");
    }


});
$(document).on("click" , ".build_army" , function(){
    
    
    var self_          = $(this);
    var army_type      = null;
    var building_place = $("#dialg_box .mili_building").attr("data-building-place");
    var image          = $(".selected_sol").children("img").attr("src");
    var ar_title       = $(".selected_sol").children(".title").html();
    var lvl            = $("#dialg_box .mili_building").attr("data-building-lvl");
    var amount         = Number($(".sol-2-build-amount").val());
    var dividBy        = $("#select-production select").val();
    
    if(isNaN(amount) || amount < 1){
        alert_box.confirmMessage("لا يمكنك تجنيد هذة الكمية ");
        return ;
    }
   
   
    var working_count = 0;
    /*  first get the working count */
    for(var uuu in Elkaisar.TimedTask.TaskList.Army){
        
        if(Number(Elkaisar.CurrentCity.City.id_city) !== Number(Elkaisar.TimedTask.TaskList.Army[uuu].id_city))
            continue;
        if(Elkaisar.TimedTask.TaskList.Army[uuu].place !== building_place)
            continue;
         working_count++;
    }
    
    
    if(working_count >= 10 || Number(Elkaisar.City.getCity().BuildingLvl[building_place]) <= working_count){
        alert_box.confirmMessage("وصل عدد المتدربين الى اقصى مستوى لا يمكنك تدريب قوات اخرى");
        return ;
    }
    
    
    $(".sol-2-build").each(function(){
        if($(this).hasClass("selected_sol")){
            army_type = $(this).attr("army_type");
        }
    });
    
    if(army_type === "wall_a" ||army_type === "wall_b" ||army_type === "wall_c"){
        if(amount >  findMaxNumForArmyBuild(army_type)){
            alert_box.confirmMessage("مساحة الدفاعات داخل السور لا  تكفى للعدد الحالى ");
            return ;
        }
    }
    
   
    
    
     if(Elkaisar.BaseData.Army[army_type].condetion.place_lvl > Elkaisar.City.getCity().BuildingLvl[building_place] ||
           Elkaisar.BaseData.Army[army_type].condetion.lvl > Elkaisar.DPlayer.PlayerEdu[Elkaisar.BaseData.Army[army_type].condetion.study] ){
                        alert_box.confirmMessage("لا يستوفى هذا المبنى الشروط اللازمة لبناء الجيش");
                        return ;
           }
    
    
    if(army_type === null){
        
        alert_box.confirmMessage("عليك اختيار نوع جيش حتى يتم انتاجة");
        
    }else if(amount >  findMaxNumForArmyBuild(army_type)){
        
        alert_box.confirmMessage("لا يمكنك انتاج هذا العدد من الجنود");
        
    }else if(!amount){
        
        alert_box.confirmMessage("عليك اختيار عدد  لانتاجة");
        
    }else{
        var idCity = Elkaisar.CurrentCity.City.id_city;
       $.ajax({
           url: `${API_URL}/api/AArmyBuild/buildArmy`,
            data:{
                amount        : amount,
                armyType      : army_type,
                idCity        : Elkaisar.CurrentCity.City.id_city,
                buildingPlace : building_place,
                templePlace   : (cityHasType(BUILDING_TYPS.WORSHIP) && Number(Elkaisar.CurrentCity.City.helper) === 3)? cityHasType(BUILDING_TYPS.WORSHIP) : false,
                divideBy      : dividBy,
                token         : Elkaisar.Config.OuthToken,
                server        : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {
                self_.attr("disabled","disabled");
                waitCursor();
            },
            success: function (data, textStatus, jqXHR) {
                
                self_.removeAttr("disabled");
                                unwaitCursor();
                
                if(isJson(data)){
                    var json_data = JSON.parse(data);
                }else{
                    alert(data);
                    return ;
                }
                
                
                if(json_data.state === "ok"){
                   
                    /* calculate the decrease in city resources*/
                    Elkaisar.City.getCity(idCity).City  = json_data.City;
                    city_profile.refresh_resource_view();
                    
                    
                    for(var ii in json_data.armyBatches)
                    {
                        Elkaisar.TimedTask.TaskList.Army[json_data.armyBatches[ii].id] = json_data.armyBatches[ii];
                    }
                    Elkaisar.TimedTask.refreshListView();
                    Building.militrayProduction.left(building_place);
                    $(".sol-2-build-amount").val(0);
                    
                }else if(json_data.state === "error_3"){
                    alert_box.failMessage("نوع التقسيم غير معروف");
                }else if(json_data.state === "error_4"){
                    alert_box.failMessage("الكمية غير صحيحة");
                }else if(json_data.state === "error_5"){
                    alert_box.failMessage("الموارد غير كافية");
                }else if(json_data.state === "error_7_1"){
                    alert_box.failMessage("مستوى المبنى غير كافى");
                }else if(json_data.state === "error_7"){
                    alert_box.failMessage("وصل عدد الدفعات الى الحد الاقصى فى المبنى");
                }else if(json_data.state === "error_6_2"){
                    alert_box.failMessage("مستوى الدراسة غير كافى");
                }else{
                    
                    alert_box.confirmMessage("حدث خطأ");
                    
                }
                
                
                
            }, 
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
       });
       
    }
    
    
});


$(document).on("keyup change", ".sol-2-build-amount" , function (){
    var army_type = $("#dialg_box .middle-content .selected_sol").attr("army_type");
   
   if(!army_type){return false;}
    $("#dialg_box .leftOfRight .army_req_table .sol-food")  .html(Math.max(Elkaisar.BaseData.Army[army_type].food*$(this).val() ,   Elkaisar.BaseData.Army[army_type].food));
    $("#dialg_box .leftOfRight .army_req_table .sol-wood")  .html(Math.max(Elkaisar.BaseData.Army[army_type].wood*$(this).val() ,   Elkaisar.BaseData.Army[army_type].wood));
    $("#dialg_box .leftOfRight .army_req_table .sol-metal") .html(Math.max(Elkaisar.BaseData.Army[army_type].metal*$(this).val() ,  Elkaisar.BaseData.Army[army_type].metal));
    $("#dialg_box .leftOfRight .army_req_table .sol-coin")  .html(Math.max(Elkaisar.BaseData.Army[army_type].coin*$(this).val() ,   Elkaisar.BaseData.Army[army_type].coin));
    $("#dialg_box .leftOfRight .army_req_table .sol-stone") .html(Math.max(Elkaisar.BaseData.Army[army_type].stone*$(this).val() ,  Elkaisar.BaseData.Army[army_type].stone));
    $("#dialg_box .leftOfRight .army_req_table .sol-people").html(Math.max(Elkaisar.BaseData.Army[army_type].people*$(this).val() , Elkaisar.BaseData.Army[army_type].people));
    $("#dialg_box .leftOfRight .army_req_table .sol-time")  .html(changeTimeFormat(Math.max(Elkaisar.BaseData.Army[army_type].time*$(this).val() , Elkaisar.BaseData.Army[army_type].time)));
});

$(document).on("click" , ".acce-army-build" , function (){
    var matrial_to_use = [
            "train_acce_30",
            "train_acce_50"
        ];
    if($(".mili_building").attr("data-building-place") === "wall"){
        matrial_to_use = [
            "wall_acce"
        ];
    }
    
    var idTask = $(this).attr("data-id-task");
    BoxOfMatrialToUse(matrial_to_use , "army_build_acce", 1, idTask);
    
});

$(document).on("click" , '.cancel-army-build' , function (){
    
    var building_blace = $("#dialg_box .box_header").attr("place");
    var id_work = $(this).parents(".current-working").attr('id_work');
    var self_   = $(this);
    alert_box.confirmDialog("تأكيد الغاء دفعة الانتاج الحالية"  , function (){
        var idCity = Number(Elkaisar.CurrentCity.City.id_city);
        $.ajax({
            url: `${API_URL}/api/AArmyBatch/cancelBatch`,
            data:{
                idBatch : id_work,
                token   : Elkaisar.Config.OuthToken,
                server  : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },
            success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    var jsonData = JSON.parse(data);
                }else{
                    
                    alert(data);
                    
                }
                
                
                if(jsonData.state === "ok"){
                    
                    for(var iii in Elkaisar.TimedTask.TaskList.Army)
                    {
                        var Task = Elkaisar.TimedTask.TaskList.Army[iii];
                        if(Number(Task.id_city) !== idCity)
                            continue;
                        if(Task.place !== building_blace)
                            continue;
                        delete(Elkaisar.TimedTask.TaskList.Army[iii])
                        
                    }
                    for(var iii in jsonData.armyBatches)
                    {
                        Elkaisar.TimedTask.TaskList.Army[jsonData.armyBatches[iii].id] = jsonData.armyBatches[iii];
                    }
                    
                    Building.militrayProduction.left(building_blace);
                    Elkaisar.City.getCity(idCity).City = jsonData.cityRes;
                    city_profile.refresh_resource_view();
                    
                }else{
                    
                    alert_box.failMessage("حدث خطاء");
                    
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
        
    });
    
});



// intraction in hero list
$(document).on("click" , ".hero-list .tr" , function (){
     /*
      * هنا بقى بخلى البطل هو الى البوكس يتغير عشانة
      */              
    
    if($(this).attr("id_hero")){
       $("#city-hero-list .selected").removeClass("selected"); 
       $(this).addClass("selected");
        
        var id_hero = parseInt($(this).attr("id_hero"));
        Elkaisar.CurrentHero = Elkaisar.Hero.getHero(id_hero);
        
    }else{
        return ;
    }
    
    /*
     * looping  through nav bar to get the current box content
     */
    var title_head = "hero";
   $(".nav_bar .left-nav li").each(function (){
       if($(this).hasClass("selected")){
           title_head = $(this).attr("head_title");
       }
   });
    var scroll =  $("#city-hero-list").getNiceScroll(0);
    switch (title_head){
        case "hero":
            
            var content = army.dialogBoxContent_forHeroRight(Elkaisar.CurrentHero);
            $("#hero-wrapper").replaceWith(content);
            army.getCurrentArmy(Elkaisar.CurrentHero);
            
            break;
            
        case "trade":
            
          
            var content = army.dialogBoxContent_forHeroTradeRight();
            $("#hero-wrapper").replaceWith(content);
            var idCity = Number(Elkaisar.CurrentCity.City.id_city);
            for(var iii in Elkaisar.DPlayer.Heros)
            {
                var CHero = Elkaisar.DPlayer.Heros[iii];
                if(Number(CHero.Hero.id_city) !== idCity)
                    continue;
                if(Elkaisar.CurrentHero.Hero.id_hero !== CHero.Hero.id_hero){
                    Elkaisar.NextHero = Elkaisar.DPlayer.Heros[iii];
                    break;
                }
                
            }
            army.getCurrentArmy(Elkaisar.CurrentHero);
            army.rightTrade(Elkaisar.NextHero);
            
            break;
            
        case "equi":
            
            var content = army.dialogBoxContent_forEquiRight();
            $("#hero-wrapper").replaceWith(content);
            army.getCurrentArmy(Elkaisar.CurrentHero);
            break;
            
        case "camp":
            
            var content = army.dialogBoxContent_forCampRight(Elkaisar.CurrentHero);
            $("#hero-wrapper").replaceWith(content);
            army.getCurrentArmy(Elkaisar.CurrentHero);
            getHeroEquip(Elkaisar.CurrentHero.Hero.id_hero);
            break;
            
        case "hero_learning":
            
            
            $("#hero-wrapper").replaceWith(army.dialogBoxContent_forHeroLearnRight(Elkaisar.CurrentHero));
            break;
    }
    
    
    var sc = scroll.getScrollTop();
   // scroll.remove();
    //$("#city-hero-list").niceScroll(SCROLL_BAR_PROP).setScrollTop(sc);
    
});




/*_________________________________________hero_up_lvl_____________________*/
/*______________________________عشان اعلى اليفل بتاع البطل_________________*/

$(document).on("click" , ".hero_up_lvl" , function (){
    var id_hero = Elkaisar.CurrentHero.Hero.id_hero;
    var lvl = parseInt(Elkaisar.CurrentHero.Hero.lvl);
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    if(!heroAvailableForTask(id_hero)){
        
        return ;
    }
    
    
    if(getReqHeroXp(Elkaisar.CurrentHero.Hero.lvl) > Elkaisar.CurrentHero.Hero.exp){
        alert_box.confirmMessage("لا توجد خبرة كافية مع البطل");
        return ;
    }
    
    /**
     * هنا انا  بعمل تطوير للبطل ببعت اليفل والاى دى
     * وهو بيجيب من الداتا بيز البطل المطابق للمواصفات دى لو  حد فكر يلعب فى الليفل او البطل 
     * كدة مش هيحصل تطابق فى البطل الى فى الداتا بيز
     */
    $.ajax({
        url: `${API_URL}/api/AHero/upgradeHeroLvl`,
        data: {
            idHero : id_hero,
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            
            if(isJson(data)){
                var json_data = JSON.parse(data);
            }else{
                alert(data);
                return ;
            }
            
            if(json_data.state === "ok"){
                Elkaisar.Hero.getHero(id_hero).Hero = json_data.Hero;
                Elkaisar.City.getCity(idCity).City = json_data.City;
                
                $('.hero-profile').replaceWith(army.middle_content(Elkaisar.CurrentHero));
                $("#city-hero-list").html(army.hero_list());
                $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
                alert_box.succesMessage("نم تطوير البطل بنجاح");
                
                city_profile.refresh_hero_view();
                city_profile.refresh_resource_view();
            
            }else{
                alert(data);
            }
            
            
        }, error: function (jqXHR, textStatus, errorThrown) {

        }
    });
});



/*
 *هزو الخبرة  بتاعة البطل  
 */
$(document).on("click" , ".add_xp" , function (){
    
                    
    
    var matrial = ["exp_hero_8","exp_hero_30","exp_hero_100"];
    BoxOfMatrialToUse(matrial , "add_xp");
    
});




/*
 *هزو طاقة البطل  
 */
$(document).on("click" , ".add_power" , function (){
    
    var matrial = ["bread","fruit","milk","meat"];
    BoxOfMatrialToUse(matrial , "add_power");
 
});




/*
 *هزو ولاء البطل  
 */
$(document).on("click" , ".add_loy" , function (){
    
    var matrial = ["luxury_1","luxury_2","luxury_3","luxury_4",
        "luxury_5","luxury_6","luxury_7","luxury_8","luxury_9"];
    BoxOfMatrialToUse(matrial , "add_loy");
    
});

/*
 * عشان اقفل البوكس والغى الشاشة السودة
 */
$(document).on("click" , ".close_use_menu" , function (){
    $("#over_lay").remove();
});
/*
 * عشان اقفل البوكس والغى الشاشة السودة
 */
$(document).on("click" , ".close_select_menu" , function (){
    $(".select_over_lay").remove();
});

/*
 * هنا بقى لما اضغط على  باتون الاستعمال  بتاع المتريل للبطل بس 
 * اول حاجة هجيب نوع الاستعامل  يعنى للطاقة ولا الولاء ولا الخبرة
 * وهجيب نوع المتريل 
 */

$(document).on("click" , ".use_matrial_hero" , function(){
    
    var matrial_name = $(this).attr("matrial_name");
    var use_for = $(this).attr("use_for");
    var amount  = $(this).attr("amount");
    var other   = $(this).attr("data-other");
    var title   = `تأكيد استعمال ${getArabicNumbers(amount)} ${Elkaisar.BaseData.Items[matrial_name].name} من  صندوق المواد الخاص`;
    var content = alert_box.confirmUse_single(use_for , matrial_name , title  , other);
    var alert  = alert_box.alert(Translate.Button.Building.Confirm[UserLag.language], content);
    
    $("body").append(alert);

});





/*
 *  USER wants to add  points to hero
 */
$(document).on("keydown" , ".add_point" , function (event){
    if (event.keyCode === 13  || event.keyCode === 32 ) {
    // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        $(this).click();
    }
      
});
$(document).on("click", ".add_point" , function (){
    var amount    = Number($(this).attr("amount"));
    var point_for = $(this).attr("for");
    var heroPoint = $(this).attr("data-point");
    var old_amount = Elkaisar.CurrentHero.Hero.points;
    Elkaisar.CurrentHero.Hero[point_for] += amount;
    
    if(heroPoint === "point_a" && !Hero.traitPointAOk(Elkaisar.CurrentHero)){
        alert_box.confirmMessage("لا يمكن ان تكون نقاط السيطرة طاغية على باقى السمات");
        Elkaisar.CurrentHero.Hero[point_for] -= amount;
        return ;
    }else if(heroPoint === "point_b" && !Hero.traitPointBOk(Elkaisar.CurrentHero)){
        alert_box.confirmMessage("لا يمكن ان تكون نقاط الشجاعة طاغية على باقى السمات");
        Elkaisar.CurrentHero.Hero[point_for] -= amount;
        return ;
    }else if(heroPoint === "point_c" && !Hero.traitPointCOk(Elkaisar.CurrentHero)){
        alert_box.confirmMessage("لا يمكن ان تكون نقاط الدفاع  طاغية على باقى السمات");
        Elkaisar.CurrentHero.Hero[point_for] -= amount;
        return ;
    }
   
    if((old_amount > 2 && amount === 3) || (old_amount > 0 && amount === 1)){
        
        Elkaisar.CurrentHero.Hero.points -=  amount;
        
        $(".part-4 tr:first-child td:nth-child(2)").html(getArabicNumbers(Elkaisar.CurrentHero.Hero.points));
        $(".part-4 tr:first-child td:nth-child(2)").attr( "p-num" , Elkaisar.CurrentHero.Hero.points);

        /* secound decrement the crorespond value*/
        var old_point = parseInt($(this).parent(".pull-R").prev(".pull-L").children(".pull-L").attr("p-num"));
        $(this).parent(".pull-R").prev(".pull-L").children(".pull-L").html(getArabicNumbers(old_point + amount));
        $(this).parent(".pull-R").prev(".pull-L").children(".pull-L").attr( "p-num" , (old_point + amount));

        /*
         * third change point in object 
         * add_p_a
         * add_p_b 
         * add_p_c 
         */

        /*third move disable attribuite  from the  button of save and retrive point*/
        $(".return_points").removeAttr("disabled");
        $(".save_points").removeAttr("disabled");
    }
   
   
   
   
   /* ها عشان   لو دول اخر نقط هو بيضيفها*/
   
   if(parseInt($(".part-4 tr:first-child td:nth-child(2)").attr("p-num")) <= 0){
       $(".add_point").attr("disabled" ,"disabled");
   }else if (parseInt($(".part-4 tr:first-child td:nth-child(2)").attr("p-num")) <= 2){
        $(".add_point[amount=3]").attr("disabled" ,"disabled");
   }
   
});

/*
 *  هرجع النقط  تانى لو اللاعب ماتكاش على حفظ النقط
 */

$(document).on("click" ,".return_points" , function (){
    var total_points = Elkaisar.CurrentHero.Hero.add_p_a + Elkaisar.CurrentHero.Hero.add_p_b + Elkaisar.CurrentHero.Hero.add_p_c ;
   
    
    $(".domain-point .point:first").attr("p-num" , Elkaisar.CurrentHero.Hero.point_a);
    $(".attack-point .point:first").attr("p-num" , Elkaisar.CurrentHero.Hero.point_b);
    $(".def-point    .point:first").attr("p-num" , Elkaisar.CurrentHero.Hero.point_c);
    
    /* second we chang point in html*/
    $(".part-4 tr:first-child td:nth-child(2)").html(Elkaisar.CurrentHero.Hero.points);
    
    Elkaisar.CurrentHero.Hero.add_p_a=0;
    Elkaisar.CurrentHero.Hero.add_p_b=0;
    Elkaisar.CurrentHero.Hero.add_p_c=0;
    
    $(".part-4 tr:nth-child(2) .point:first-child").html(Elkaisar.CurrentHero.Hero.point_a);
    $(".part-4 tr:nth-child(3) .point:first-child").html(Elkaisar.CurrentHero.Hero.point_b);
    $(".part-4 tr:nth-child(4) .point:first-child").html(Elkaisar.CurrentHero.Hero.point_c);
    
    /*disable buttons*/
    $(".save_points").attr("disabled" ,"disabled");
    $(".return_points").attr("disabled" ,"disabled");
});

/*  when the save point button clicked*/
$(document).on("click" , ".save_points" , function (){
    
    
    /* disable button to prevent problems*/
    $(this).attr("disabled" ,"disabled");
    $(".return_points").attr("disabled" ,"disabled");
    
    var total_points  = Elkaisar.CurrentHero.Hero.add_p_a + Elkaisar.CurrentHero.Hero.add_p_b + Elkaisar.CurrentHero.Hero.add_p_c ;
    var idCity = Elkaisar.CurrentCity.City.id_city;
    var idHero = Elkaisar.CurrentHero.Hero.id_hero;
    
    if(total_points > 0){
        $.ajax({
            url: `${API_URL}/api/AHero/setHeroPoints`,
            data:{
                pointA: Elkaisar.CurrentHero.Hero.add_p_a,
                pointB: Elkaisar.CurrentHero.Hero.add_p_b,
                pointC: Elkaisar.CurrentHero.Hero.add_p_c,
                idHero: Elkaisar.CurrentHero.Hero.id_hero,
                token : Elkaisar.Config.OuthToken,
                server: Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {

            },success: function (data, textStatus, jqXHR) {
                
                if(isJson(data)){
                    var json_data = JSON.parse(data);
                }else{
                    alert(data);
                    return ;
                }
                
                if(json_data.state === "ok"){
                    /* change hero point in global obj*/
                    Elkaisar.City.getCity(idCity).City = json_data.CityRes;
                    Elkaisar.Hero.getHero(idHero).Hero = json_data.Hero;
                    
                    $("#city-hero-list .selected").click();
                    city_profile.refresh_resource_view();
                    
                    
                    /*    هصفر المتغيرات عشان لو اللاعب حب  يحفظ الحاجة تانى*/
                    Elkaisar.CurrentHero.Hero.add_p_a=0;
                    Elkaisar.CurrentHero.Hero.add_p_b=0;
                    Elkaisar.CurrentHero.Hero.add_p_c=0;
                }else{
                    alert("wrong");
                }
                
            }, error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    
});


/* return all heros points  by trago3
 * هرع النقط  بالتراجع*/

$(document).on("click" , ".return_points_all" , function (){
     var box = `<div id="over_lay" >
                    <div id="select_from">
                        <div class="head_bar">
                            <img src="images/style/head_bar.png" class="banner">
                            <div class="title">${Translate.Button.General.Use[UserLag.language]}</div>
                            <img class="close close_use_menu" src="images/btns/close_b.png">
                        </div>
                        <p style="clear: both"></p>
                        <ul class="select_item">
                            <li>
                                <div  class=" pull-L left">
                                    <div class="ar_title">نظام تراجع</div>
                                    <div class="quant">
                                        ${getArabicNumbers(Matrial.getPlayerAmount("retreat_point"))}
                                    </div>
                                    <div class="image">
                                        <img src="images/items/item014.jpg"/>
                                    </div>
                                </div>
                                <div class="pull-R right">
                                    <div class="header">
                                        <button class="full-btn use_matrial_hero" use_for="retreat_points"  matrial_name="retreat_point" amount="${Math.floor(Elkaisar.CurrentHero.Hero.lvl/10+1)}"> ${Translate.Button.General.Use[UserLag.language]}</button>
                                    </div> 
                                    <div class="desc">
                                        يستخدم فى استراجع النقط الخاصة بالبطل لترتيبها وفق ما تحتاج
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>`;
    $("body").append(box);
});


/*                           تعين القنصل            _                     */

$(document).on("click" , ".add_console" , function (){
    
    
    if(Number(Elkaisar.CurrentHero.Hero.in_city) !== 1){
        
        alert_box.confirmMessage("لا يمكنك تعين البطل قنصل ( البطل ليس بالمدينة)");
        return ;
    }
    
    var self = $(this);
    var idHero = Elkaisar.CurrentHero.Hero.id_hero;
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    $.ajax({
        url: `${API_URL}/api/AHero/addConsole`,
        data: {
            idHero : idHero,
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            self.attr("disabled" ,"disabled");
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            self.removeAttr("disabled");
            unwaitCursor();
            if(!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);
            
            
                
                var json_data = JSON.parse(data);
                
                if(json_data.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = json_data.City;
                    for(var iii in json_data.HeroList)
                    {
                        if(Elkaisar.Hero.getHero(json_data.HeroList[iii].id_hero))
                            if(Elkaisar.Hero.getHero(json_data.HeroList[iii].id_hero).Hero)
                                Elkaisar.Hero.getHero(json_data.HeroList[iii].id_hero).Hero = json_data.HeroList[iii];
                        
                    }
                    city_profile.refresh_resource_view();
                    city_profile.refresh_hero_view();
                    
                    $("#city-hero-list .tr").each(function (el){
                       
                       if(Number($(el).attr("id_hero")) === Number(json_data.City.console))
                       {
                           
                       }
                        
                    });
                    
                    Elkaisar.City.refreshBtnList();
                    $("#city-hero-list").html(army.hero_list());
                    $("#city-hero-list .selected").click();
                    
                }else if(json_data.state === "error_1"){
                    alert_box.failMessage("البطل ليس فى المدينة");
                }
                
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
    
});

/*                           تعين القنصل            _                     */

$(document).on("click" , ".remove_console" , function (){
    
    var self = $(this);
    
    var idHero = Elkaisar.CurrentHero.Hero.id_hero;
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    $.ajax({
        url: `${API_URL}/api/AHero/removeConsole`,
        data: {
            idCity : idCity,
            token  : Elkaisar.Config.OuthToken,
            server : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            self.attr("disabled" ,"disabled");
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            self.removeAttr("disabled");
            unwaitCursor();
            if(!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);
            
            
                
                var json_data = JSON.parse(data);
                
                if(json_data.state === "ok")
                {
                    Elkaisar.City.getCity(idCity).City = json_data.City;
                    for(var iii in json_data.HeroList)
                    {
                        if(Elkaisar.Hero.getHero(json_data.HeroList[iii].id_hero))
                            if(Elkaisar.Hero.getHero(json_data.HeroList[iii].id_hero).Hero)
                                Elkaisar.Hero.getHero(json_data.HeroList[iii].id_hero).Hero = json_data.HeroList[iii];
                        
                    }
                    city_profile.refresh_resource_view();
                    city_profile.refresh_hero_view();
                    
                    
                    Elkaisar.City.refreshBtnList();
                    $("#city-hero-list").html(army.hero_list());
                    $("#city-hero-list .selected").click();
                    
                    
                }else if(json_data.state === "error_1"){
                    alert_box.failMessage("البطل ليس فى المدينة");
                }
                
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
    
});


/*                                  تفعيل الماديليات                                   */

$(document).on("click" , ".medal img" , function (){
    
    var medal_type = $(this).attr("m_type");
    
    var matrial = [medal_type];
    BoxOfMatrialToUse(matrial , "add_medal");
    
    
});








/*      SHOW DORP DOWN LIST OF HEROS      ON trade section*/
$(document).on("click" , "#selected_hero" ,function (){
    
    if($(this).hasClass("active")){
        
        $("#select_hero ol").empty();
        $("#select_hero").hide();
        $(this).removeClass("active");
        
    }else {
        
        $(this).addClass("active");
         var id_hero = $(this).attr("id_hero");
    
        var all_list = "";

        Elkaisar.DPlayer.Heros.forEach(function (el){
            
            if(Number(Elkaisar.CurrentCity.City.id_city) !== Number(el.Hero.id_city))
                return ;
            if(Number(el.Hero.id_hero) === Number(Elkaisar.NextHero.Hero.id_hero))
                return ;
            if(Number(el.Hero.id_hero) === Number(Elkaisar.CurrentHero.Hero.id_hero))
                return ;
            
            
            var state = '<img src="images/icons/h_s_incity.png" class="img-sml" >';

            if(parseInt(el.console) === 1){

                state = '<img src="images/icons/h_s_console.png">';


            }else if(parseInt(el.in_city) === 0){

                state = '<img src="images/icons/h_s_attack_2.png"  class="img-sml">';


            }else if(Number(el.in_city) === -1){

                state = '<img src="images/icons/h_s_support.png" class="img-sml">';
            }

             all_list += `  <li id_hero="${el.Hero.id_hero}">
                                <div class="part-1">  
                                    <div class="hero_img pull-L">   
                                        <img class="img-mid" src="${Elkaisar.BaseData.HeroAvatar[el.Hero.avatar]}">    
                                        <div class="hero_lvl-box">${el.Hero.lvl}          
                                        </div>       
                                    </div>        
                                    <div class="hero-data pull-L">   
                                        <div class="upper">        
                                            <div class="pull-R" >    
                                                ${state}  
                                            </div>                    
                                            <div class="pull-R">${el.Hero.name}</div>      
                                        </div>          
                                    </div>     
                                </div>
                            </li>`;

            


        });

        $("#select_hero ol").append(all_list);
        $('#select_hero').show();
        $("#select_hero").niceScroll(SCROLL_BAR_PROP);
    }
    
   
               
});


/*                           change sec hero                    */

$(document).on("click" , "#select_hero ol li" , function (){
                 
    var id_hero = $(this).attr("id_hero");
    
    $("#right-down").attr("id_hero" , id_hero);
    army.rightTrade(Elkaisar.Hero.getHero(parseInt(id_hero)));

});

$(document).on("change" , ".check-for-medal" , function (){
    
    var value = $(this).val();
    
    var image;
    var rank_needed;
    var amount;
    var req = false;
    
    switch (value){
        
        case "medal_bronz":
            
            rank_needed = `<span class="${Number(Elkaisar.DPlayer.Player.porm) >= 3 ? "green" : "red"}">قسطور</span>`;
            req = Number(Elkaisar.DPlayer.Player.porm) >= 3 ? true : false;
            break;
            
        case "medal_silver":
            
            rank_needed = `<span class="${Number(Elkaisar.DPlayer.Player.porm) >= 5 ? "green" : "red"}">نائب</span>`;
             req = Number(Elkaisar.DPlayer.Player.porm) >= 5 ? true : false;
            break;
            
        case "medal_gold":
            
            rank_needed = `<span class="${Number(Elkaisar.DPlayer.Player.porm) >= 8 ? "green" : "red"}">دكتاتور</span>`;
            req = Number(Elkaisar.DPlayer.Player.porm) >= 8 ? true : false;
            break;
        
    }
    
    $("#req_for_medal").html(rank_needed);
    $("#medal_image").attr("src" ,Elkaisar.BaseData.Items[value].image);
    $("#medal_amount_player").html( getArabicNumbers(Matrial.getPlayerAmount(value)) );
    
    
    
});

$(document).on("click" ,"#learn-hero-point" , function (){
    
    var point_for =  $(".learn_hero .row-1 ul li input[name='point_plus_for']:checked").val();
    var meddal    =  $(".learn_hero .row-4 ul li input[name='used_meddal']:checked").val();
    
    if(Matrial.getPlayerAmount(meddal) < 10 ){
        
        alert_box.confirmMessage("ليس لديك عدد كافى من الميداليات");
        return ;
                        
    }else if(!point_for){
        
        alert_box.confirmMessage("عليك اختيار النقط المراد اضافتها");
        return ;
        
    }else if(parseInt(Elkaisar.CurrentHero.Hero.in_city) !== 1){
        
        alert_box.confirmMessage("لا يمكنك تعليم بطل وهو فى مهمة خارج المدينة");
        return ;
        
    }
    
    var points_ar_title = point_for === "point_a_plus" ? "نقاط سيطرة" : (point_for === "point_b_plus" ? "نقاط الشجاعة" : "نقاط دفاع");
    
    var idHero = Elkaisar.CurrentHero.Hero.id_hero;
    var idCity = Elkaisar.CurrentCity.City.id_city;
    
    $.ajax({
        
        url: `${API_URL}/api/AHero/educate`,
        data:{
            idHero     : idHero,
            medalToUse : meddal,
            pointFor   : point_for,
            token      : Elkaisar.Config.OuthToken,
            server     : Elkaisar.Config.idServer

        },
        type: 'POST',
        beforeSend: function (xhr) {

        },
        success: function (data, textStatus, jqXHR) {
            
            if(!Elkaisar.LBase.isJson(data))
                Elkaisar.LBase.Error(data);
            
            var jsonObject = JSON.parse(data);
            if(jsonObject.state === "ok")
            {
                
                if(jsonObject.PointAdded === 0){
                
                    var msg = `فشل عملية تعليم البطل, حصلت على  ${getArabicNumbers(jsonObject.PointAdded)} 
                                    من ${points_ar_title} , ولم تخسر نقاط,و قد استهلكت ١٠ ${Elkaisar.BaseData.Items[meddal].name}  خلال هذة العملية`;
                   alert_box.succesMessage(msg);
                   Matrial.takeFrom(meddal, 10);

                }else if(jsonObject.PointAdded > 0){

                    var msg = `نجحت عملية تعليم البطل, حصلت على  ${getArabicNumbers(jsonObject.PointAdded)} 
                                    من ${points_ar_title} ,و قد استهلكت ١٠  ${Elkaisar.BaseData.Items[meddal].name} خلال هذة العملية`;
                   alert_box.succesMessage(msg);
                   Matrial.takeFrom(meddal, 10);

                }else if(jsonObject.PointAdded < 0){

                    var msg = `فشل عملية تعليم البطل, خسرت  ${getArabicNumbers(jsonObject.PointAdded*-1)} 
                                    من ${points_ar_title} ,و قد استهلكت ١٠  ${Elkaisar.BaseData.Items[meddal].name} خلال هذة العملية`;
                   alert_box.failMessage(msg);
                   Matrial.takeFrom(meddal, 10);

                }
            }
            
            
            Elkaisar.Hero.getHero(idHero).Hero = jsonObject.Hero;
            Elkaisar.City.getCity(idCity).City = jsonObject.City;
            $(".hero_dial .hero-profile").replaceWith(army.middle_content(Elkaisar.CurrentHero));
            $("#medal_amount_player").html(getArabicNumbers(Matrial.getPlayerAmount(meddal)));
            city_profile.refresh_resource_view();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
        
    });
    
});



function finishArmyBuild(index){
    
    
   
    
}


$(document).on("click", "#confirm_battel", function (){
    battelStart();
});