//Invoked before document.ready for loading optimization
handleFOUC();

//Primary Code Block
$(document).ready(function () {

    handleNavBar();
    handleHomeHeroSection();
    interiorHeader();
    handleByLines();
    handleFooter();
    handleEventsList();
    handleGlobalSearch();
    handleSponsorsBlock();
    handleSponsorsBlockBuild();
    handleSponsorsBlockEmptyAndHide();
    handleEventInfoBar();
    handleAboutSection();
    keynoteSpeakerSection();
    handleEmptyHtml();
    handleNavTabsPillsWrap();

    $(window).on("load", function() {
        //make page content visible again
        pageContentLoaded();
    });

});


//Start Function Defintions

function handleFOUC(){
    $('body').css('visibility', 'hidden');
    $('#MPOuterMost').hide();
    $('#MPOuterHeader').addClass('transparent-header');
}

function handleNavBar(){

    $('.search-bar-top').appendTo('#MPOuterHeader');
    $('.search-close-btn').prependTo('.search-bar-top');
    $('.search-btn-top').prependTo('#MPheader > .row:first-child > .col-md-12');
    $('.search-btn-top').show();

    // Reset the padding for for top sticky
    var headerHeight = $('#MPOuterHeader').css('height');
    $('#MPOuter').css('padding-top', headerHeight);
    $('#MPOuter').css('margin-top', '-' + (parseInt(headerHeight.replace(/px/, "")) + 5) + "px");

    var interiorHeaderPaddingCalculation = headerHeight + 70;
    $('.interior-header').css('padding-top', (parseInt(headerHeight.replace(/px/, "")) + 70) + "px");

    // Check if scrolled on pageload
    if ($(window).scrollTop() > 0) {
        $('#MPOuterHeader').removeClass('transparent-header');
    } else {
        $('#MPOuterHeader').addClass('transparent-header');
    }

    // Adding a class to header when a user scrolls
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {

            $('#MPOuterHeader').removeClass('transparent-header');
        } else {
            $('#MPOuterHeader').addClass('transparent-header');
        }
    });


    $(window).resize(function () {
        var headerHeight = $('#MPOuterHeader').css('height');
        $('#MPOuter').css('margin-top', '-' + (parseInt(headerHeight.replace(/px/, "")) + 5) + "px");
        $('#MPOuter').css('padding-top', headerHeight);
        $('.interior-header').css('padding-top', (parseInt(headerHeight.replace(/px/, "")) + 70) + "px");
    });

}

function handleHomeHeroSection() {
    $('.hero-block').wrapAll('<div class="home-hero" />');
    var homeBG = $('.interior-bg img').attr('src');
    $('.home-hero').css('background-image', 'url("' + homeBG + '")');
}

function interiorHeader() {
    $('.interior #PageTitleH1').wrap('<div class="interior-header"></div>');
    var interiorBG = $('.interior-bg img').attr('src');
    $('.interior-header').css('background-image', 'url("' + interiorBG + '")');

    $('.interior-header').append($('.BreadCrumb'));
}

function handleByLines() {
    $('.HLDiscussions ul li ').each(function () {
        var byline = $(this).find('.ByLine');
        $(this).append(byline);
    });

    $('.HLMyDocuments ul li').each(function () {
        var byline = $(this).find('.ByLine');
        $(this).append(byline);
    });

}

function handleFooter() {

    //Specific to ContactUs widget in footer. Only invoked below in ajax call (i.e. not invoked globally)
    function handleContactUs() {
        $('.eve-contact-us-widget .panel-form div[id$=_EmailForm] h2').replaceWith('<a href="contactus">Send Us a Message</a>');
        $('.eve-contact-us-widget .panel-form div[id$=_EmailForm] .form-group, .contact-us .panel-form div[id$=_EmailForm] input').remove();
        $('.footer-container .eve-contact-us-widget').appendTo('.footer-container .eve-contact-us-title');

    }

    //Remove all "broken" Top of Footer Content to reset container for AJAX call
    $('#FOOTER #MPFooter').prev('.row').children('.col-md-12').empty();

    //Add in empty div with unique identifier to append content to
    $('#FOOTER #MPFooter').prev('.row').children('.col-md-12').append('<div class="footer-container"></div>');

    //Build the footer by using ajax call to get/clone DOM for the site-wide page. Content placed in empty div that is built on page load in code above
    $.ajax({
        method: 'GET',
        url: 'footer-top-content',
        dataType: 'html',

        success: function (response) {

            //dummy container to hold AJAX response in
            var ajaxResponseContainer = $('<div id="ajax_response_container"></div>');

            //Clone and set HTML on page
            $('.footer-container').html(ajaxResponseContainer.html(response).find('.footer-content-items').clone());

            $('.footer-container .eve-contact-us-widget').appendTo('.footer-container .eve-contact-us-title');

            //Wrap parents for Spacing
            $('.footer-container .eve-contact-us-title').parent().addClass('eve-contact-us-container');
            $('.footer-container .social.event-footer-item').parent().addClass('social-links-container');

            //Invoke ContactUs function to build/style widget
            handleContactUs();

            //Unbind the "default" in-context edit button, and re-bind/link to Site Setup
            $('.eve-contact-us-container i').unbind();
            $('.eve-contact-us-container i').attr("onClick", "window.open('/HigherLogic/Microsites/SimpleSiteProperties.aspx')");

            //Re-bind Hover for in-conext editing
            $('.footer-container .inline-content-html-editor-link i.fas.fa-edit, .eve-contact-us-container i').hover(function () {
                $(this).closest('.ContentItemHtml').toggleClass("editContentHighlight");
            });
        },

    });

}

