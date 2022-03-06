Elkaisar.Hero.HeroState = {
    HERO_IN_CITY :  1,
    HERO_IN_BATTEL :0,
    HERO_IN_GARISON : 2
};

Elkaisar.Hero.getHero = function (idHero)
{
    for (var iii in Elkaisar.DPlayer.Heros) {
        if(Elkaisar.DPlayer.Heros[iii].idHero)
            if (Number(Elkaisar.DPlayer.Heros[iii].idHero) === Number(idHero))
                return Elkaisar.DPlayer.Heros[iii];
        if (Elkaisar.DPlayer.Heros[iii].Hero)
            if (Number(Elkaisar.DPlayer.Heros[iii].Hero.id_hero) === Number(idHero))
                return Elkaisar.DPlayer.Heros[iii];
        else if(Elkaisar.DPlayer.Heros[iii].Army)
            if (Number(Elkaisar.DPlayer.Heros[iii].Army.id_hero) === Number(idHero))
                return Elkaisar.DPlayer.Heros[iii];
        else if(Elkaisar.DPlayer.Heros[iii].Medal)
            if (Number(Elkaisar.DPlayer.Heros[iii].Medal.id_hero) === Number(idHero))
                return Elkaisar.DPlayer.Heros[iii];
    }

    return false;
};



Elkaisar.Hero.orderHeors = function (){

        Elkaisar.DPlayer.Heros.sort((a,b) => (a.Hero.ord > b.Hero.ord) ? 1 : ((b.Hero.ord > a.Hero.ord) ? -1 : 0));
            //.map(el=>el[0]);
};

Elkaisar.Hero.isConsole = function (idHero) {
    for (var idCity in Elkaisar['DPlayer']['City'])
        if (Elkaisar['DPlayer']['City'][idCity]['City']['console'] == idHero) return true;
    return false;
};


$(document).on("click" , ".show-hero-theater" , function (){
    
    var hero_data = JSON.parse($(this).attr("data-hero"));
    
    var hero = {};
    hero.image = hero_data.hero_image;
    hero.lvl = hero_data.hero_lvl;
    hero.name = Elkaisar.BaseData.HeroTheaterName[hero_data.hero_name];
    hero.point_a = Number(hero_data.hero_lvl) + 20;
    hero.point_b = Number(hero_data.hero_lvl) + 15;
    hero.point_c = Number(hero_data.hero_lvl) + 20;
    hero.ultra_p = hero_data.ultra_p;
    hero.id_in_theater = hero_data.id_hero;
    
    showHero(hero , hero.id_in_theater);
    
});



function showHero(hero , recruit)
{
    
    var recruit_btn = "";
    if(!isNaN(recruit)){
        
        recruit_btn =  ` <div class="li buttons" style="margin-top: 5px; width: 95%">
                                <div class="li-d bg-btn-red" style="margin: auto; height: 100%;">
                                    <div class="image pull-L">
                                        <img src="images/btns/tagned.png">
                                    </div>
                                    <div class="title pull-R" id="recurit-new-hero"  data-id-hero-theater="${hero.id_in_theater}">
                                        تجنيد
                                    </div>
                                </div>

                            </div>`;
        
    }
    
    var over_lay = `<div id="over_lay">
                        <div id="select_from">
                            <div class="head_bar">
                                <img src="images/style/head_bar.png" class="banner">
                                <div class="title">ملف الملك</div>
                                <img class="close close_use_menu" src="images/btns/close_b.png">
                            </div>
                            <p style="clear: both"></p>
                            <div id="rank-review" class="player-review">
                                <div class="upper">
                                    <div class="left pull-L">
                                        <div class="player-avatar">
                                            <div class="hero_lvl-box" style="position: absolute;margin-left: 43px;margin-top: 4px;">${hero.lvl}</div>
                                            <img src="${Elkaisar.BaseData.HeroAvatar[hero.image]}" id="A-A-P-image">
                                            
                                        </div>
                                        <div class="hero_ultra_p">
                                            <h1>نقاط الامكانية  (${ hero.ultra_p })</h1>
                                        </div>
                                    </div>
                                    <div class="right pull-R">
                                        <div class="th ellipsis">${Translate.Title.TH.SwayPoints[UserLag.language]}</div>
                                        <div class="trow bg-btn-blu" id="A-A-P-guild">${getArabicNumbers(Number(hero.point_a))}</div>
                                        <div class="th ellipsis">${Translate.Title.TH.BraveryPoints[UserLag.language]}</div>
                                        <div class="trow bg-btn-blu" id="A-A-P-promotion">${getArabicNumbers(Number(hero.point_b))}</div>
                                        <div class="th ellipsis">${Translate.Title.TH.ParryPoints[UserLag.language]}</div>
                                        <div class="trow bg-btn-blu" id="A-A-P-rank">${getArabicNumbers(Number(hero.point_c))}</div>
                                    </div>
                                    <p style="clear: both"></p>
                                    <h1 class="player-name" id="A-A-P-name">${hero.name}</h1>
                                </div>
                                <div class="down">
                                    <div class="th ellipsis">${Translate.Title.TH.Info[UserLag.language]}</div>
                                    <div class="table">

                                        <div class="th ellipsis">
                                            <div class="td_1 ellipsis">${Translate.Title.TH.SignUpRequire[UserLag.language]}</div>
                                            <div class="td_2 ellipsis">
                                                ${Translate.Title.TH.NeadedAmount[UserLag.language]}
                                            </div>
                                            <div class="td_3">${Translate.Title.TH.YouHave[UserLag.language]}</div>
                                        </div>
                                        <div class="tr">
                                            <div class="td_1 ellipsis">
                                                ${Translate.Title.TH.SestersYouHave[UserLag.language]}
                                            </div>
                                            <div class="td_2 ellipsis">
                                                ${Math.ceil(getArabicNumbers(hero.lvl*100))}
                                            </div>
                                            <div class="td_3 ellipsis">
                                                ${Math.floor(Elkaisar.CurrentCity.City.coin)}
                                            </div>
                                        </div>
                                        <div class="tr">
                                            <div class="td_1">
                                               ${Translate.Title.TH.LuxuryItem[UserLag.language]}
                                            </div>
                                            <div class="td_2">
                                                0     
                                            </div>
                                            <div class="td_3">
                                                0
                                            </div>
                                        </div>

                                    </div>
                                   
                                    ${recruit_btn}
                                    <span style="clear: both"></span>
                                </div>
                            </div>
                        </div>
                    </div>`;
    $("body").append(over_lay);
    
    $("#recurit-new-hero").click(function (){
        Hero.addHeroFromTheatr(Number(hero.id_in_theater , hero.lvl));
    });
}


