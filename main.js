/* ↓↓↓↓↓↓↓↓↓↓ MAIN-SECTION ↓↓↓↓↓↓↓↓↓↓ */



//Define text box area
let inputArea = document.querySelector('#tweet-input');

//Define tweet box area
let tweetBox = document.querySelector('#tweet-box');

//define tweet button
let tweetBtn = document.querySelector('#tweet-button');

//Tweets section
let tweets = [];

//Tweet text rendering section
let tweetArea = document.querySelector('#tweet-section');

//Define letters remaining section
let lettersRemaining = document.querySelector('#letters-remaining');

let remaining = 0;

//show tweet button
tweetBox.addEventListener('focusin', () => {
  inputArea.style.height = '80px';

  document.querySelector('#button-row').classList.add('d-block');
})

//hide tweet button row function
let hideTweetButton = () => {
  inputArea.style.height = '26px';

  document.querySelector('#button-row').classList.remove('d-block');
}

//hide tweet button
tweetBox.addEventListener('focusout', hideTweetButton)

//Render tweets to screen
let render = () => {

  tweetArea.innerHTML = tweets.map(x => `
  <div id=${x.id} class="tweet d-flex justify-content-start align-top">
  <div><img src="images/bigavatar.png" alt="" class="rounded-circle" width="48px" height="48px"></div>
  <ul id="tweet-content" class="list-unstyled">
    <li class="text-left">
      <ul id="user-infor" class="d-flex list-unstyled">
        <li><strong>Rachael Daily </strong></li>
        <li class="pl-1 text-secondary">@RachaelDaily</li>
        <li class="pl-1 text-secondary">· 34m</li>
      </ul>
    </li>
    <li class="text-left pb-3"><div class="tweet-text">${x.tweetText}</div></li>
    ${x.imgUrl?`<li>
      <div class="mr-3 mb-3">
        <img src="${x.imgUrl}" alt="" class="img-fluid img-rounded">
      </div>
    </li>`:''}
    <li class="text-left">
      <ul id="action-row" class="d-flex list-unstyled">
        <li><a><i title="Comment" class="far fa-comment"></i></a></li>
        <li class="pl-5"><a><i id="retweet${x.id}" title="Retweet" class="fas fa-retweet"></i></a></li>
        <li class="pl-5">
          <a>
            <i id="like${x.id}" title="Like" class="${x.liked?'fas fa-heart text-danger':'far fa-heart'}">
            </i>
          </a>
        </li>
        <li class="pl-5"><a><i title="Statitic" class="fas fa-align-right"></i></a></li>
      </ul>
    </li>
  </ul>
</div>
  `).join('');

  //render letters remaining
  renderLettersRemaining();

  console.log(tweets);

  //retweet 
  retweet();

  //like
  like();
}


//This function shows letters remaining
let renderLettersRemaining = () => {
  const DEFAULT_LETTERS = 140;

  remaining = DEFAULT_LETTERS - inputArea.value.length;
  if (remaining >= 0) {
    lettersRemaining.innerHTML = `<span>${remaining} letters remaining</span>`;

    //enable tweet button
    tweetBtn.style.cursor = 'pointer';
    tweetBtn.addEventListener('click', getTweet);
  }

  if (remaining < 0) {
    lettersRemaining.innerHTML = `<span class="text-danger">${remaining} letters remaining</span>`;

    //disable tweet button
    tweetBtn.style.cursor = 'not-allowed';
    tweetBtn.removeEventListener('click', getTweet);
  }

  if (remaining == 140) {
    lettersRemaining.innerHTML = `<span>${remaining} letters remaining</span>`;

    //disable tweet button
    tweetBtn.style.cursor = 'not-allowed';
    tweetBtn.removeEventListener('click', getTweet);
  }
}

//Count letters remaining of tweet input area
inputArea.addEventListener('input', renderLettersRemaining);

//Get text from tweet input box
let getTweet = () => {

  //define input value
  let inputValue = inputArea.value;

  //filter inputValue
  let filteredInputValue = inputValue.split(' ').map(x => {

    //(tag a friend) filter so every word start with @ will be blue
    if (x.startsWith('@')) {
      return `<a href="#" class="text-primary">${x}</a> `;
    }

    //(img url) delete image url
    else if (x.includes('.jpg') || x.includes('.png')) {
      return '';
    } else {
      return x;
    }

  }).join(' ');

  //(img url) filter inputValue to get the img url alone
  let imgUrl = inputValue.split(' ').filter(x => x.includes('.png') || x.includes('.jpg') ).join('');

  //add text value to tweets array
  tweets.unshift({

    //use the filtered value
    tweetText: filteredInputValue,
    id: tweets.length,
    liked: false,
    imgUrl: imgUrl
  });

  //erase input area
  inputArea.value = '';

  //reset letters remained to 140
  remaining = 0;

  //hide tweet button
  hideTweetButton();

  render();
}

//retweet function
let retweet = () => {
  for (let i = tweets.length - 1; i >= 0; i--) {

    let action = () => {
      console.log(`retweeted ${tweets[i].id}`);

      //add a clone tweet to the top of the array
      tweets.unshift({
        //keep the original text
        tweetText: tweets[i].tweetText,

        //give it a new id
        id: tweets.length,

        //remove liked
        liked: false,

        //keep img url
        imgUrl: tweets[i].imgUrl

      });
      render();
    };

    document.querySelector(`#retweet${tweets[i].id}`).addEventListener('click', action);
  }
}

//like function
let like = () => {
  for (let i = tweets.length - 1; i >= 0; i--) {

    let action = () => {
      console.log(`liked ${tweets[i].id}`);

      //change the liked value of tweet to the opposite
      tweets[i].liked = !tweets[i].liked;

      render();
    };

    document.querySelector(`#like${tweets[i].id}`).addEventListener('click', action);
  }
}









/* ↑↑↑↑↑↑↑↑↑↑ MAIN-SECTION ↑↑↑↑↑↑↑↑↑↑ */