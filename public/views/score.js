

const postPlayer = async () => {
    try {
        const res = await fetch('http://localhost:8080/api/player', {
            method: "POST",
            body: JSON.stringify({
                name: "Zein",
                score: 890
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}


const getPlayer = async () => {
    try{
        const res = await fetch('http://localhost:8080/api/player');
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.log(err)
    }
}

const backURL = () => {
    window.location.href = "../index.html";
}

document.getElementById('postButton').addEventListener('click',postPlayer);
document.getElementById('backButton').addEventListener('click',backURL);

const showTable = async () => {
    const players = await getPlayer();

    const table = document.getElementById('topTable');
    players.forEach((player, index) => {
        const row = document.createElement('tr');
        
        const num = document.createElement('th');
        num.setAttribute('scope', 'row');
        num.innerHTML = index + 1;
        
        const name = document.createElement('td');
        name.innerHTML = player.name;
        
        const score = document.createElement('td');
        score.innerHTML = player.score;

        row.appendChild(num);
        row.appendChild(name);
        row.appendChild(score);

        table.appendChild(row);
    })
}


showTable();