var Hero = {
    
    
    addHeroFromTheatr: function (id_hero_in_theater , lvl){
        
        if(isNaN(id_hero_in_theater)){
            alert_box.confirmMessage("هذا البطل لا يحمل رقم مميز");
            return ;
        }else{
            
            if(Number(Elkaisar.CurrentCity.City.coin) < lvl*100){
                alert_box.confirmMessage("لا يوجد سسترسس كافى تجنيد البطل");
                return ;
            }
            
            var idCity = Elkaisar.CurrentCity.City.id_city;
            $.ajax({
                
                url: `${API_URL}/api/ACityHero/addFromTheater`,
                data: {
                    idHero  : id_hero_in_theater,
                    token   : Elkaisar.Config.OuthToken,
                    server  : Elkaisar.Config.idServer
                },
                type: 'POST',
                beforeSend: function (xhr) {
                    
                },
                success: function (data, textStatus, jqXHR) {
                    
                    if(!Elkaisar.LBase.isJson(data))
                        return Elkaisar.LBase.Error(data);
                    
                    var jsonObject = JSON.parse(data);
                    
                    if(jsonObject.state === "ok"){

                        Elkaisar.City.getCity(idCity).City         = jsonObject.City;
                        Elkaisar.City.getCity(idCity).TheaterHeros = jsonObject.TheaterHeros;
                        Elkaisar.City.getCityHero(idCity);
                        Elkaisar.City.getCityHeroArmy(idCity);
                        Elkaisar.City.getCityHeroMedal(idCity);
                        
                        buildingClick(cityHasType(BUILDING_TYPS.THEATER) , true);
                        $(".close_use_menu").click();
                        alert_box.succesMessage("تم اضافة البطل بنجاح");
                        
                        city_profile.refresh_resource_view();
                        city_profile.refresh_army_view();
                       
                    }else if(jsonObject.state === "error_0"){
                        alert_box.failMessage("البطل غير موجود بالمسرح");
                    }else if(jsonObject.state === "error_1"){
                        alert_box.confirmMessage(`لا يمكنك امتلاك اكثر من ${jsonObject.MaxCount} بطل فى المدينة`)
                    }else{
                        alert_box.confirmMessage(data);
                    }
                        
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    
                }
                
            });
            
        }
        
        
        
    },
    getPowerRequired(x, y){
        
        var Unit = WorldUnit.getWorldUnit(x, y);
        if(Unit)
            return Elkaisar.World.UnitTypeData[Unit.ut].reqFitness;
        return 10;
    },
    heroAttackProc: function (){
        Elkaisar.CurrentHero.Hero.in_city  = 0;
        Elkaisar.CurrentHero.Hero.attack   = 1;
    },
    // get hero equip
    getHeroEquip: function (id_hero){


       $.ajax({
            url: "api/city.php",
            data: {
                get_hero_equip: true,
                id_hero:id_hero,
                id_player:ID_PLAYER,
                token:TOKEN
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {

               if(isJson(data)){
                   Elkaisar.Hero.getHero(id_hero).Equip = JSON.parse(data);
               }else{
                   alert(data);
                   console.log(data);
                   return ;
               }
               
               var equip_review = Hero.equipBreview();
               $("#after-ajax-equip-view").html(equip_review);
           },
           error: function (jqXHR, textStatus, errorThrown) {
               console.log(errorThrown);
           }
        });
    },
    /*            is hero empty*/
    isEmptyArmy: function (){

        for(var cell in Elkaisar.CurrentHero.Army){
            if(parseInt(Elkaisar.CurrentHero.Army[cell]) !== 0 && cell !== "id_hero"  && cell !== "id_player" ){

                return false;
            }

        }

        return true;

    },
    getEquipEffectsForHero: function (hero){
        var sword  = getEquipData(hero.Equip.sword);
        var helmet = getEquipData(hero.Equip.helmet);
        var shield = getEquipData(hero.Equip.shield);
        var armor  = getEquipData(hero.Equip.armor);
        var boot   = getEquipData(hero.Equip.boot);
        console.log(boot)
        return {
            "vit"        :sword.vit         + helmet.vit        + shield.vit         + armor.vit        + boot.vit,
            "attack"     :sword.attack      + helmet.attack     + shield.attack      + armor.attack     + boot.attack  + Number( hero.Hero.point_b),
            "defence"    :sword.defence     + helmet.defence    + shield.defence     + armor.vit        + boot.defence + Number( hero.Hero.point_c),
            "damage"     :sword.damage      + helmet.damage     + shield.damage      + armor.damage     + boot.damage,
            "break"      :sword.break       + helmet.break      + shield.break       + armor.break      + boot.break,
            "anti_break" :sword.anti_break  + helmet.anti_break + shield.anti_break  + armor.anti_break + boot.anti_break,
            "strike"     :sword.strike      + helmet.strike     + shield.strike      + armor.strike     + boot.strike,
            "immunity"   :sword.immunity    + helmet.immunity   + shield.immunity    + armor.immunity   + boot.immunity
        };
    },
    foodConsumption: function (hero){
        var total   = Number(Elkaisar.BaseData.Army[ARMY_CONVERT["sol-"+hero.Army.f_1_type].city || 0].eating*hero.Army.f_1_num)
                    + Number(Elkaisar.BaseData.Army[ARMY_CONVERT["sol-"+hero.Army.f_2_type].city || 0].eating*hero.Army.f_2_num)
                    + Number(Elkaisar.BaseData.Army[ARMY_CONVERT["sol-"+hero.Army.f_3_type].city || 0].eating*hero.Army.f_3_num)
                    + Number(Elkaisar.BaseData.Army[ARMY_CONVERT["sol-"+hero.Army.b_1_type].city || 0].eating*hero.Army.b_1_num)
                    + Number(Elkaisar.BaseData.Army[ARMY_CONVERT["sol-"+hero.Army.b_2_type].city || 0].eating*hero.Army.b_2_num)
                    + Number(Elkaisar.BaseData.Army[ARMY_CONVERT["sol-"+hero.Army.b_3_type].city || 0].eating*hero.Army.b_3_num);
            
            return total;
    },
    refreshSecondHeroArmy(){
        return  $.ajax({
            url: "api/city.php",
            data: {
                idHero:Elkaisar.NextHero.Hero.id_hero,
                server:Elkaisar.Config.idServer ,
                token:Elkaisar.Config.OuthToken
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                Elkaisar.NextHero.Army = JSON.parse(data);
            }
        });
    },
    refreshCurrentHeroArmy(){
        return  $.ajax({
            url: "api/city.php",
            data: {
                idHero:Elkaisar.CurrentHero.Hero.id_hero,
                server:Elkaisar.Config.idServer ,
                token:Elkaisar.Config.OuthToken
            },
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                Elkaisar.CurrentHero.Army = JSON.parse(data);
            }
        });
    },
    armyReview:function (){
        return ` <ul class="army-review">
                    <li>
                        <div class="wrapper">
                            <div class="army-unit" style="background-image:url(${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[Elkaisar.CurrentHero.Army.f_1_type]].image}) ">
                                <div class="amount ${Fixed.getArmyAmountColor(Elkaisar.CurrentHero.Army.f_1_num)}">${getArabicNumbers(Elkaisar.CurrentHero.Army.f_1_num)}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="army-unit" style="background-image:url(${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[Elkaisar.CurrentHero.Army.f_2_type]].image}) ">
                                <div class="amount ${Fixed.getArmyAmountColor(Elkaisar.CurrentHero.Army.f_2_num)}">${getArabicNumbers(Elkaisar.CurrentHero.Army.f_2_num)}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="army-unit" style="background-image:url(${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[Elkaisar.CurrentHero.Army.f_3_type]].image}) ">
                                <div class="amount ${Fixed.getArmyAmountColor(Elkaisar.CurrentHero.Army.f_3_num)}">${getArabicNumbers(Elkaisar.CurrentHero.Army.f_3_num)}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="army-unit" style="background-image:url(${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[Elkaisar.CurrentHero.Army.b_1_type]].image}) ">
                                <div class="amount ${Fixed.getArmyAmountColor(Elkaisar.CurrentHero.Army.b_1_num)}">${getArabicNumbers(Elkaisar.CurrentHero.Army.b_1_num)}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="army-unit" style="background-image:url(${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[Elkaisar.CurrentHero.Army.b_2_type]].image}) ">
                                <div class="amount ${Fixed.getArmyAmountColor(Elkaisar.CurrentHero.Army.b_2_num)}">${getArabicNumbers(Elkaisar.CurrentHero.Army.b_2_num)}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="army-unit" style="background-image:url(${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[Elkaisar.CurrentHero.Army.b_3_type]].image}) ">
                                <div class="amount ${Fixed.getArmyAmountColor(Elkaisar.CurrentHero.Army.b_3_num)}">${getArabicNumbers(Elkaisar.CurrentHero.Army.b_3_num)}</div>
                            </div>
                        </div>
                    </li>   
                </ul>`;
    },
    equipBreview: function (){
        
        var sword    = getEquipData(Elkaisar.CurrentHero.Equip.sword);
        var helmet   = getEquipData(Elkaisar.CurrentHero.Equip.helmet);
        var boot     = getEquipData(Elkaisar.CurrentHero.Equip.boot);
        var armor    = getEquipData(Elkaisar.CurrentHero.Equip.armor);
        var shield   = getEquipData(Elkaisar.CurrentHero.Equip.shield);
        
        var belt     = getEquipData(Elkaisar.CurrentHero.Equip.belt);
        var necklace = getEquipData(Elkaisar.CurrentHero.Equip.necklace);
        var pendant  = getEquipData(Elkaisar.CurrentHero.Equip.pendant);
        var ring     = getEquipData(Elkaisar.CurrentHero.Equip.ring);
        var steed    = getEquipData(Elkaisar.CurrentHero.Equip.steed);
        
        return `<ul>
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${helmet.image})">

                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${necklace.image})">

                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${armor.image})">

                            </div>
                        </div>
                    </li>
                    
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${boot.image})">

                            </div>
                        </div>
                    </li>
                    
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${sword.image})">

                            </div>
                        </div>
                    </li>
                    
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${shield.image})">

                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${pendant.image})">

                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${belt.image})">

                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${ring.image})">

                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="wrapper">
                            <div class="img" style="background-image: url(${steed.image})">

                            </div>
                        </div>
                    </li>
                </ul>`;
    }
    
};