function handleGlobalSearch(){

    $('.search-btn-top').bind('click', function (e) {

        $('.search-close-btn').toggle();

        if ($('.search-bar-top button').is(e.target)) {
            return;
        } else if ($('.search-btn-top').is(e.target) ||
            $('.search-btn-top button').is(e.target) ||
            $('.search-btn-top').is(e.target) ||
            $('.search-btn-top div').is(e.target) ||
            $('.search-btn-top i').is(e.target)) {
            $('.search-bar-top').slideToggle('fast');
            $('.search-bar-top .form-control').focus();
        } else if (($('.search-bar-top').css('display') == 'block') &&
            !$('.SearchInputs .form-control').is(e.target)) {
            $('.search-bar-top').slideToggle('fast');
        } else {
            return;
        }

    });
    $('.search-close-btn button').bind('click', function (e) {
        e.preventDefault();
        $('.search-bar-top').slideToggle('fast');
        $('.search-close-btn').toggle();
    });

    $('.search-bar-top .input-group input[id$="SearchTerm"]').attr('placeholder', 'Search');

}

function handleEventsList(){
     $('.HLEventList h2').append($('.add-event-button'));

    $('.HLLandingControl.HLEventList ul li').each(function () {
        var self = $(this),
            monthElement = $(self).find('.date-block .calendar-month'),
            DateBlock = $(self).find('.date-block');
        $(DateBlock).prepend(monthElement);
        month = $(self).find('.date-block .calendar-month span').text();

        month = month.substring(0, 3);
        $(self).find('.date-block .calendar-month').text(month);
    });
}

function handleSponsorsBlock() {

    $('.sponsors-block').wrapAll('<div class="event-sponsors-wrapper circle-bg" />');

    //Used to "re-Build" sponsors grid (post-Modal save) if edits are made
    $(document).ajaxComplete(function () {
        handleSponsorsBlockBuild();
        handleSponsorsBlockEmptyAndHide();
    });



}

function handleSponsorsBlockBuild() {

    $(document).on('shown.bs.modal', 'div[id$=-modalBuilder].modal', function(){
        $('.sponsors-carousel-widget .carousel').carousel('pause');
    });

    //Reset&Recreate the Block each time since we are using clones for rendering
    $('.event-sponsors').remove();

    //Create container within block in which to append sponsor images
    $('.sponsors-block').append('<div class="event-sponsors" />');

    $('.sponsors-carousel-widget .main-carousel .carousel.slide .carousel-inner .item').each(function () {

        var carouselImageClone = $(this).clone();

        carouselImageClone.find('.carousel-caption').remove();

        carouselImageClone.children().wrap('<div class="ContentItemHtml sponsor"><div class="HtmlContent"><div class="img-block"></div></div></div>');
        $('.event-sponsors').append(carouselImageClone.children());

    });

    $('.sponsors-carousel-widget .manage-carousel label[for$=-tbCaption]').closest('.form-group').hide();

    $('.sponsors-carousel-widget .manage-carousel .carousel-inner .carousel-caption').remove();
    $('.sponsors-carousel-widget .manage-carousel .carousel-indicators').remove();
    $('.sponsors-carousel-widget .manage-carousel .left.carousel-control ').remove();
    $('.sponsors-carousel-widget .manage-carousel .right.carousel-control ').remove();

    $('.sponsors-carousel-widget .manage-carousel button[id$=-btnEdit]').text('Edit Sponsors');

    $('.sponsors-carousel-widget .manage-carousel button[id$=-btnAdd]').text('Add Sponsors');

    $('.sponsors-carousel-widget .manage-carousel .modal-content h4[id^=RenderCarousel_]').text('Sponsor Section Builder');

    $('.sponsors-carousel-widget .manage-carousel .modal-content div[id$=-dvMain] .nav.nav-tabs').hide();

    $('.sponsors-carousel-widget .manage-carousel .modal-content div[id$=-dvEmptyCarouselViewer].viewer-container em').text('Image Viewer');
    $('.sponsors-carousel-widget .manage-carousel .modal-content div[id$=-dvNoSlideContainer].slides-container em').text('No Images');

    $('.sponsors-carousel-widget .manage-carousel .modal-content .carousel-section-header:contains("Carousel")').text('Image');
    $('.sponsors-carousel-widget .manage-carousel .modal-content .carousel-section-header:contains("Slides")').text('Order');
    $('.sponsors-carousel-widget .manage-carousel .modal-content .carousel-section-header-add').text('Add Image');

    $('.sponsors-carousel-widget .manage-carousel .modal-content button[id$=-btnSaveAddSlide]').text('Save Image');
    $('.sponsors-carousel-widget .manage-carousel .modal-content button[id$=-btnSaveAndAddAnotherAddSlide]').text('Save and Add Another Image');

    $('.sponsors-carousel-widget .manage-carousel button[id$=-btnEdit], .sponsors-carousel-widget .manage-carousel button[id$=-btnAdd]').unbind('mouseenter mouseleave');

    $('.sponsors-carousel-widget .manage-carousel button[id$=-btnEdit], .sponsors-carousel-widget .manage-carousel button[id$=-btnAdd]').hover(function () {
        $('.event-sponsors, .sponsors-carousel-widget').toggleClass("editContentHighlight");
    });

}

