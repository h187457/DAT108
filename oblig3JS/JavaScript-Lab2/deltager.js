class DeltagerManager {
    constructor(root) {
        this.root = root;

        this.inputStartnummer = root.querySelector("#startnummer");
        this.inputNavn = root.querySelector("#deltagernavn");
        this.inputSluttid = root.querySelector("#sluttid");


        this.btnRegistrer = root.querySelector(".registrering button");

        this.resultatListe = root.querySelector(".resultat tbody");

        this.msg = root.querySelector(".registrering p");

        this.btnRegistrer.addEventListener("click", () => this.registrerDeltager());
    }

    registrerDeltager() {
        const startnummer = this.inputStartnummer.value;
        const navn = this.inputNavn.value;
        const sluttid = this.inputSluttid.value;

        if (!startnummer || !navn || !sluttid) {
            alert("Du må fylle inn alle feltene!");
            return;
        }

        if(startnummer in rad){
            alert("Startnummeret er allerede registrert!");
            return;
        }

        const rad = document.createElement("tr");
        rad.innerHTML = `
            <td>–</td>
            <td>${startnummer}</td>
            <td>${navn}</td>
            <td>${sluttid}</td>
        `;
        this.resultatListe.appendChild(rad);

        const spans = this.msg.querySelectorAll("span");
        spans[0].textContent = navn;
        spans[1].textContent = startnummer;
        spans[2].textContent = sluttid;
        this.msg.classList.remove("hidden");

        this.inputStartnummer.value = "";
        this.inputNavn.value = "";
        this.inputSluttid.value = "";
    }
}

const rootelement = document.getElementById("root");
new DeltagerManager(rootelement);
