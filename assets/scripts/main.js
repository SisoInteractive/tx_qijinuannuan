// Created by sam mok 2015(Siso brand interactive team).
"use strict";
var app = {
    preload:function(){
        var that       = this,
            firstImg   = {   //this is load images for object
                path        : "scene01",
                arrName     : [],
                loadAmounts : 0
            };
        //This method is to load first images
        (function( firstImg ){
            var imgDomArr = document.getElementsByClassName(firstImg.path)[0].getElementsByTagName('img');
            for( var j = 0; j < imgDomArr.length; j++ ){
                firstImg.arrName.push( imgDomArr[j].src );
            }
            if( firstImg.arrName != [] )
            {
                for(var i = 0; i < firstImg.arrName.length; i++ ){
                    var img = new Image();
                    img.src = firstImg.arrName[i];
                    img.onload = function(){
                        firstImg.loadAmounts++;
                        if( firstImg.loadAmounts == firstImg.arrName.length ){
                            app.main();
                            console.log('app started success...');
                        }
                    };
                }
            }
        }( firstImg ));
    },
    main: function (){
        var imgSliderBtn   = $('.imgSliderbtn'),
            imgSliderBtn2  = $('.imgSliderbtn2'),
            imgSliderPrev  = $('.imgSliderbtn .sliderPrev'),
            imgSliderNext  = $('.imgSliderbtn .sliderNext'),
            imgSliderPrev2 = $('.imgSliderbtn2 .sliderPrev'),
            imgSliderNext2 = $('.imgSliderbtn2 .sliderNext'),
            imgIsleder2    = $('#imgIsleder2'),
            imgIsleder1    = $('#imgIsleder1');
        // New a object for mySwiper
        app.mySwiper = new Swiper ('.swiper-container', {
            direction: 'vertical',
            parallax : true,
            noSwiping: false,
            // init
            onInit: function (){
                $('.swiper-slide').eq(0).addClass('active');
            },
            onTransitionStart: function (swiper) {
                if( swiper.activeIndex == 1 || swiper.activeIndex == 2 ){ $('.gril-warp').show(); }else{ $('.gril-warp').hide(); }
                if( swiper.activeIndex == 0 ){ $('.firstNo').hide(); }else{ $('.firstNo').show(); }
                // show imgSlider btn in scene03
                if( swiper.activeIndex == 2 ){ imgSliderBtn.show(); }else{ imgSliderBtn.hide(); }
                if(swiper.activeIndex == 3){ imgSliderBtn2.show(); imgIsleder2.show(); if( scene04ImgIndex == 0){ imgSliderPrev2.hide() } }else{ imgIsleder2.hide(); imgSliderBtn2.hide(); }
                if(swiper.activeIndex == swiper.slides.length - 1){ $('.lastNo').hide(); }else{ $('.lastNo').show(); }
            },
            onTransitionEnd: function (swiper) {
                $('.swiper-slide').removeClass('active')
                    .eq(swiper.activeIndex).addClass('active');
            }

        });

        //点击登录qq 或者 微信 按钮
        $('.logQ,.logW').click(function(){
            //app.mySwiper.slideNext();
            //app.mySwiper.lockSwipeToPrev();  //禁止向上
        });
        // unlock Swipes
        //app.mySwiper.unlockSwipes();
        // lock Swipes
        //app.mySwiper.lockSwipes();

        //push images data to an scene03ImgArr
        var scene03ImgArr = [],
            scene03ImgArrlength = 10,
            scene03ImgIndex = 0; // scene03ImgIndex is index for page3imgSlider
        (function( scene03ImgArr , scene03ImgArrlength ){
            for(var i = 1; i <= scene03ImgArrlength; i++ ){
                var data = { content: 'assets/images/page3/chapter'+ i +'.jpg' }
                scene03ImgArr.push( data );
            }
        }( scene03ImgArr,scene03ImgArrlength));
        //scene03 Slider init
        var page3imgSlider = new iSlider({
            dom:document.getElementById('imgIsleder1'),
            data:scene03ImgArr,
            isLooping: 0,
            isOverspread: 1,
            isAutoplay: false,
            animateTime: 800,
            animateType: 'depth',
            onslidechange:function(Index){
                scene03ImgIndex = Index;
                if( Index === 0 ){
                    imgSliderPrev.hide();
                }else if(Index == scene03ImgArrlength - 1 ){
                    imgSliderNext.hide();
                    setInterval(function(){
                        imgSliderPrev.hide();
                        $('.userMapData-warp').fadeIn();
                        $('.typeend').fadeIn();
                        $('.page3-f').fadeOut();
                        $('.seal , .pin , .userMapData').addClass('active');
                        page3imgSlider.destroy(); // 销毁当前iSlider实例，内存释放
                    },1000);
                }else{
                    imgSliderPrev.show();
                    imgSliderNext.show();
                }
                switch(Index) {
                    case 6:
                        $('.chapter7').fadeIn();
                        break;
                    case 7:
                        $('.chapter8').fadeIn();
                        break;
                    case 8:
                        $('.chapter9').fadeIn();
                        break;
                    case 9:
                        $('.chapter10').fadeIn();
                        break;
                }
            }
        });

        //this is scene04 images data
        var scene04ImgArr = [],
            scene04ImgArrLength = 11,
            scene04ImgIndex = 0;
        //push images data to an scene04ImgArr
        (function( scene04ImgArr,scene04ImgArrLength ){
            for(var i = 1; i <= scene04ImgArrLength; i++ ){
                var data = { content: 'assets/images/page4/model'+ i +'.png' }
                scene04ImgArr.push( data );
            }
        }(scene04ImgArr,scene04ImgArrLength));
        //scene04 Slider init
        var page4imgSlider = new iSlider({
            dom:document.getElementById('imgIsleder2'),
            data:scene04ImgArr,
            isLooping: 0,
            isOverspread: 1,
            animateTime: 800,
            animateType: 'depth',
            onslidechange:function(Index){
                scene04ImgIndex = Index;
                if(scene04ImgIndex !== 0){
                    imgSliderPrev2.show();
                    if( scene04ImgIndex == scene04ImgArrLength-1 ){
                        imgSliderNext2.hide();
                    }else{
                        imgSliderNext2.show();
                    }
                }else{
                    imgSliderPrev2.hide();
                }
                $('.imgIsleder2-number').html( Index + 1 + "<span>/</span>"+ scene04ImgArrLength );
            }
        });
        //init imgSlider plugin
        if( page3imgSlider.initIndex===0 ){
            imgSliderPrev.hide();
        }
        imgSliderPrev.on('touchend',function(){ page3imgSlider.slidePrev(); });
        imgSliderNext.on('touchend',function(){ page3imgSlider.slideNext(); });
        imgSliderPrev2.on('touchend',function(){ page4imgSlider.slidePrev(); });
        imgSliderNext2.on('touchend',function(){ page4imgSlider.slideNext(); });

        //scene04 click btn-next event
        $('.scene04 .btn-next').on('touchend',function(){
            var type1 = $(this).siblings('.type1');
            var type2 = $(this).prev('.type2');
            var text = $(this).siblings('.text-warp');
            type1.hide();
            type2.show();
            text.hide();
            $(this).hide();
        })

        //  first time play BGM
        var initSound = function () {
            //  delay play
            $('#audio')[0].play();
            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);
    }
};

$(function (){
    // init app
    app.preload();
    //app.main();
});