function handleSponsorsBlockEmptyAndHide(){

    //If all HTML in this section is empty below will auto-hide section for non-admin end-users. hideEmptyPageSections() function not used due to mixed content types within Sponsors section
    if (($('.event-sponsors').length == $('.event-sponsors:empty').length) && ($('.sponsors-block .HtmlContent').length == $('.sponsors-block .HtmlContent:empty').length) && (!$('#hdrAdminAddEdit').length)){
        $('.event-sponsors-wrapper').hide();
    } else {
        $('.event-sponsors-wrapper').show();
    }

    //handleEmptyHtml() function not used due to mixed content types within Sponsors section
    if (($('.event-sponsors').length == $('.event-sponsors:empty').length) && ($('#hdrAdminAddEdit').length)){
        console.log('test');
        //$('.sponsors-carousel-widget').attr('data-text', '[Empty/Hidden - Edit to Add Content]');
        //$('.sponsors-carousel-widget').attr('contentEditable', 'true');
        $('.sponsors-carousel-widget').addClass('emptyHtmlContent isEmpty');

        $('.event-sponsors').attr('data-text', '[Empty/Hidden - Edit to Add Content]');
        $('.event-sponsors').addClass('emptyHtmlContent isEmpty');
    } else {
        $('.sponsors-carousel-widget').removeClass('emptyHtmlContent isEmpty');
    }
}

function handleEventInfoBar() {
    $('.event-info').wrapAll('<div class="event-info-wrapper" />');

    //If all HTML in this section is empty below will auto-hide section for non-admin end-users
    hideEmptyPageSections('.event-info-wrapper');
}

function handleAboutSection() {
    $('.about-write').wrap('<div class="col-md-6" />');
    $('.about-icon').wrapAll('<div class="col-md-6" />');
    $('.about-icon').wrap('<div class="col-md-4"/>');
    $('.about-block').wrapAll('<div class="about circle-left-bg" />');

    //If all HTML in this section is empty below will auto-hide section for non-admin end-users
    hideEmptyPageSections('.about');

}

function keynoteSpeakerSection() {
    $('.left-content').wrapAll('<div class="col-md-4"/>');
    $('.right-content').wrapAll('<div class="col-md-8"/>');

    $('.speaker-pic-social').each(function () {

        var img = $(this).find('img').attr('src');
        $(this).find('img').hide();
        $('.speaker-pic-social').prepend('<div class="img-container" />');
        var imgContainer = $(this).find('.img-container');
        $(imgContainer).css('background-image', 'url("' + img + '")');
        $(this).find('a').wrapAll('<div class="social-wrap" />');

    });

    //   $('.session-title strong').wrapAll('<div class="session-info-wrap" />');
    $('.speaker-pic-social').closest('div[id$="ContentWrapper"]').addClass('radial-circle-bg');

    // reset the speaker title value to overrite the speakers name
    var keynoteTitleText = $('.keynote-page-title h1').text();
    if (!!keynoteTitleText) {
        $('#PageTitleH1').text(keynoteTitleText);
    }

}

function handleNavTabsPillsWrap(){
    //only affects Commuity Tabs
    $('.nav-tabs').parent().addClass('nav-pills-wrap');
}

function handleEmptyHtml(){

    //If an In-Context Html block is Null, Admin user will be shown a placeholder box in its place. This box is only visible to Admin users. Blank HTML will not display to end user and the ection will auto-fold for any published content automtically. This will only run for Admin users (because inline-content HTML editor only renders for Super Admin users)

    $('.inline-content-html-editor-link ~ .HtmlContent').each(function(){
        if (($(this).length == $(this).filter(':empty').length)){
            $(this).addClass('isEmpty');
            $(this).closest('.ContentItemHtml').addClass('emptyHtmlContent');
            $(this).attr('data-text', '[Empty/Hidden - Edit to Add Content]');
        }

    });

}

function hideEmptyPageSections(sectionWrapperClass){

    //If ALL Html in a section is empty, will auto-hide section for non-admin end-users
    if (($(sectionWrapperClass + ' .HtmlContent').length == $(sectionWrapperClass + ' .HtmlContent:empty').length) && (!$('#hdrAdminAddEdit').length)){
        $(sectionWrapperClass).hide();
    } else {
        $(sectionWrapperClass).show();
    }

}

function pageContentLoaded(){
    $('#MPOuterMost').show();
    $('body').css('visibility', 'visible').fadeIn('slow');
}
