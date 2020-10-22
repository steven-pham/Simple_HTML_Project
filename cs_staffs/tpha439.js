function showTab(num){
    let tabArray = ["homeTab", "staffTab"];
    let sectionArray  = ["home", "staff"];
    document.getElementById(tabArray[num]).style.backgroundColor="lightblue";
    document.getElementById(sectionArray[num]).style.display = "block";
    
    tabArray.forEach(element => {
        if(element != tabArray[num]){
            document.getElementById(element).style.backgroundColor="transparent";
        }
    });

    sectionArray.forEach(element => {
        if(element != sectionArray[num]){
            document.getElementById(element).style.display = "none";
        }
    });
    
};

async function getAllStaffs(){
    let response = await fetch('http://redsox.uoa.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url='+'https://unidirectory.auckland.ac.nz/rest/search?orgFilter=MATHS',
    {
      headers:{
          "Accept": "application/json",
      },  
    });
    let data = await response.json();
    let listItem = document.getElementById("listStaff");
    listItem.textContent = '';

    listStaffs(data.list);

};

function listStaffs(data){
    let listStaff = document.getElementById("listStaff");
    data.forEach(value =>{
        listChild = document.createElement("li");

        let upi = value.profileUrl[1];

        let img = document.createElement("img");
        if(!("imageId" in value)){
            img.src = "https://i.stack.imgur.com/l60Hf.png";

        }else{
            let idImage = value.imageId;
            img.src ="https://unidirectory.auckland.ac.nz/people/imageraw/"+ upi +"/"+ idImage +"/biggest";
        }
        listChild.appendChild(img);

        let span = document.createElement("span");

        let pJobTitle = document.createElement("p");
        value.jobtitles.forEach((element, index)=>{
            if(index == value.jobtitles.length -1){
                pJobTitle.textContent+= element;
            }else{
                pJobTitle.textContent+= element + ", ";
            }
        });
        span.appendChild(pJobTitle);

        let pName = document.createElement("p");
        if(!("title" in value)){
            pName.textContent = value.firstname + " " + value.lastname;
        }else{
            pName.textContent = value.title + " " + value.firstname + " " + value.lastname;
        }
        span.appendChild(pName);

        let pPhone = document.createElement("p");
        let aPhone = document.createElement("a");
        aPhone.id = "phone"+upi;
        aPhone.textContent = "*Phone*";
        pPhone.appendChild(aPhone);
        span.appendChild(pPhone);
        
        let pEmail = document.createElement("p");
        let aEmail = document.createElement("a");
        aEmail.id = "email"+upi;
        aEmail.textContent = "*Email*";
        pEmail.appendChild(aEmail);
        span.appendChild(pEmail);
        getNumberAndEmail(upi);


        let pVcard = document.createElement("p");
        let aVcard = document.createElement("a");
        aVcard.href = "https://unidirectory.auckland.ac.nz/people/vcard/" + upi;
        aVcard.textContent = "Add contact to your address book";
        pVcard.appendChild(aVcard);
        span.appendChild(pVcard);


        listChild.appendChild(span);

        listStaff.appendChild(listChild);
        let hr = document.createElement("hr");
        listStaff.appendChild(hr);
    });
}

async function getNumberAndEmail(upi){
    const response = await fetch('https://dividni.com/cors/CorsProxyService.svc/proxy?url='+'https://unidirectory.auckland.ac.nz/people/vcard/'+upi);
    let data = await response.text();
    let array = data.split("\n");
    let dict = new Object();
    array.forEach(element =>{
        let smallArray = element.split(":");
        dict[smallArray[0]] = smallArray[1];
    });
    const tel = dict["TEL;TYPE=WORK,VOICE"];
    const email = dict["EMAIL;TYPE=PREF,INTERNET"];
    document.getElementById("phone"+upi).innerText =tel;
    document.getElementById("phone"+upi).href = "tel:"+tel;
    document.getElementById("email"+upi).innerText =email;
    document.getElementById("email"+upi).href = "mailto:"+email;

}


showTab(0);