Hero.readyForBattel =  function (hero){
    
    if(!hero){
        hero = Elkaisar.CurrentHero;
    }
    
    if(Number(hero.Hero.in_city) !== 1)
        return false;
    
    if(Number(hero.Hero.console) !== 0)
        return false;
    
    if(Hero.empty(hero.Hero.Army))
        return false;
    
    
    return true;
    
};

Hero.empty =  function (hero_army){
    if(!hero_army){
        hero_army = Elkaisar.CurrentHero.Army;
    }
    
    for(var cell in hero_army){
        
        if(parseInt(hero_army[cell]) !== 0 && cell !== "id_hero"  && cell !== "id_player" ){
           
            return false;
        }
        
    }
    
    return true;
    
};

Hero.inBattel =  function (hero){
    if(!hero){
        hero = Elkaisar.CurrentHero;
    }
    
    for(var battel in Elkaisar.Battel.Battels){
        
        if(Number(hero.Hero.id_hero) ===  Number(Elkaisar.Battel.Battels[battel].id_hero)){
            return true;
        }
        
    }
    
    return false;
};


Hero.traitPointAOk = function (hero){ return (parseInt(hero.Hero.point_a) + parseInt(hero.Hero.add_p_a) < Number(hero.Hero.point_b) +  parseInt(hero.Hero.add_p_b) + Number(hero.Hero.point_c) +  parseInt(hero.Hero.add_p_c)); };
Hero.traitPointBOk = function (hero){ return (parseInt(hero.Hero.point_b) + parseInt(hero.Hero.add_p_b) < Number(hero.Hero.point_a) +  parseInt(hero.Hero.add_p_a) + Number(hero.Hero.point_c) +  parseInt(hero.Hero.add_p_c)); };
Hero.traitPointCOk = function (hero){ return (parseInt(hero.Hero.point_c) + parseInt(hero.Hero.add_p_c) < Number(hero.Hero.point_a) +  parseInt(hero.Hero.add_p_a) + Number(hero.Hero.point_b) +  parseInt(hero.Hero.add_p_b)); };

