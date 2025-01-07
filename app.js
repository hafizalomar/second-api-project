const array = [];

let fetchRes = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a`);

fetchRes.then(res => res.json()).then(data => {
    if (data.drinks) {
        displayItem(data.drinks);
    } else {
        notFound();
    }
})

document.getElementById("searchBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const inputValue = document.getElementById("searchBox").value;
    console.log(inputValue);

    document.getElementById("display").innerHTML = "";


    if (inputValue == "") {
        notFound();
    } else {
        let fetchRes = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);

        fetchRes.then(res => res.json()).then(data => {
            if (data.drinks) {
                displayItem(data.drinks);
            } else {
                notFound();
            }
        })
    }
    
    document.getElementById("searchBox").value = "";
})

const displayItem = (elements) => {
    const display = document.getElementById("display");
    display.innerHTML = "";

    elements.forEach((element) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <div class="card" style="width:400px">
                <img class="card-img-top" src="${element.strDrinkThumb}" alt="Card image">
                <div class="card-body text-center">
                    <h4 class="card-title fs-5">Name: ${element.strDrink}</h4>
                    <p class="">Category: ${element.strCategory}</p>
                    <p class="">Instruction: ${element.strInstructions.slice(0, 20)}...</p>
                    <button onclick="addToCart('${element.idDrink}')" type="button" class="btn btn-outline-dark">Add to Cart</button>
                    <button onclick="details('${element.idDrink}')" type="button" class="btn btn-outline-success"  data-bs-target="#exampleModal">Details</button>
                </div>
            </div>
            `;
        
        display.appendChild(div);
    });
};


const notFound = () => {
    document.getElementById("display").innerHTML = "";

    const notFound = document.getElementById("display");

    const div = document.createElement("div");

    div.innerHTML = `
        <h1>Your Searching drink not found</h1>
    `

    notFound.appendChild(div);
}

const details = (id) => {
    let fetchRes = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

    fetchRes.then(res => res.json()).then(data => {
        const drink = data.drinks[0];
        
        const modalTitle = document.getElementById("exampleModalLabel");
        const modalBody = document.querySelector(".modal-body");

        modalTitle.innerText = drink.strDrink;
        modalBody.innerHTML = `
            <img src="${drink.strDrinkThumb}" class="img-fluid" alt="${drink.strDrink}">
            <h1><strong>Ditals</strong></h1>
            <p><strong>Category:</strong> ${drink.strCategory}</p>
            <p><strong>Alcoholic: </strong> ${drink.strAlcoholic}</p>
            <p>${drink.strInstructions}</p>
        `;

        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    })
};

const addToCart = (id) => {
    let fetchRes = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

    fetchRes.then(res => res.json()).then(data => {
        const child = data.drinks[0];

        let count = parseInt(document.getElementById("count").innerHTML);

        if (count < 7) {
            console.log(array);
            if (array.includes(id)) {
                alert("item already selected");
            } else {
                count++;

                document.getElementById("count").innerHTML = count;

                const itemAdd = document.getElementById("itemAdd");
            
                const div = document.createElement("tr");

                div.innerHTML = `
                    <th scope="row">${count}</th>
                    <td><img src="${child.strDrinkThumb}" class="img-fluid rounded-5" alt="Shopping item" style="width: 65px;"></td>
                    <td>${child.strDrink}</td>
                `

                itemAdd.appendChild(div);

                array.push(id);
            }
        } else {
            alert("only 7 drinks you can add");
        }
    })

    
}