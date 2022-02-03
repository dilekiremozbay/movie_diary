(function($) {
    'use strict';

    // Page loading
    $(window).on('load', function() {
        $('.preloader').delay(450).fadeOut('slow');
    });

    // Scroll progress
    var scrollProgress = function() {
        var docHeight = $(document).height(),
            windowHeight = $(window).height(),
            scrollPercent;
        $(window).on('scroll', function() {
            scrollPercent = $(window).scrollTop() / (docHeight - windowHeight) * 100;
            $('.scroll-progress').width(scrollPercent + '%');
        });
    };

    // Off canvas sidebar
    var OffCanvas = function() {
        $('#off-canvas-toggle').on('click', function() {
            $('body').toggleClass("canvas-opened");
            $('html').toggleClass("has-offcanvas");
        });

        $('.dark-mark').on('click', function() {
            $('body').removeClass("canvas-opened");
            $('html').removeClass("has-offcanvas");
        });
        $('.off-canvas-close').on('click', function() {
            $('body').removeClass("canvas-opened");
            $('html').removeClass("has-offcanvas");
        });
    };

    // Search form
    var openSearchForm = function() {
        $('button.search-icon').on('click', function() {
            $('body').toggleClass("open-search-form");
            $('.mega-menu-item').removeClass("open");
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });
        $('.search-close').on('click', function() {
            $('body').removeClass("open-search-form");
        });
    };

    // Mobile menu
    var mobileMenu = function() {
        var menu = $('ul#mobile-menu');
        if (menu.length) {
            menu.slicknav({
                prependTo: ".mobile_menu",
                closedSymbol: '+',
                openedSymbol: '-'
            });
        };
    }; 

    // Slick slider
    var customSlickSlider = function() {

        // Slideshow Fade
        $('.slide-fade').slick({
            infinite: true,
            dots: false,
            arrows: true,
            autoplay: false,
            autoplaySpeed: 3000,
            fade: true,
            fadeSpeed: 1500,
            prevArrow: '<span class="flow-arrow flow-arrow-up"></span>',
            nextArrow: '<span class="flow-arrow flow-arrow-down"></span>',
            appendArrows: '.slide-fade-arrow-cover',
        });

        // Slideshow Fade
        $('.slide-fade-2').slick({
            infinite: true,
            dots: false,
            arrows: true,
            autoplay: false,
            autoplaySpeed: 3000,
            fade: true,
            fadeSpeed: 1500,
            prevArrow: '<span class="flow-arrow flow-arrow-up"></span>',
            nextArrow: '<span class="flow-arrow flow-arrow-down"></span>',
            appendArrows: '.slide-fade-arrow-cover-2',
        });
        
        

        // carausel 3 columns
        $('.carausel-3-columns').slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: true,
            autoplay: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            loop: true,
            adaptiveHeight: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
            prevArrow: '<span class="flow-arrow flow-arrow-left"></span>',
            nextArrow: '<span class="flow-arrow flow-arrow-right"></span>',
            appendArrows: '.carausel-3-columns-arrow-cover',
        });
         // carausel 6 columns
         $('.carausel-6-columns').slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: false,
            autoplay: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            loop: true,
            adaptiveHeight: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        // featured slider 1
        $('.featured-slider-1-items').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
            asNavFor: '.featured-slider-1-nav',
        });
        $('.featured-slider-1-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
            asNavFor: '.featured-slider-1-items',            
            focusOnSelect: true,
            verticalSwiping: true,
            dots: false,
            arrows: true,
            prevArrow: '<span class="flow-arrow flow-arrow-left"></span>',
            nextArrow: '<span class="flow-arrow flow-arrow-right"></span>',
            appendArrows: '.featured-slider-1-arrow',
        });
        // featured slider 2
        $('.featured-slider-2-items').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
            asNavFor: '.featured-slider-2-nav',
        });
        $('.featured-slider-2-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            vertical: true,
            asNavFor: '.featured-slider-2-items',
            dots: false,
            arrows: false,
            focusOnSelect: true,
            verticalSwiping: true
        });
        // featured slider 3
        $('.featured-slider-3-items').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            fade: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="elegant-icon arrow_left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="elegant-icon arrow_right"></i></button>',
            appendArrows: '.slider-3-arrow-cover',
        });
    };

    // Smart menu
    var headerSticky = function() {
        var lastScrollTop = 0;
        $(window).on('scroll', function() {
            var wScroll = $(this).scrollTop();
            var contentHeight = $('body').height();
            if (contentHeight > 500) {
                if (wScroll > 300) {
                    if (wScroll < lastScrollTop) {
                        $('.header-sticky').removeClass('slide-up').addClass('slide-down');
                    } else {
                        $('.header-sticky').removeClass('slide-down').addClass('slide-up');
                    }
                } else {
                    $('.header-sticky').removeClass('slide-down');
                }
                if (wScroll > $('.main-header').height() + 600) {
                    $('.header-sticky').addClass('sticky-bar');
                } else {
                    $('.header-sticky').removeClass('sticky-bar');
                    $('.header-sticky').removeClass('slide-down');
                }
                lastScrollTop = wScroll;
            }
        });
    }

    // Scroll up to top
    var scrollToTop = function() {
        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            topDistance: '300', // Distance from top before showing element (px)
            topSpeed: 5000, // Speed back to top (ms)
            animation: 'slide', // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: '<i class="elegant-icon arrow_up"></i>', // Text for element
            activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        });
    };

    //VSticker
    var VSticker = function() {
        $('#news-flash').vTicker({
            speed: 800,
            pause: 3000,
            animation: 'fade',
            mousePause: false,
            showItems: 1
        });
        $('#date-time').vTicker({
            speed: 800,
            pause: 3000,
            animation: 'fade',
            mousePause: false,
            showItems: 1
        });
    };

    //sidebar sticky
    var stickySidebar = function() {
        $('.sticky-sidebar').theiaStickySidebar();
    };

    //Mega menu
    var megaMenu = function() {
        $('.sub-mega-menu .nav-pills > a').on('mouseover', function(event) {
            $(this).tab('show');
        });
    };

    var masonryGrid = function() {
        if ($(".grid").length) {
            // init Masonry
            var $grid = $('.grid').masonry({
                itemSelector: '.grid-item',
                percentPosition: true,
                columnWidth: '.grid-sizer',
                gutter: 0
            });

            // layout Masonry after each image loads
            $grid.imagesLoaded().progress(function() {
                $grid.masonry();
            });
        }
    };

    /* More articles*/
    var moreArticles = function() {
        $.fn.vwScroller = function(options) {
            var default_options = {
                delay: 500,
                /* Milliseconds */
                position: 0.7,
                /* Multiplier for document height */
                visibleClass: '',
                invisibleClass: '',
            }

            var isVisible = false;
            var $document = $(document);
            var $window = $(window);

            options = $.extend(default_options, options);

            var observer = $.proxy(function() {
                var isInViewPort = $document.scrollTop() > (($document.height() - $window.height()) * options.position);

                if (!isVisible && isInViewPort) {
                    onVisible();
                } else if (isVisible && !isInViewPort) {
                    onInvisible();
                }
            }, this);

            var onVisible = $.proxy(function() {
                isVisible = true;

                /* Add visible class */
                if (options.visibleClass) {
                    this.addClass(options.visibleClass);
                }

                /* Remove invisible class */
                if (options.invisibleClass) {
                    this.removeClass(options.invisibleClass);
                }

            }, this);

            var onInvisible = $.proxy(function() {
                isVisible = false;

                /* Remove visible class */
                if (options.visibleClass) {
                    this.removeClass(options.visibleClass);
                }

                /* Add invisible class */
                if (options.invisibleClass) {
                    this.addClass(options.invisibleClass);
                }
            }, this);

            /* Start observe*/
            setInterval(observer, options.delay);

            return this;
        }

        if ($.fn.vwScroller) {
            var $more_articles = $('.single-more-articles');
            $more_articles.vwScroller({ visibleClass: 'single-more-articles--visible', position: 0.55 })
            $more_articles.find('.single-more-articles-close-button').on('click', function() {
                $more_articles.hide();
            });
        }

        $('button.single-more-articles-close').on('click', function() {
            $('.single-more-articles').removeClass('single-more-articles--visible');
        });
    }

    /* WOW active */
    new WOW().init();

    //Load functions
    $(document).ready(function() {
        openSearchForm();
        OffCanvas();       
        scrollToTop();
        headerSticky();
        stickySidebar();
        customSlickSlider();
        megaMenu();
        mobileMenu();
        scrollProgress();
        masonryGrid();
        moreArticles();
    });

})(jQuery);