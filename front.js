$(function () {

    /* =========================================
     * tooltip
     *  =======================================*/

    $('.customer img').tooltip();


    /* =========================================
     * counters
     *  =======================================*/

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /* =================================================
     * Preventing URL update on navigation link click
     *  ==============================================*/

    $('.link-scroll').on('click', function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });


    /* =========================================
     *  Scroll Spy
     *  =======================================*/

    $('body').scrollspy({
        target: '#navbarcollapse',
        offset: 80
    });




    /* =========================================
     * Leflet map
     *  =======================================*/
    map();


    /* =========================================
     * parallax
     *  =======================================*/
    $(window).scroll(function () {

        var scroll = $(this).scrollTop();

        if ($(window).width() > 1250) {
            $('.parallax').css({
                'background-position': 'left -' + scroll / 8 + 'px'
            });
        } else {
            $('.parallax').css({
                'background-position': 'center center'
            });
        }
    });

    /* =========================================
     * filter
     *  =======================================*/

    $('#filter a').click(function (e) {
        e.preventDefault();

        $('#filter li').removeClass('active');
        $(this).parent('li').addClass('active');

        var categoryToFilter = $(this).attr('data-filter');

        $('.reference-item').each(function () {

            if ($(this).data('category') === categoryToFilter || categoryToFilter === 'all') {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });




    /* =========================================
     *  animations
     *  =======================================*/

    delayTime = 0;

    $('[data-animate]').waypoint(function (direction) {
        delayTime += 250;

        var element = $(this.element);

        $(this.element).delay(delayTime).queue(function (next) {
            element.toggleClass('animated');
            element.toggleClass(element.data('animate'));
            delayTime = 0;
            next();
        });

        this.destroy();

    }, {
        offset: '90%'
    });
    
    $('[data-animate-hover]').hover(function () {
        $(this).css({
            opacity: 1
        });
        $(this).addClass('animated');
        $(this).removeClass($(this).data('animate'));
        $(this).addClass($(this).data('animate-hover'));
    }, function () {
        $(this).removeClass('animated');
        $(this).removeClass($(this).data('animate-hover'));
    });




});

/* =========================================
 * Get list of repositries
 *  =======================================*/
// ------------------------------------------------------ //
// Repositry from Github API
// ------------------------------------------------------ //


$.ajax({
    type: "GET",
    url: "https://api.github.com/users/etienneboshoff93/repos",
    dataType: "json",
    success: function(result) {
        for( i in result ) {
            $("#repo_list").append(
                "<li><a href='" + result[i].html_url + "' target='_blank'>" +
                result[i].name + "</a></li>"
            );
            console.log("i: " + i);
        }
        console.log(result);
        $("#repo_count").append("Total Repos: " + result.length);
    }
});

/* =========================================
 * styled Leaflet Map
 *  =======================================*/
// ------------------------------------------------------ //
// styled Leaflet  Map
// ------------------------------------------------------ //

function map() {

    var mapId = 'map',
        mapCenter = [-26.719152, 27.094521],
        mapMarker = true;

    if ($('#' + mapId).length > 0) {

        var icon = L.icon({
            iconUrl: 'images/marker.png',
            iconSize: [25, 37.5],
            popupAnchor: [0, -18],
            tooltipAnchor: [0, 19]
        });

        var dragging = false,
            tap = false;

        if ($(window).width() > 700) {
            dragging = true;
            tap = true;
        }

        var map = L.map(mapId, {
            center: mapCenter,
            zoom: 13,
            dragging: dragging,
            tap: tap,
            scrollWheelZoom: false
        });

        var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        });

        Stamen_TonerLite.addTo(map);

        map.once('focus', function () {
            map.scrollWheelZoom.enable();
        });

        if (mapMarker) {
            var marker = L.marker(mapCenter, {
                icon: icon
            }).addTo(map);

            marker.bindPopup("<div class='p-4'><h5>My address</h5><p>61 OR Tambo Street, Potchefstroom.</p></div>", {
                minwidth: 200,
                maxWidth: 600,
                className: 'map-custom-popup'
            })

        }
    }

}


