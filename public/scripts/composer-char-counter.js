$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("input", function() {
    const maxVal = 140;
    const textVal = $(this).val().length;
    let counter = maxVal - textVal;

    if (textVal > maxVal) {
      counter = -(textVal - maxVal);
      $('.counter').css('color', 'red');
    };

    $('.counter').val(counter);
  });

});
