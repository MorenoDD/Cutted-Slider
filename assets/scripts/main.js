(function($) {

    var $mddShare = $('#mdd-share'),
        $mddShareOpen = $('#mdd-share--open'),
        $mddShareClose = $('#mdd-share--close'),
        $mddShareLayer = $('#mdd-share--layer');

    $mddShareOpen.on('click', function(){
        $mddShare.addClass('in');
        return false;
    });

    $mddShareClose.on('click', function(){
        $mddShare.removeClass('in');
        return false;
    });

    $mddShareLayer.find('.md-share').on('click', function(){
        window.open(jQuery(this).attr('href'), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    });

    var $mirrorSlider = $('#mirror-slider'),
        $slides = $mirrorSlider.find('.slides'),
        $current = 0,
        $isMoving = false
        $isInit = false;

    function _setSlider(){
        var $height = $(window).height()-300;
        if($height%2 === 1) {
            $height++;
        }
        
        $mirrorSlider.css('height', $height + 'px');

        $slides.find('li').each(function(){

            $(this).find('.cut span').each(function(i){
                var $y = -($mirrorSlider.height() / 10)*i;
                $(this).css('background-position', '50% '+$y+'px');
            });
        });
    }


    function _setCuts(){
        $slides.find('li').each(function(){
            var $that = $(this);
            var $image = $that.find('img');
            $that.append('<div class="cut"></div>');
            for (var i = 0; i < 10; i++) {
                $that.find('.cut').append('<span></span>');
            }
            $that.find('.cut span').css('background-image', 'url('+$image.attr('src')+')');
            $image.remove();
        });
    }

    $mirrorSlider.find('.nav a').on('click', function(){
        if(!$isMoving){
            $isMoving = true;
            $slides.find('li').eq($current).addClass('next-out');

            if($(this).data('dir') === 'prev'){
                
                $current--;
                if($current < 0 ){
                    $current = $slides.find('li').length - 1;
                }

            } else {

                $current++;
                if($current > ($slides.find('li').length - 1) ){
                    $current = 0;
                }

            }

            $slides.find('li').eq($current).addClass('next-in');

            setTimeout(function(){
                $slides.find('li.current').removeClass();
                $slides.find('li').eq($current).removeClass().addClass('current');
            }, 1000);
            setTimeout(function(){
                $isMoving = false;
            }, 1500);

            /* extra */
            $('.thumbs').toggleClass('next');
            $('.titles').toggleClass('next');

        }

        return false;
    });

    setTimeout(function(){
        $slides.find('li').eq(0).removeClass('first').addClass('current');
    }, 10);

    $(window).resize(function(){
        _setSlider();
    });

    _setCuts();
    _setSlider();

})(jQuery);