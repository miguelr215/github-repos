// GITHUB REPOS


// function to display results
function displayResults(responseJson, userName){
    console.log(responseJson);
    // clear results list 
    $('.resultsList').empty();
    // take argument and run loop on results array to create li strings
    for(let i = 0; i < responseJson.length; i++){
        $('.resultsList').append(
            `<li class="listItem">
            <ion-icon name="logo-github"></ion-icon>
            <h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
            <p><i>Description:</i>  ${responseJson[i].description}</p> 
            </li>`
        );
    };
    // create result header
    $('.resultHeader').html('<h2>Search Results for: '+ userName + '</h2>');
    // unhide result boxes
    $('.resultHeader').removeClass('hidden');
    $('.resultBox').removeClass('hidden');

};

// function to fetch data
function getRepos(userName){
    // create url 
    // let url = 'https://api.github.com/users/{username}/repos';
    // create params

    console.log('https://api.github.com/users/'+ userName +'/repos');
    // fetch to github api with user input
    fetch('https://api.github.com/users/'+ userName +'/repos')
        .then(response => response.json())
            // if(response.ok){
            //     response.json();
            // }
            // alert('whats going on here?');
            //throw new Error(response.statusText);
        // })
        // call function to display results
        .then(responseJson => displayResults(responseJson, userName))
        .catch(error => {
            $('#js-error-msg').text(`Something went wrong: ${error.message}`);
        });

};

// watch form function
function watchForm(){
    console.log('watch form running');
    $('form').on('click', '#searchBtn', function(event){
        event.preventDefault();
        // save user input to variable
        let userName = $('#targetUser').val();
        // validate input is not empty
        if(userName == ''){
            alert('Please enter a user name');
        }
        // call function to fetch data
        getRepos(userName);
    });
};


// function to run on page load
$(function(){
    console.log('App running...');
    watchForm();
})