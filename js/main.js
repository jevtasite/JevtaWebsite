/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(200).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$(document).ready(function() {
    var isMobile = $(window).width() < 960; 

    $("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom: [
            [0, 1],     
            [700, 2],   
            [961, 3]    
        ],
        navigationText: false,
        autoPlay: isMobile ? 5000 : false 
    });
});



	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
/* Smooth Scrolling
------------------------------------------------------ */
$('.smoothscroll').on('click', function (e) {

  e.preventDefault();

  var target = this.hash,
      $target = $(target);

  $('html, body').stop().animate({
      'scrollTop': $target.offset().top
  }, 800, 'swing');

});
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

	/* Typing text ENG
  	------------------------------------------------------ */

	document.addEventListener("DOMContentLoaded", () => {
  const phrases = ["Hello, World.", "Welcome to my website!"];
  const typingEl = document.getElementById("typing-text");
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 130;    
  const deletingSpeed = 50;  
  const delayBetween = 1700;  

  function type() {
    const currentPhrase = phrases[phraseIndex];

    typingEl.classList.remove("blinking");

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1) || "\u00A0"; 
      charIndex--;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      timeout = delayBetween;
      isDeleting = true;
      typingEl.classList.add("blinking"); 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timeout = typingSpeed;
    }

    setTimeout(type, timeout);
  }

  type();
});

/* Typing text SRB
  	------------------------------------------------------ */

	document.addEventListener("DOMContentLoaded", () => {
  const phrases = ["Hello, World.", "Dobro došli na moj sajt!"];
  const typingEl = document.getElementById("typing-textSRB");
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 130;    
  const deletingSpeed = 50;
  const delayBetween = 1700;  

  function type() {
    const currentPhrase = phrases[phraseIndex];

    typingEl.classList.remove("blinking");

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1) || "\u00A0"; 
      charIndex--;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      timeout = delayBetween;
      isDeleting = true;
      typingEl.classList.add("blinking"); 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timeout = typingSpeed;
    }

    setTimeout(type, timeout);
  }

  type();
});

})(jQuery);


/* ANIMATIONS 
  	------------------------------------------------------ */

	// Black section animation

document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.1
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// ======================================
// DOM Ready
// ======================================
document.addEventListener("DOMContentLoaded", () => {

  // ---------- Fade-in for white/grey sections ----------
  const lightFaders = document.querySelectorAll('.white-section .fade-in-content, .grey-section .fade-in-content');
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  lightFaders.forEach(fader => fadeObserver.observe(fader));

  // ---------- Skills & intro paragraph ----------
  const skillsAndIntro = document.querySelectorAll('.skillsanimation, .intro-info p.lead');
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  skillsAndIntro.forEach(el => skillsObserver.observe(el));

  // ---------- Profile text ----------
  const profileText = document.querySelectorAll('[data-translate="profileText"]');
  const profileObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  profileText.forEach(el => profileObserver.observe(el));

  // ---------- Info list staggered animation ----------
  const infoItems = document.querySelectorAll('.info-list-animate li');
  const infoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const delay = Array.from(infoItems).indexOf(entry.target) * 200; // stagger 0.2s
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  infoItems.forEach(el => infoObserver.observe(el));

  // ---------- About buttons staggered animation ----------
  const buttons = document.querySelectorAll('.fade-left');
  const buttonObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const delay = Array.from(buttons).indexOf(entry.target) * 300; // stagger 0.3s
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  buttons.forEach(el => buttonObserver.observe(el));

});

// ======================================
// Stats staggered animation
// ======================================
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const stats = entry.target.querySelectorAll('.stat');
      stats.forEach((stat, index) => {
        setTimeout(() => stat.classList.add('animate'), index * 200); // stagger 0.2s
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('#stats');
if(statsSection) statsObserver.observe(statsSection);

// ======================================
//Contact animation
// ======================================
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('#contact h1, #contact h5, #contact p.lead, #contact .contact-info > div');

  elements.forEach(el => el.classList.add('fade-item'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});
