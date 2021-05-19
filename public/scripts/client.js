/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$(document).ready(function() {
  
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1621224103078
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1621310503078
    }
  ];


  const createTweetElement = function(tweet) {
    let $tweet = $(`<article class="single-tweet">
    <div class="box-top">
      <div class="img">
        <img id="img-size" src="${tweet.user.avatars}" />
        <tag>${tweet.user.name}</tag> 
      </div>
        <span id="handler">${tweet.user.handle}</span>
    </div>
    <p>${tweet.content.text}</p>
    <hr class="underline"/>
    <div class="bottom-container">
      <span class="timeline">
        ${timeago.format(tweet.created_at)}
      </span>
      <div>
        <i class="fas fa-flag status"></i> 
        <i class="fas fa-retweet status"></i>
        <i class="fas fa-heart status"></i>
      </div>
    </div>
  </article>`);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
      // if (time passed) {
      //   will remove history
      // }
    });
  };
  
  // renderTweets(tweetData);
  const getTweetsAndRender = function() {
    $.ajax('http://localhost:8080/tweets', {method: 'GET'})
      .then((response) => {
      // console.log(response)
        renderTweets(response);
      });
  };

  getTweetsAndRender();

  $('#form-submit').on('submit', function(event) {
    event.preventDefault();
    // console.log($(this).serialize());
    $.ajax('http://localhost:8080/tweets', {method: 'POST', data: $(this).serialize()})
      .then(() => {
        $('#form-submit')[0].reset();
        $('#tweets-container').empty();
        getTweetsAndRender();
      });
  });
});

