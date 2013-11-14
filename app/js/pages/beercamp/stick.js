/*
 * Copyright (c) 2013 Kyle Conrad - kyle(at)kyleconrad(dot)com | http://www.kyleconrad.com
 * Dual licensed under MIT and GPL.
 * @name jQuery Stick
 * @projectDescription Easy sticky elements as you scroll.
 * @author Kyle Conrad
 * @version 0.1
 *
 * $('.block').stick({
 *      offset: 0,
 *      bottompadding: 0,
 *      container: '.container',
 *      stickyclass: 'stick',
 *      endclass: 'stick-end'
 * });
*/


(function($){

    $.fn.stick = function(options) {

        var defaults = {
            offset          : 0,
            bottompadding   : 0,
            container       : '.container',
            stickyclass     : 'stick',
            endclass        : 'stick-end'
        }
        var options =  $.extend(defaults, options);

        return this.each(function() {
            var o = options;
            var block = $(this);

            $(window).scroll(function(){
                var sticky = false;

                var top = $(window).scrollTop();

                var stickytop = $(o.container).offset().top-o.offset;
                var stickybottom = $(document).scrollTop() + block.outerHeight(true);
                var divHeight = $(o.container).offset().top + $(o.container).outerHeight(true);

                if (top > stickytop) {

                    block.addClass(o.stickyclass);
                    sticky = true;

                    if (stickybottom >= divHeight-o.bottompadding) {
                        block.removeClass(o.stickyclass).addClass(o.endclass);
                    }
                    else {
                        block.removeClass(o.endclass).addClass(o.stickyclass);
                    }

                }
                else {
                    block.removeClass(o.stickyclass);
                }

            });

        });

    };

})(jQuery);