Hero.traitPointOk = function (hero){
    
    var totalAdded = parseInt(hero.Hero.point_a) + parseInt(hero.Hero.add_p_a) + Number(hero.Hero.point_b) +  parseInt(hero.Hero.add_p_b) + Number(hero.Hero.point_c) +  parseInt(hero.Hero.add_p_c); 
    
    if(totalAdded < 100)
        return true;
    if(parseInt(hero.Hero.point_a) + parseInt(hero.Hero.add_p_a) >= Number(hero.Hero.point_b) + Number(hero.Hero.point_c))
        return false;
    if(parseInt(hero.Hero.point_b) + parseInt(hero.Hero.add_p_b) >= Number(hero.Hero.point_a) + Number(hero.Hero.point_c))
        return false;
    if(parseInt(hero.Hero.point_c) + parseInt(hero.Hero.add_p_c) >= Number(hero.Hero.point_a) + Number(hero.Hero.point_b))
        return false;
    
    return true;
    
};


Hero.calWorldUnitArmy = function (heroList){
    var a = {
        
        "0":0, "1":0, "2":0, 
        "3":0, "4":0, "5":0,
        "6":0
    };
    
    
    if(!$.isArray(heroList))
        return a;
    
    for(var ii in heroList){
        a[heroList[ii].f_1_type] += Number(heroList[ii].f_1_num);
        a[heroList[ii].f_2_type] += Number(heroList[ii].f_2_num);
        a[heroList[ii].f_3_type] += Number(heroList[ii].f_3_num);
        a[heroList[ii].b_1_type] += Number(heroList[ii].b_1_num);
        a[heroList[ii].b_2_type] += Number(heroList[ii].b_2_num);
        a[heroList[ii].b_3_type] += Number(heroList[ii].b_3_num);
        
    }
    
    
    
    return a;
};

$(document).on("click" , "#change-hero-name" , function (){
    
    $(this).parent().next().html("<input type='text' id='hero-input-name' style='width: 77%;'/>");
    $(this).attr("src" , "images/btns/done-btn.png");
    $(this).attr("id" , "confirm-change-hero-name");
    
});

