const fahrzeuge = [
    "KLF","KLF2","HLF","HRW","WLF1","WLF2",
    "ELW","KdoW","RTW","KTW","NEF","Schlepper","Stapler"
];

const container = document.getElementById("fahrzeuge");
const logTable = document.querySelector("#log tbody");

fahrzeuge.forEach(name => {
    let btn = document.createElement("button");
    btn.innerText = name;
    btn.className = "button status5";

    btn.onclick = () => {
        let status = prompt("Status (1,2,3,4,5,7,8):");

        if (!status) return;

        btn.className = "button status" + status;

        let time = new Date().toLocaleTimeString();

        let row = `
            <tr>
                <td>${name}</td>
                <td>${status}</td>
                <td>${time}</td>
            </tr>
        `;

        logTable.innerHTML += row;
    };

    container.appendChild(btn);
});
