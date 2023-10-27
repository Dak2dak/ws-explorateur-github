
function fetchUserData(username) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    reject(new Error(`Pas d'utilisateur connu sous ce nom : ${username}`));
                }
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function displayUserData(username) {
    const userDataElement = document.getElementById("user-data");

    fetchUserData(username)
        .then((data) => {
            userDataElement.innerHTML = `
                <h2>${data.login}</h2>
                <img src="${data.avatar_url}" alt="Avatar">
                <p>Followers: ${data.followers_url}</p>
                <p>Following: ${data.following_url}</p>
                <p>Following: ${data.name}</p>
            `;
        })
        .catch((err) => {
            console.error(err);
            userDataElement.innerHTML = `Erreur : ${err.message}`;
        });
}



document.getElementById("search-button").addEventListener("click", function () {
    const usernameInput = document.getElementById("username-input");
    const username = usernameInput.value;
    displayUserData(username);
});
