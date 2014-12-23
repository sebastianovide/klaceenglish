$(window).load(function(){

// from http://bootply.com/69848#

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-26404876-2', 'klaceenglish.com');
  ga('require', 'displayfeatures');
  ga('send', 'pageview', "/" + window.location.hash);


  $.cookieBar({
    message: "We use cookies on our website. By continuing, you are agreeing to their use."
  });

  $('#nav').affix({
        offset: {
          top: $('header').height()
        }
  });	

  /*
  $('#sidebar').affix({
        offset: {
          top: 200
        }
  });	
  */

  // smooth scrolling for hash links                       
  var $root = $('html, body');
  $("a[href^='#']").click(function(e) {
      e.preventDefault();
      
      ga('send', 'event', 'internallink', 'click', this.hash);;
      
      var target = this.hash,
	    $target = $(target);      
      
	    $root.stop().animate({'scrollTop': $target.offset().top}, 500, 'swing', function () {
	        window.location.hash = target;
     //     return false;
     //     $root.stop().animate({'scrollTop': $target.offset().top}, 500, 'swing');
      //    return false;
	    });
    //  return false;
  });   

  // external links in a new tab
  $("a[href^='http://']").attr("target","_blank");
  
  // set padding before each paragraph based on bar size        
  $('body > .container:not(.home)')
    .css('padding-top', $('#nav').height());
  $('body > .container')         
    .css('padding-bottom', $('#nav').height());


  var $contactFormModal = $("#contactFormModal");
  $contactFormModal.modal({show: false });
      
  // collpase long articles
  $('.readmore').readmore({maxHeight: 100});
      
  // contact form
  $('#contactForm').submit( function(event) {  
  
    function showModal(bodyContent) {
      $contactFormModal.find(".modal-body").html("<h4>" + bodyContent + "</h4>");
      $contactFormModal.modal('show');    
    }
  
    event.preventDefault();
 
    var $form = $( this );
    
    // display a sending message.    
    showModal("sending email...");
      
    $.post("feedback.html", $('#contactForm').serialize())
      .done(function(result) {        
        if (result == "ok") {
          showModal("Thank you for your message. We will contact you as soon as possible.");
          $form.trigger('reset');
        }
        else {
          showModal("Something went wrong. Please try again.");
        }
      })
      .fail(function(result) {
        showModal("Something went wrong. Please try again.");
      });
    
  } );

});
