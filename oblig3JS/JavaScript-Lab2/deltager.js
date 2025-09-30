class DeltagerManager {
    constructor(root) {
        this.root = root;

        this.inputStartnummer = root.querySelector("#startnummer");
        this.inputNavn = root.querySelector("#deltagernavn");
        this.inputSluttid = root.querySelector("#sluttid");

        this.btnRegistrer = root.querySelector(".registrering button");
        this.resultatListe = root.querySelector(".resultat tbody");
        this.msg = root.querySelector(".registrering p");

        this.nedregrense = root.querySelector("#nedregrense");
        this.ovregrense = root.querySelector("#ovregrense");

        this.deltList = [];

        this.btnRegistrer.addEventListener("click", () => this.registrerDeltager());


        const btnVis = root.querySelector(".resultat button");
        btnVis.addEventListener("click", () => this.visDeltagere());
    }



    registrerDeltager() {
        const startnummer = this.inputStartnummer.value.trim();
        let navn = this.inputNavn.value;
        const sluttid = this.inputSluttid.value.trim();

        navn = this.#titleCaseName(navn);
        this.inputNavn.value = navn;

        if (!startnummer || !navn || !sluttid) {
            return;
        }

        this.inputStartnummer.setCustomValidity("");
        this.inputNavn.setCustomValidity("");
        this.inputSluttid.setCustomValidity("");
        
        if (!this.inputStartnummer.checkValidity()) {
            this.inputStartnummer.reportValidity();
            this.inputStartnummer.focus();
            return;
        }

        if (!this.inputNavn.checkValidity()) {
            this.inputNavn.reportValidity();
            this.inputNavn.focus();
            return;
        }

        if (!this.inputSluttid.checkValidity()) {
            this.inputSluttid.reportValidity();
            this.inputSluttid.focus();
            return;
        }

        const start = Number(startnummer);
        if (!Number.isInteger(start) || start < 1) {
            this.inputStartnummer.setCustomValidity("Startnummer må være et heltall ≥ 1.");
            this.inputStartnummer.reportValidity();
            this.inputStartnummer.focus();
            return;
        }

        if (this.deltList.some(d => d.startnummer === startnummer)) {
            this.inputStartnummer.setCustomValidity("Dette startnummeret er allerede registrert.");
            this.inputStartnummer.reportValidity();
            this.inputStartnummer.focus();
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
        this.ovregrense.setCustomValidity("");
        const nedre = this.nedregrense.value.trim();
        const ovre = this.ovregrense.value.trim();


        if (nedre && ovre && nedre > ovre) {
            this.ovregrense.setCustomValidity("Øvre grense må være større enn nedre");
            this.ovregrense.reportValidity();
            this.ovregrense.focus();
            return;
        } else {
            this.ovregrense.setCustomValidity("");
        }

        this.resultatListe.innerHTML = "";


        if(this.nedregrense==null && this.ovregrense==null){

            const sorted = [...this.deltList].sort((a, b) => a.sluttid.localeCompare(b.sluttid));
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
        } else {


            const filtered = this.deltList.filter(d => {
                 return (!nedre || d.sluttid >= nedre) && (!ovre || d.sluttid <= ovre);
            });

            const sorted = filtered.sort((a, b) => a.sluttid.localeCompare(b.sluttid));

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

    #titleCaseName(str) {
    return str
      .trim()
      .replace(/\s+/g, " ")
      .split(/([ -])/g)
      .map(part => {
        if (part === " " || part === "-") return part;
        if (!part) return part;
        return part.charAt(0).toLocaleUpperCase("nb-NO")
             + part.slice(1).toLocaleLowerCase("nb-NO");
      })
      .join("");
    }

    

    
}

const rootelement = document.getElementById("root");
new DeltagerManager(rootelement);