$(document).on("click" , "#confirm-change-hero-name" , function (){
    
    var hero_name  = $("#hero-input-name").val();
    
    if(hero_name.length < 3){
        
        alert_box.failMessage("لا يمكن ان  يحتوى اسم البطل على 3 حروف");
        return ;
    }
    
    alert_box.confirmDialog("تاكيد تغير اسم البطل " ,function (){
        
        $.ajax({
            
            url: "api/hero.php",
            data:{
                
                UPDATE_HERO_NEW_NAME:true,
                new_name:hero_name,
                id_hero:Elkaisar.CurrentHero.Hero.id_hero,
                id_player:ID_PLAYER,
                token:TOKEN
                
            },
            type: 'POST',
            beforeSend: function (xhr) {
                
            },
            success: function (data, textStatus, jqXHR) {
                
                Elkaisar.CurrentHero.Hero.name = hero_name;
                alert_box.succesMessage("تم تغير اسم البطل بنجاح");
                $(".middle-content").replaceWith(army.middle_content(Elkaisar.CurrentHero));
                $("#city-hero-list").html(army.hero_list());
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
            
        });
        
    });
    
});




$(document).on("click" , ".add-eagle-to-hero" , function (){
    
    var matrial = ["ceaser_eagle"];
    BoxOfMatrialToUse(matrial , "add_medal");
    
});

$(document).on("mouseenter" ,  "#city-profile .page_content ul .hero_profile" , function (){
    
    var id_hero = $(this).attr('id_hero');
    var hero = getHeroById(id_hero);
    var image_state = "images/icons/h_s_incity.png";
    var state_title = 'فى المدينة';
    var hero_effect = Hero.getEquipEffectsForHero(hero);
    
    
    if(Number(hero.Hero.id_hero) === Elkaisar.CurrentCity.City.console){
        image_state = "images/icons/h_s_console.png";
        state_title = 'قنصل المدينة';
    }
    
    if(Number(hero.Hero.in_city) == Elkaisar.Hero.HeroState.HERO_IN_BATTEL){
        image_state = "images/icons/h_s_attack_2.png";
        state_title = 'خارج المدينة';
    }

    if(Number(hero.Hero.in_city) == Elkaisar.Hero.HeroState.HERO_IN_GARISON){
        image_state = "images/icons/h_s_support.png";
        state_title = 'خارج المدينة';
    }
    
    
    var tooltip = `<div class="tooltip tooltip-hero">
                        <div class="top">
                            <div class="name-lvl-point">
                                <label class="name">${hero.Hero.name}</label>
                                <label class="points"><span class="domain-point">${hero.Hero.point_a}</span>/<span class="attack-point">${hero.Hero.point_b}</span>/<span class="def-point">${hero.Hero.point_c}</span></label>

                                <label class="lvl hero_lvl-box">${hero.Hero.lvl}</label>
                            </div>
                            <div class="state rtl">
                                <img src="${image_state}"/> <label> ${state_title}</label>
                            </div>
                            <div class="hero-cap rtl">
                                <label>الجنود /سعة البطل:</label>&nbsp;&nbsp;&nbsp;<label>${getHeroCap(hero.Army)}/${getHeroMaxCap(hero)}</label>
                            </div>
                            <div class="crop-intake rtl">
                                <label>استهلاك  الغذاء:</label>&nbsp;&nbsp;&nbsp;<label>${Hero.foodConsumption(hero)}</label>
                            </div>
                            <ul>
                                <li>
                                    <div class="wrapper">
                                        <label><img src="images/icons/army/vitilty.png"/></label>
                                        <label>${hero_effect.vit}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label><img src="images/icons/army/attack.png"/></label>
                                        <label>${hero_effect.attack}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label><img src="images/icons/army/defence.png"/></label>
                                        <label>${hero_effect.defence}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label><img src="images/icons/army/damage.png"/></label>
                                        <label>${hero_effect.damage}</label>
                                    </div>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <div class="wrapper">
                                        <label><img src="images/icons/army/break.png"/></label>
                                        <label>${hero_effect.break}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label><img src="images/icons/army/anti-break.png"/></label>
                                        <label>${hero_effect.anti_break}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label><img src="images/icons/army/strike.png"/></label>
                                        <label>${hero_effect.strike}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label><img src="images/icons/army/immunity.png"/></label>
                                        <label>${hero_effect.immunity}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="bottom">
                            <ol class="army-row">
                                <li>
                                    <div class="wrapper">
                                        <img src="${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[hero.Army.f_1_type]].image}"/><div class="amount stroke ${Fixed.getArmyAmountColor(hero.Army.f_1_num)}">${hero.Army.f_1_num}</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[hero.Army.f_2_type]].image}"/><div class="amount stroke ${Fixed.getArmyAmountColor(hero.Army.f_2_num)}">${hero.Army.f_2_num}</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[hero.Army.f_3_type]].image}"/><div class="amount stroke ${Fixed.getArmyAmountColor(hero.Army.f_3_num)}">${hero.Army.f_3_num}</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[hero.Army.b_1_type]].image}"/><div class="amount stroke ${Fixed.getArmyAmountColor(hero.Army.b_1_num)}">${hero.Army.b_1_num}</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[hero.Army.b_2_type]].image}"/><div class="amount stroke ${Fixed.getArmyAmountColor(hero.Army.b_2_num)}">${hero.Army.b_2_num}</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${Elkaisar.BaseData.Army[Elkaisar.BaseData.HeroToCity[hero.Army.b_3_type]].image}"/><div class="amount stroke ${Fixed.getArmyAmountColor(hero.Army.b_3_num)}">${hero.Army.b_3_num}</div>
                                    </div>
                                </li>

                            </ol>
                            <ol class="equip-row">
                                <li>
                                    <div class="wrapper">
                                        <img src="${getEquipData(hero.Equip.helmet).image}">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="images/tech/no_army.png">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${getEquipData(hero.Equip.armor).image}">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${getEquipData(hero.Equip.boot).image}">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${getEquipData(hero.Equip.sword).image}">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="${getEquipData(hero.Equip.shield).image}">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="images/tech/no_army.png">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="images/tech/no_army.png">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="images/tech/no_army.png">
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <img src="images/tech/no_army.png">
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                        `;
    
    $("#city-profile-tooltipe").html(tooltip);
    
});

$(document).on("mouseleave" ,  "#city-profile .page_content ul .hero_profile" , function (){
    $("#city-profile-tooltipe").html("");
});

$(document).on("mouseenter" , ".equip-unit" , function (){
    var equi_part = $(this).attr("data-equi-part");
    var equi_type = $(this).attr("data-equi-type");
    var equi_lvl  = $(this).attr("data-equi-lvl");
    
    var unitEquipData = Equipment.getEquipData(equi_type , equi_part , equi_lvl);
    var toolip = `<div class="tooltip tooltip-equip">
                    <div class="top">
                        <div class="title">
                            ${unitEquipData.name}
                        </div>
                        <div class="points">
                            <ul>
                                <li>
                                    <div class="wrapper">
                                        <label>( <img src="images/icons/army/vitilty.png"> ) حيوية</label>&nbsp;&nbsp;&nbsp;&nbsp; <label>+${unitEquipData.Power.vitality}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label>( <img src="images/icons/army/attack.png"> ) هجوم</label>&nbsp;&nbsp;&nbsp;&nbsp; <label>+${unitEquipData.Power.attack}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label>( <img src="images/icons/army/defence.png"> ) دفاع</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label>+${unitEquipData.Power.defence}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label>( <img src="images/icons/army/damage.png"> ) انجراح</label>&nbsp;&nbsp; <label>+${unitEquipData.Power.damage}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label>( <img src="images/icons/army/break.png" style="width: 20px"> ) اجتياح</label>&nbsp;&nbsp; <label>+${unitEquipData.Power.break}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label>( <img src="images/icons/army/anti-break.png" style="width: 20px"> ) تصدى</label>&nbsp;&nbsp; <label>+${unitEquipData.Power.anti_break}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label>( <img src="images/icons/army/strike.png" style="width: 20px"> ) تدمير</label>&nbsp;&nbsp;&nbsp; <label>+${unitEquipData.Power.strike}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper">
                                        <label>( <img src="images/icons/army/immunity.png" style="width: 20px"> ) حصانة</label>&nbsp;&nbsp; <label>+${unitEquipData.Power.immunity}</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrapper" style="font-size: 16px; font-weight: bold">
                                        <label>(خواص) </label>&nbsp;&nbsp; <label>${Elkaisar.Equip.EquipFeature[unitEquipData.Power.sp_attr].Title}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>


                    </div>
                    <div class="bottom">
                        <div class="desc">
                            ${unitEquipData.desc}
                        </div>
                        <div class="long-desc">
                            ${unitEquipData.long_desc}
                        </div>
                        <div class="requir">
                            البطل مستوى ${1}
                        </div>
                    </div>
                </div>`;
    $(this).after(toolip);
});

$(document).on("mouseleave" , ".equip-unit" , function (){
    $(this).next(".tooltip-equip").remove();
});


$(document).on("click" , "#order-hero button" , function (){
    
    var id_hero = Number(Elkaisar.CurrentHero.Hero.id_hero);
    var index = 0;
    var cityHeroCount = 0;
    Elkaisar.Hero.orderHeors();
    
    for(var iii in Elkaisar.DPlayer.Heros){
        if(Number(Elkaisar.DPlayer.Heros[iii].Hero.id_city) !== Number(Elkaisar.CurrentCity.City.id_city))
            continue;
        if(Number(Elkaisar.DPlayer.Heros[iii].Hero.id_hero) === id_hero){
            index = cityHeroCount;
        }
        cityHeroCount++;
    }
    var self_ = $(this);
    var direction = $(this).attr("data-order");
    if(direction === "up" && Number(index)  === 0)return ;
    if(direction === "down" && Number(index) === cityHeroCount - 1)return ;
    
    var idCity = Elkaisar.CurrentCity.City.id_city;
    $.ajax({
        url: `${API_URL}/api/AHero/reOrderHero`,
        data:{
            idHero  : id_hero,
            MoveDir :direction,
            token   : Elkaisar.Config.OuthToken,
            server  : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            self_.attr("disabled" , "disabled");
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            self_.removeAttr("disabled");
            unwaitCursor();
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var jsonData = JSON.parse(data);
            
            
            if(jsonData.state === "ok")
            {
                
                for(var ii in jsonData.HeroList)
                {
                    if(!Elkaisar.Hero.getHero(jsonData.HeroList[ii].id_hero))
                        continue;
                    if(!Elkaisar.Hero.getHero(jsonData.HeroList[ii].id_hero).Hero)
                        continue;
                    Elkaisar.Hero.getHero(jsonData.HeroList[ii].id_hero).Hero.ord = jsonData.HeroList[ii].ord;
                }
                
            }
            Elkaisar.Hero.orderHeors();
            city_profile.refresh_hero_view();
            $("#city-hero-list").html(army.hero_list());
            $("#city-hero-list").niceScroll(SCROLL_BAR_PROP);
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    
    
    
});





/*   Equipment in hero  dialoge box*/
$(document).on("click" , "#eq-part-select button" , function (){
    
    $("#eq-part-select .selected").removeClass("selected");
    $(this).parent("li").addClass("selected");
    var equi_part = $(this).attr("data-equi-part");
    
    $("#equip-list-heroDia").html(army.getEquipList(0 , equi_part));
    
});



$(document).on("click" , "#navigate-btn .go-one-page-eq-left" , function (){
    var offset = $(".equip-unit:first").attr("data-offset");
    var equi_part = $("#eq-part-select .selected button").attr("data-equi-part");
    
    if(offset - 24  < 0)
        offset = 24;
    $("#equip-list-heroDia").html(army.getEquipList(offset - 24 , equi_part));
});


$(document).on("click" , "#navigate-btn .go-one-page-eq-right" , function (){
    var offset = Number($(".equip-unit:last").attr("data-offset"));
    var equi_part = $("#eq-part-select .selected button").attr("data-equi-part");
    
    if(offset + 1 >= Elkaisar.DPlayer.Equip.length) return ;
    $("#equip-list-heroDia").html(army.getEquipList(offset + 1 , equi_part));
});




 
/// put equipment on hero
$(document).on("dblclick" , ".putable-equi" , function (){
    
    var id_equip   = $(this).attr("id_equip");
    var id_hero    = Elkaisar.CurrentHero.Hero.id_hero;
    
    if($(this).attr("disabled") === "disabled")return ;
    
    $(".putable-equi").attr("disabled" , "disabled" ) ;
    
  
    
    if(!heroAvailableForTask(id_hero)){
        alert_box.confirmMessage("لا يمكن نقل المعدات </br> البطل فى مهمة");
        return false ;
        
    }
    
  
    
    
    
    $.ajax({
        url: `http://${WS_HOST}:${WS_PORT}/api/AHeroEquip/putEquipOnHero`,
        data: {
            idEquip : id_equip,
            idHero  : id_hero,
            token   : Elkaisar.Config.OuthToken,
            server  : Elkaisar.Config.idServer
        },
        type: 'POST',
        beforeSend: function (xhr) {
            waitCursor();
        },
        success: function (data, textStatus, jqXHR) {
            
            unwaitCursor();
            $(".putable-equi").removeAttr("disabled" , "disabled" );
            
            if(!Elkaisar.LBase.isJson(data))
                return Elkaisar.LBase.Error(data);
            
            var json_data = JSON.parse(data);
            
          
          
            if(json_data.state === "error_0"){
                
                  alert_box.confirmMessage("لا تمتلك هذه المعدة");
                  Elkaisar.Equip.getPlayerEquip();
                  
            }else if(json_data.state === "error_1"){
                
                  alert_box.confirmMessage("لا تمتلك هذا البطل");
                  Elkaisar.City.getCityHero();
                  
            }else if(json_data.state === "error_2"){

                  alert_box.confirmMessage("لا يمكن لقطعة المعدة الواحدة ان تكون لاكثر من بطل");
                  Elkaisar.Equip.getPlayerEquip();

            }else if(json_data.state === "error_3"){
                  alert_box.confirmMessage("البطل ليس فى المدينة");
            }else if(json_data.state == "ok"){
                
              
                for(var iii in json_data.PlayerEquip)
                {
                    Elkaisar.Equip.getEquipUnit(json_data.PlayerEquip[iii].id_equip).id_hero = json_data.PlayerEquip[iii].id_hero;
                    Elkaisar.Equip.getEquipUnit(json_data.PlayerEquip[iii].id_equip).on_hero = json_data.PlayerEquip[iii].on_hero;
                }
                
                Elkaisar.Equip.distributeEquip();
                army.HeroEquip();
                
                var offset = Number($(".equip-unit:first").attr("data-offset"));
                var equi_part = $("#eq-part-select .selected button").attr("data-equi-part");
                $("#equip-list-heroDia").html(army.getEquipList(offset , equi_part));
                
            }else{
                Elkaisar.LBase.Error(data);
            }
            
           
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    
});


Elkaisar.Hero.getEquipOffHero = function (idEquip) {
    return $.ajax({
        url: `http://${WS_HOST}:${WS_PORT}/api/AHeroEquip/putEquipOffHero`,
        'data': {
            'idEquip': idEquip,
            token: Elkaisar['Config']['OuthToken'],
            server: Elkaisar['Config']['idServer']
        },
        'type': 'POST',
        beforeSend: function (_0x357aa2) {
            waitCursor();
        },
        success: function (_0x1b8d26, _0x56a04b, _0x499453) {
            unwaitCursor();
            if (!Elkaisar['LBase']['isJson'](_0x1b8d26)) return Elkaisar.LBase.Error(data);;
            var _0x29c7b2 = JSON['parse'](_0x1b8d26);
            if (_0x29c7b2['state'] === 'error_0') alert_box['confirmMessage']('لا تمتلك هذه المعدة'), Elkaisar['Equip']['getPlayerEquip']();
            else {
                if (_0x29c7b2['state'] === 'error_1') alert_box['confirmMessage']('لا تمتلك هذا البطل'), Elkaisar['City']['getCityHero']();
                else {
                    if (_0x29c7b2['state'] === 'error_2') alert_box['confirmMessage']('لا يمكن لقطعة المعدة الواحدة ان تكون لاكثر من بطل'), Elkaisar['Equip']['getPlayerEquip']();
                    else {
                        if (_0x29c7b2['state'] === 'error_3') alert_box['confirmMessage']('البطل ليس فى المدينة');
                        else if (_0x29c7b2['state'] === 'ok') {
                            for (var _0xeee9ee in _0x29c7b2['PlayerEquip']) {
                                Elkaisar['Equip']['getEquipUnit'](_0x29c7b2['PlayerEquip'][_0xeee9ee]['id_equip'])['id_hero'] = _0x29c7b2['PlayerEquip'][_0xeee9ee]['id_hero'], Elkaisar['Equip']['getEquipUnit'](_0x29c7b2['PlayerEquip'][_0xeee9ee]['id_equip'])['on_hero'] = _0x29c7b2['PlayerEquip'][_0xeee9ee]['on_hero'];
                            }
                            Elkaisar['Equip']['distributeEquip']();
                        }
                    }
                }
            }
        },
        'error': function (_0x146c8b, _0x252f13, _0x4b01cf) {}
    });
}

$(document).on("dblclick" , ".on_equip" , function (){
    
    
    
    var id_equip = $(this).attr("id_equip");
    var id_hero = Elkaisar.CurrentHero.Hero.id_hero;
    
    if(!heroAvailableForTask(id_hero)){
        $("body").append( alert_box.confirmMessage("لا يمكن نقل القوات </br> البطل فى مهمة"));
        return false ;
        
    }
    if($(this).attr("disabled") === "disabled")return ;
    $(".on_equip").attr("disabled" , "disabled" ) ;
    var self = $(this);
    Elkaisar.Hero.getEquipOffHero(id_equip).done(function (data){
        
        unwaitCursor();
        $('.on_equip')['removeAttr']('disabled', 'disabled');
        var JsonData = JSON.parse(data);
        if(JsonData.state == "ok"){
            self['removeClass']('on_equip');
            for (var iii in JsonData['PlayerEquip']) {
                Elkaisar['Equip']['getEquipUnit'](JsonData['PlayerEquip'][iii]['id_equip'])['id_hero'] = JsonData['PlayerEquip'][iii]['id_hero'];
                Elkaisar['Equip']['getEquipUnit'](JsonData['PlayerEquip'][iii]['id_equip'])['on_hero'] = JsonData['PlayerEquip'][iii]['on_hero'];
            }
            Elkaisar.Equip.distributeEquip();
            army.HeroEquip();
            
            var offset = Number($('.equip-unit:first')['attr']('data-offset'));
            var part = $('#eq-part-select .selected button')['attr']('data-equi-part');
            $('#equip-list-heroDia')['html'](army['getEquipList'](offset, part));
        }
    });
});



/*                                      طرد البطل                                     */
$(document).on("click" , ".FIRE_HERO" , function (){
    
    var self = $(this);
    var CHero = Elkaisar.CurrentHero;
    for (var ii in Elkaisar.DPlayer.Equip)
        if(Number(Elkaisar.DPlayer.Equip.id_hero) === Number(CHero.Hero.id_hero))
            return alert_box.confirmMessage(" لا يمكنك طرد بطل يحمل معدات </br> قم  بازالة المعدات و حاول مرة اخرى");
        
    
    
    
    if(getHeroCap(CHero.Army) > 0 )
        return alert_box.confirmMessage(" لا يمكنك طرد بطل يحمل قوات ");

    if(Number(CHero.Hero.in_city) !== 1)
        return alert_box.confirmMessage("لا يمكنك طرد البطل وهو فى مهمة");
        
    if(Number(Elkaisar.CurrentCity.City.console) === Number(CHero.Hero.id_hero))
        return alert_box.confirmMessage("لا يمكنك طرد  قنصل المدينة");
    
        
    alert_box.confirmDialog(`تأكيد طرد البطل  ${CHero.Hero.name}</br>  اذا كان البطل يحمل قوات سيتم حذفها مع البطل ولا يمكنك استرجاع البطل مرة اخرى`, function (){

        $.ajax({
            url: `${API_URL}/api/AHero/fireHero`,
            data:{
                idHero : CHero.Hero.id_hero,
                token  : Elkaisar.Config.OuthToken,
                server : Elkaisar.Config.idServer
            },
            type: 'POST',
            beforeSend: function (xhr) {
                waitCursor();
                self.attr("disabled" , "disabled");
            },
            success: function (data, textStatus, jqXHR) {
                unwaitCursor();
                self.removeAttr("disabled");
                $(".close_dialog").click();
                Elkaisar.City.getCityHero(CHero.Hero.id_city);
                alert_box.succesMessage("تم طرد البطل بنجاح");
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    });
        
    
    
    
});


$(document).on("click" , ".show-hero-detailed-review" , function (e){
    e.stopPropagation();
    
    var id_hero = Number($(this).data('id-hero'));
    var hero = null;
    var self = $(this);
    
   for(var iii in Elkaisar.DPlayer.Heros)
       if(Number(Elkaisar.DPlayer.Heros[iii].Hero.id_hero) === Number(id_hero))
            return alert_box.heroReviewDetail(hero);
 
    
    
    $.ajax({
        url: "api/hero.php",
        data: {
            HERO_REVIEW_DETAIL: true,
            id_hero: id_hero
        },
        type: 'GET',
        beforeSend: function (xhr) {
            waitCursor();
            self.attr("disabled" , "disabled");
        },
        success: function (data, textStatus, jqXHR) {
            unwaitCursor();
            self.removeAttr("disabled");
            if(isJson(data)){
                var jsonData = JSON.parse(data);
            }else{
                alert(data);
                return;
            }
            
            alert_box.heroReviewDetail(jsonData);
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    })
    
});

Elkaisar['Hero']['showHeroDetail'] = function (_0x1dde0d) {
    if (!_0x1dde0d) _0x1dde0d = Elkaisar['CurrentHero'];
    var _0x244de8 = getEquipData(_0x1dde0d['Equip']['sword']),
        _0x5b7119 = getEquipData(_0x1dde0d['Equip']['helmet']),
        _0x40e185 = getEquipData(_0x1dde0d['Equip']['boot']),
        _0x6d6d6d = getEquipData(_0x1dde0d['Equip']['armor']),
        _0x41d2d3 = getEquipData(_0x1dde0d['Equip']['shield']),
        _0x53be79 = getEquipData(_0x1dde0d['Equip']['belt']),
        _0x4ec34c = getEquipData(_0x1dde0d['Equip']['necklace']),
        _0x2c58ba = getEquipData(_0x1dde0d['Equip']['pendant']),
        _0x44f6e0 = getEquipData(_0x1dde0d['Equip']['ring']),
        _0x146cdd = getEquipData(_0x1dde0d['Equip']['steed']),
        _0x162501 = '<div id=\"hero-over-view\">\x0a                        <div class=\"right\">\x0a                            <div class=\"equip-review\">\x0a                                <ul>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x5b7119['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x4ec34c['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x6d6d6d['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x40e185['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x244de8['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x41d2d3['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x2c58ba['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x53be79['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li style=\"margin-left: 25%;\">\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x44f6e0['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(' + _0x146cdd['image'] + ')\"></div>\x0a                                        </div>\x0a                                    </li>\x0a                                </ul>\x0a                                    \x0a                            </div>\x0a                            <div class=\"row row-3\">\x0a                                <div class=\"pull-L col-1\">الجنود- الفيلق</div>                       \x0a                                <div class=\"pull-L col-2\">\x0a                                    <div class=\"over-text\">' + (getHeroCap(_0x1dde0d['Army']) + '/' + getHeroMaxCap(_0x1dde0d)) + '</div>\x0a                                    <div class=\"colored-bar filak\" style=\"width: ' + getHeroCap(_0x1dde0d['Army']) * 0x64 / getHeroMaxCap(_0x1dde0d) + '%\"></div>\x0a                                </div>\x0a                                <div class=\"pull-L col-3\">\x0a                                </div>\x0a                            </div>\x0a                            <div class=\"dicor\"></div>\x0a                            \x0a                            <div class=\"army-review\">\x0a                                \x0a                                <ul>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(images/tech/' + army_typs[_0x1dde0d['Army']['f_1_type']] + ')\">\x0a                                                <div class=\"amount ' + Fixed['getArmyAmountColor'](_0x1dde0d['Army']['f_1_num']) + '\"> ' + _0x1dde0d['Army']['f_1_num'] + '</div>\x0a                                            </div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(images/tech/' + army_typs[_0x1dde0d['Army']['f_2_type']] + ')\">\x0a                                                <div class=\"amount ' + Fixed['getArmyAmountColor'](_0x1dde0d['Army']['f_2_num']) + '\"> ' + _0x1dde0d['Army']['f_2_num'] + '</div>\x0a                                            </div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(images/tech/' + army_typs[_0x1dde0d['Army']['f_3_type']] + ')\">\x0a                                                <div class=\"amount ' + Fixed['getArmyAmountColor'](_0x1dde0d['Army']['f_3_num']) + '\"> ' + _0x1dde0d['Army']['f_3_num'] + '</div>\x0a                                            </div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(images/tech/' + army_typs[_0x1dde0d['Army']['b_1_type']] + ')\">\x0a                                                <div class=\"amount ' + Fixed['getArmyAmountColor'](_0x1dde0d['Army']['b_1_num']) + '\"> ' + _0x1dde0d['Army']['b_1_num'] + '</div>\x0a                                            </div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(images/tech/' + army_typs[_0x1dde0d['Army']['b_2_type']] + ')\">\x0a                                                <div class=\"amount ' + Fixed['getArmyAmountColor'](_0x1dde0d['Army']['b_2_num']) + '\"> ' + _0x1dde0d['Army']['b_2_num'] + '</div>\x0a                                            </div>\x0a                                        </div>\x0a                                    </li>\x0a                                    <li>\x0a                                        <div class=\"wrapper\">\x0a                                            <div class=\"img\" style=\"background-image: url(images/tech/' + army_typs[_0x1dde0d['Army']['b_3_type']] + ')\">\x0a                                                <div class=\"amount ' + Fixed['getArmyAmountColor'](_0x1dde0d['Army']['b_3_num']) + '\"> ' + _0x1dde0d['Army']['b_3_num'] + '</div>\x0a                                            </div>\x0a                                        </div>\x0a                                    </li>\x0a                                </ul>\x0a                            </div>\x0a                        </div>\x0a                        <div class=\"middel\">\x0a                            \x0a                        </div>\x0a                        <div class=\"left\">\x0a                            <div class=\"hero-data\">\x0a                                <div class=\"name\">\x0a                                    <div class=\"wrapper\">\x0a                                        ' + _0x1dde0d['Hero']['name'] + '\x0a                                    </div>\x0a                                </div>\x0a                                <div class=\"image\">\x0a                                    <div class=\"wrapper\">\x0a                                        <div class=\"avatar-hero\" style=\"background-image: url(' + Elkaisar['BaseData']['HeroAvatar'][_0x1dde0d['Hero']['avatar']] + ')\">\x0a                                            <div class=\"lvl\">' + _0x1dde0d['Hero']['lvl'] + '</div>\x0a                                        </div>\x0a                                    </div>\x0a                                </div>\x0a                            </div>\x0a                            <div class=\"hero-points\">\x0a                                <table border=\"1\">\x0a                                    <tr>\x0a                                        <td>قوة السيطرة</td>\x0a                                        <td> <span style=\" color: #008c10;\"> ' + _0x1dde0d['Hero']['point_a'] + ' + ' + _0x1dde0d['Hero']['point_a_plus'] + '</span></td>\x0a                                    </tr>\x0a                                    <tr>\x0a                                        <td>الشجاعة</td>\x0a                                        <td> <span style=\"color: #b43d02;\"> ' + _0x1dde0d['Hero']['point_b'] + ' + ' + _0x1dde0d['Hero']['point_b_plus'] + '</span></td>\x0a                                    </tr>\x0a                                    <tr>\x0a                                        <td>الدفاع</td>\x0a                                        <td> <span style=\"color: #0065ac;\"> ' + _0x1dde0d['Hero']['point_c'] + ' + ' + _0x1dde0d['Hero']['point_c_plus'] + '</span></td>\x0a                                    </tr>\x0a                                </table>\x0a                            </div>\x0a                        </div>\x0a                    </div>';
    alert_box['alert3X2'](Translate['Title']['Alert']['ShowHero'][UserLag['language']], _0x162501);
};