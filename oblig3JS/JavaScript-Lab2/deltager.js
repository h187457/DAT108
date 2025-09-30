class DeltagerManager {
    constructor(root) {
        this.root = root;

        this.inputStartnummer = root.querySelector("#startnummer");
        this.inputNavn = root.querySelector("#deltagernavn");
        this.inputSluttid = root.querySelector("#sluttid");

        this.btnRegistrer = root.querySelector(".registrering button");
        this.resultatListe = root.querySelector(".resultat tbody");
        this.msg = root.querySelector(".registrering p");

        this.deltList = [];

        this.btnRegistrer.addEventListener("click", () => this.registrerDeltager());

        this.inputStartnummer.addEventListener("input", () => this.validateInput("startnummer"));
        this.inputNavn.addEventListener("input", () => this.validateInput("deltagernavn"));
        this.inputSluttid.addEventListener("input", () => this.validateInput("sluttid"));

        const btnVis = root.querySelector(".resultat button");
        btnVis.addEventListener("click", () => this.visDeltagere());
    }

    validateInput(inputId) {
        const inputElement = document.getElementById(inputId);

        if (inputElement.validity.valueMissing) {
            inputElement.setCustomValidity("Dette feltet må fylles ut.");
        } else if (inputElement.validity.typeMismatch) {
            inputElement.setCustomValidity("Vennligst skriv inn en gyldig verdi.");
        } else if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity("Verdien samsvarer ikke med det forventede mønsteret.");
        } else if (inputElement.validity.tooLong) {
            inputElement.setCustomValidity("Verdien er for lang.");
        } else if (inputElement.validity.tooShort) {
            inputElement.setCustomValidity("Verdien er for kort.");
        } else {
            inputElement.setCustomValidity("");
        }
    }

    registrerDeltager() {
        const startnummer = this.inputStartnummer.value.trim();
        const navn = this.inputNavn.value.trim();
        const sluttid = this.inputSluttid.value.trim();

        if (!startnummer || !navn || !sluttid) {
            return;
        }

        if (this.deltList.some(d => d.startnummer === startnummer)) {
            this.inputStartnummer.setCustomValidity("Startnummeret er allerede registrert!");
            this.inputStartnummer.reportValidity();
            this.inputStartnummer.focus();
            return;
        } else {
            this.inputStartnummer.setCustomValidity("");
        }

        if (!this.inputStartnummer.checkValidity() ||
            !this.inputNavn.checkValidity() ||
            !this.inputSluttid.checkValidity()) {
            if (!this.inputStartnummer.checkValidity()) {
                this.inputStartnummer.reportValidity();
                this.inputStartnummer.focus();
            } else if (!this.inputNavn.checkValidity()) {
                this.inputNavn.reportValidity();
                this.inputNavn.focus();
            } else {
                this.inputSluttid.reportValidity();
                this.inputSluttid.focus();
            }
            return;
        }

        const deltager = { startnummer, navn, sluttid };
        this.deltList.push(deltager);

        const spans = this.msg.querySelectorAll("span");
        spans[0].textContent = navn;
        spans[1].textContent = startnummer;
        spans[2].textContent = sluttid;
        this.msg.classList.remove("hidden");

        this.inputStartnummer.value = "";
        this.inputNavn.value = "";
        this.inputSluttid.value = "";
        this.inputStartnummer.focus();
    }

    visDeltagere() {
        const sorted = [...this.deltList].sort((a, b) => a.sluttid.localeCompare(b.sluttid));

        this.resultatListe.innerHTML = "";

        sorted.forEach((d, i) => {
            const rad = document.createElement("tr");
            rad.innerHTML = `
                <td>${i + 1}</td>
                <td>${d.startnummer}</td>
                <td>${d.navn}</td>
                <td>${d.sluttid}</td>
            `;
            this.resultatListe.appendChild(rad);
        });
    }
}

// Initialize manager
const rootelement = document.getElementById("root");
new DeltagerManager(rootelement);
