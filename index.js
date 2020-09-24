"use strict";

function displayResults(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.length; i++) {
        $("#js-results-list").append(
            `<li>
                <h3>${responseJson[i].name}</h3>
                <p><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a></p>
            </li>`
        )
    }
    $(".js-results").removeClass("hidden");    
}

function getRepoForUser(userName) {
    const url = `https://api.github.com/users/${userName}/repos`
    const options = {
        headers: new Headers({
            "Accept": "application/vnd.github.v3+json"
        })
    };
    fetch(url, options)
        .then(response => response.ok ? response.json() : Promise.reject({err : response.status}))
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert("No repos found for that user.", error));
}

function handleSubmitClicked() {
    $("form").submit(event => {
        event.preventDefault();
        let userInput = $(".js-user-input").val();
        $("#js-results-list").empty();
        getRepoForUser(userInput);
    });
}

$(function() {
    console.log("Application Loaded, now ready to submit!");
    handleSubmitClicked();
});