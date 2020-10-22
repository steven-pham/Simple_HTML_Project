function showTab(num){
    let logoArray = ["homeTab", "productsTab", "newsTab", "locationTab", "commentsTab"];
    let tabArray  = ["home" , "products", "news", "location", "comments"];
    document.getElementById(tabArray[num]).style.display = "block";
    document.getElementById(logoArray[num]).style.backgroundColor="grey";
    for(let i = 0; i< 5; i++){
        if(i != num){
            document.getElementById(tabArray[i]).style.display = "none";
            document.getElementById(logoArray[i]).style.backgroundColor="transparent";
        }
    }
    
};

async function getVcard(){
    const response = await fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard');
    let data = await response.text();
    let array = data.split("\n");
    let dict = new Object();
    for(let element of array){
        let smallArray = element.split(":");
        dict[smallArray[0]] = smallArray[1];
    }
    const tel = dict["TEL;WORK;VOICE"];
    const address = dict["ADR;WORK;PREF"].replace(/;/g, "");
    const email = dict["EMAIL"];
    document.getElementById("tel").innerText =tel;
    document.getElementById("address").innerText =address;
    document.getElementById("email").innerText =email;
}

async function getAllItems(){
    let response = await fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items',
    {
      headers:{
          "Accept": "application/json",
      },  
    });
    let data = await response.json();
    let listItem = document.getElementById("listItems");
    listItem.textContent = '';
    listItems(data);

};

async function searchFunction() {
    let input = document.getElementById("myInput").value;
    let response = await fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=' + input,
    {
      headers:{
          "Accept": "application/json",
      },  
    });
    let data = await response.json();
    let listItem = document.getElementById("listItems");
    listItem.textContent = '';
    listItems(data);
}

function listItems(data){
    let listItem = document.getElementById("listItems");
    for (let value of data) {
        listChild = document.createElement("li");

        let img = document.createElement("img");
        let idImage = value.ItemId;


        let span = document.createElement("span");

        let pTitle = document.createElement("p");
        let pPrice = document.createElement("p");
        let pOrigin = document.createElement("p");

        let bt  = document.createElement("button");
        bt.textContent = "Buy Now";


        img.src = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + idImage;

        pTitle.textContent = value.Title;
        pPrice.textContent = value.Price;
        pOrigin.textContent = value.Origin;

        span.appendChild(pTitle);
        span.appendChild(pPrice);
        span.appendChild(pOrigin);
        span.appendChild(bt);

        listChild.appendChild(img);
        listChild.appendChild(span);
        listItem.appendChild(listChild);
        let hr = document.createElement("hr");
        listItem.appendChild(hr);
    }
}

async function getNews(){
    let response = await fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news",
    {
        headers:{
            "Accept": "application/json",
        },
    })
    let data  = await response.json();
    let newsList = document.getElementById("newsList");
    newsList.textContent='';
    listNews(data);
}

function listNews(data){
    
    let newsList = document.getElementById("newsList");
    for(let e of data){
        let listChild = document.createElement('li');

        let img = document.createElement('img');
        img.src = e.enclosureField.urlField;

        let div1 = document.createElement("div");
        div1.id = "titleDate";
        let p1 = document.createElement("p")
        let a = document.createElement("a")
        a.href = e.linkField;
        a.innerHTML = e.titleField;
        p1.appendChild(a);
        let p2 = document.createElement("p");
        p2.textContent = e.pubDateField;

        div1.appendChild(p1);
        div1.appendChild(p2);

        let div2 = document.createElement("div");
        let p3 = document.createElement("p");
        p3.textContent = e.descriptionField;
        div2.appendChild(p3);

        let hr = document.createElement("hr");

        listChild.appendChild(img);
        listChild.appendChild(div1);
        listChild.appendChild(div2);
        listChild.appendChild(hr);

        newsList.appendChild(listChild);
    }
}



showTab(0);






















