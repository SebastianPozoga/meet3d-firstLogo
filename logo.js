/* 
 Created on : Nov 9, 2013, 7:39:45 PM
 Author     : spozoga (Sebastian Pożoga)
 WWW        : https://github.com/SebastianPozoga
 Created for: MEET3D.PL
 License    : MIT (http://opensource.org/licenses/MIT)
 */



$(function() {
    /*var boxWidth = 50, boxHeight = 50;
     var marginSpace = 10;
     palette_base = {
     width: boxWidth-marginSpace + "px",
     height: boxHeight-marginSpace + "px",
     "-webkit-border-radius": "20px",
     "-moz-border-radius": "20px",
     "border-radius": "20px",
     padding:"2px"
     };
     //dupa
     var palette_bg = $.extend({
     }, palette_base);
     
     var palette_fill = $.extend({
     background: "#aaa",
     border:"1px solid #111"
     }, palette_base);
     
     var palette = [palette_bg, palette_fill];
     var image = [
     [1, 1, 1, 0, 1, 1, 1, 0],
     [0, 0, 1, 0, 1, 0, 1, 1],
     [0, 0, 1, 0, 1, 0, 0, 1],
     [1, 1, 1, 0, 1, 0, 0, 1],
     [0, 0, 1, 0, 1, 0, 0, 1],
     [0, 0, 1, 0, 1, 0, 1, 1],
     [1, 1, 1, 0, 1, 1, 1, 0]
     ];
     var $container = $(".logoContainer");
     //create image
     for (var y = 0; y < image.length; y++) {
     for (var x = 0; x < image[y].length; x++) {
     var $div = $("<div class='e'>");
     $div.addClass('p'+image[y][x]);
     $div.css({
     position: "absolute",
     top: y * boxHeight + "px",
     left: x * boxWidth + "px"
     });
     var palette_id = image[y][x];
     $div.css(palette[palette_id]);
     $container.append($div);
     }
     }*/

    var createMap = function(map, palette) {
        var $map = $("<div class='map'></div>");
        for (var y = 0; y < map.length; y++) {
            var $row = $("<div class='row'></div>");
            for (var x = 0; x < map[y].length; x++) {
                //cell
                var $cell = $("<div class='cell'></div>");
                $cell.addClass("x" + x);
                $cell.addClass("y" + y);
                //conetent
                var palette_id = map[y][x];
                var $content = $(palette[palette_id]);
                $content.addClass("e");
                $cell.append($content);
                $row.append($cell);
            }
            $map.append($row);
        }
        return $map;
    };

    var randomClass = function($set, className, count) {
        $set.removeClass(className);
        for (var i = 0; i < count; i++) {
            var random_index = Math.floor(Math.random() * $set.length);
            $($set.get(random_index)).addClass(className);
            $set.splice(random_index, 1);
        }
    };

    //add randomization
    var rInterval = function(fn, time, wait) {
        setTimeout(function() {
            setInterval(fn, time);
        }, wait);
    };

    //render logo
    var createLogo = function() {
        //Init data
        var logoPalette = ["<div class='bg'></div>", "<div class='fill'></div>"];
        var logoMap = [
            [1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 1, 0, 1, 0, 1, 1],
            [0, 0, 1, 0, 1, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 0]
        ];
        //
        var $map = createMap(logoMap, logoPalette);
        //$container.empty().append($map);
        //time actions
        var selector = ".e.bg";
        rInterval(function() {
            randomClass($map.find(selector), "randed", 1);
        }, 3000, 30);
        rInterval(function() {
            randomClass($map.find(selector), "randed2", 1);
        }, 3000, 1000);
        rInterval(function() {
            randomClass($map.find(selector + ":not(.clicked)"), "startGame", 1);
        }, 3000, 1000);
        //user actions
        $map.on("click", ".e", function() {
            $(this).addClass("clicked");
        });
        $map.on("click", ".startGame", function() {
            $mainLogo.find(".e").removeClass("startGame");
            $(".modalContainer").remove();
            var $game = createGame();
            modal($game);
        });
        return $map;
    };

    //main logo
    var $container = $(".logoContainer");
    var $mainLogo = createLogo();
    $mainLogo.append();
    rInterval(function() {
        $mainLogo.find(".e").removeClass("fullscreen");
        randomClass($mainLogo.find(".e.bg:not(.clicked):not(.startGame)"), "fullscreen", 1);
    }, 3000, 200);
    $mainLogo.on("click", ".fullscreen", function() {
        var $fullLogo = createLogo();
        modal($fullLogo);
    });
    $container.empty().append($mainLogo);


    /*
     * Game mode
     */

    var modal = function(c) {
        //elements
        var $container = jQuery("<div class='modalContainer'></div>");
        var $body = jQuery("<div style='width:100%;min-width:600px;display:inline-block;margin:auto;z-index:1002;position:absolute;top:0px;text-align:center'></div>");
        var $content = jQuery("<div style='margin:60px auto;padding:20px;width:80%;min-height:300px;display:inline-block;background: rgba(255, 255, 255, 0.95);' class='modal'></div>");
        var $bg = jQuery("<div style='width:100%;height:100%;position:fixed;top:0px;left:0px;background: rgba(150, 150, 150, 0.5);z-index:1000;'></div>");
        var $close = jQuery("<a class='close' style='text-align:right;display:block;text-decoration:none;color:#111' href='#'>Zamknij (X)</a>");
        //appends
        $container.append($bg);
        $container.append($body);
        $body.append($content);
        $content.append($close);
        $content.append(c);
        //close
        var remove = function() {
            $container.remove();
        };
        $bg.click(remove);
        $close.click(remove);
        //move
        jQuery('html, body').animate({scrollTop: 0}, 'fast');
        //add to DOM
        jQuery("body").append($container);
    };

    /*
     * Create Game
     */
    var points = 0;
    var createGame = function(lvl) {
        if (!lvl) {
            lvl = 1;
        }
        //Init data
        var gamePalette = [
            "<div class='b0'></div>",
            "<div class='b1'></div>",
            "<div class='b2'></div>",
            "<div class='b3'></div>",
            "<div class='b4'></div>",
            "<div class='b5'></div>",
            "<div class='b6'></div>"
        ];
        var gamePaletteRand = function() {
            return Math.floor(Math.random() * gamePalette.length);
        }
        var setRand = function(paletteIndex, map, count) {
            for (var i = 0; i < count; i++) {
                var y = Math.floor(Math.random() * map.length);
                var x = Math.floor(Math.random() * map[y].length);
                map[y][x] = paletteIndex;
            }
        }

        var winIndex = gamePaletteRand();

        var gameMap = [];
        for (var y = 0; y < lvl + 3; y++) {
            var record = [];
            for (var x = 0; x < lvl + 3; x++) {
                record.push(gamePaletteRand());
            }
            gameMap.push(record);
        }

        //set min 2 wined elements
        setRand(winIndex, gameMap, 2);

        //game
        var $gameContainer = $("<div class='logoGame'></div>");
        //map
        var $gameMap = createMap(gameMap, gamePalette);
        $gameContainer.append($gameMap);

        //add logic
        var winSelector = ".b" + winIndex;
        var nextLvl = function() {
            if (lvl == 3) {
                if (points < 0) {
                    alert("You are win?!?!");
                    $gameContainer.html('<h1>You are win...(??)</h1><iframe width="420" height="315" src="//www.youtube.com/embed/Yigf1ZqtOY4?autoplay=1" frameborder="0" allowfullscreen></iframe>');
                    return;
                } else {
                    alert("You are win!!!");
                    $gameContainer.html('<h1>You are win!!!</h1><iframe width="420" height="315" src="//www.youtube.com/embed/04854XqcfCY?autoplay=1" frameborder="0" allowfullscreen></iframe>');
                    return;
                }
            }
            //create next lvl
            alert("next lvl. gratz.");
            var $nextlvl = createGame(lvl + 1);
            $gameContainer.parent().append($nextlvl);
            $gameContainer.remove();
            return;
        };

        var addInfo = function() {
            var $info = $("<div class='info'>");
            var $count = $("<div class='count'></div>");
            $info.append($count);
            var $lvl = $("<h2 class='lvl'>Lvl:" + lvl + "</h2>");
            $info.append($lvl);
            var $points = $("<h3 class='points'></h3>");
            $info.append($points);
            var $message = $("<div class='messages'>Find more bridgets</div>");
            $info.append($message);
            $gameContainer.append($info);
        };

        var updateInfo = function() {
            var $notFinded = $(winSelector + ":not(.finded)");
            //update info
            $gameContainer.find(".count").text($notFinded.size() + " (to find)");
            $gameContainer.find(".points").text(points + " points");
        };



        setTimeout(function() {
            //init
            $gameMap.addClass("timeout");
            addInfo();
            //logic
            $gameMap.on("click",winSelector+":not(.finded)", function() {
                //view
                $(this).addClass("finded");
                //points & lvl
                points += 10;
                var $notFinded = $(winSelector + ":not(.finded)");
                if ($notFinded.size() == 0) {
                    nextLvl();
                }
                //update info
                updateInfo();
            });
            $gameMap.on("click", ".e:not(.b"+winIndex+")", function() {
                //view
                $(this).addClass("clicked");
                //points & lvl
                points -= 4;
                //update info
                updateInfo()
            });
            //show first
            $($gameMap.find(winSelector).get(0)).trigger("click");
        }, 3000);

        //
        return $gameContainer;
    };



});