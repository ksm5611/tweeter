$(document).ready(function() {
// Display back to top button when the user scroll down to bottom 
// hide Write a tweet button will only show on top of screen
  $(window).scroll(function() {
    const showAfter = 100;
    if ($(this).scrollTop() > showAfter) {
      $(".back-to-top").fadeIn();
      $('#toggle-tweet-btn').fadeOut();
    } else {
      $(".back-to-top").fadeOut();
      $('#toggle-tweet-btn').fadeIn();
    }
  });

  //Click event to scroll to top
  $(".back-to-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 800);
    $("#form-submit-container").slideDown();
    $("#tweet-text").focus();
  });
});