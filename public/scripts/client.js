/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$(document).ready(function() {
  
  /*
  create tweet html element
  params Tweet
  Tweet: {
      user: {
        avatars: string,
        handle: string,
        name: string
      },
      content: {
        text: string
      }
      create_at: Date
    };
   */
  const createTweetElement = function(tweet) {
    let $tweet = $(`<article class="single-tweet">
    <div class="box-top">
      <div class="img">
        <img id="img-size" src="${tweet.user.avatars}" />
        <tag>${tweet.user.name}</tag> 
      </div>
        <span id="handler">${tweet.user.handle}</span>
    </div>
    <p>${escape(tweet.content.text)}</p>
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


  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };



  /*
   add tweet element to tweets-container
   params: [Tweet] Tweet: {
      user: {
        avatars: string,
        handle: string,
        name: string
      },
      content: {
        text: string
      }
      create_at: Date
    };
  */
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
  
  // fetch tweet to respose from server
  const getTweetsAndRender = function() {
    $.ajax('http://localhost:8080/tweets', {method: 'GET'})
      .then((response) => {
        renderTweets(response);
      });
  };

  getTweetsAndRender();

  // send request to server to create a new tweet and render the tweet elements with the new tweet
  $('#form-submit').on('submit', function(event) {
    event.preventDefault();
    const wanringMessage = $('#tweet-text').val().length;
    if (wanringMessage > 140 || wanringMessage === 0) {
      return alert('error');
    }
    $.ajax('http://localhost:8080/tweets', {method: 'POST', data: $(this).serialize()})
      .then(() => {
        $('#form-submit')[0].reset();
        $('#tweets-container').empty();
        getTweetsAndRender();
      });
  });
  
});

