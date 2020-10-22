function showTab(num){
    let tabArray = ["courseTab", "infoTab"];
    let sectionArray  = ["course", "info"];
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

async function getAllCourses(){
    let response = await fetch('https://api.test.auckland.ac.nz/service/courses/v2/courses?subject=MATHS&year=2020&size=500',
    {
      headers:{
          "Accept": "application/json",
      },  
    });
    let stream = await response.json();
    let listCourse = document.getElementById("listCourse");
    listCourse.textContent = '';

    listCourses(stream.data);
};

function listCourses(data){
    let listCourse = document.getElementById("listCourse");
    data.forEach(course =>{
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");

        let tr1 = document.createElement("tr");
        let td1 = document.createElement("td");
        let p1 = document.createElement("p");
        p1.id="subject";
        p1.textContent = course.subject + " " + course.catalogNbr;
        p1.addEventListener('click', function(){getTimeTable(course.catalogNbr);});
        
        let p2 = document.createElement("p");
        p2.id="title";
        p2.textContent = course.title;
        td1.appendChild(p1);
        td1.appendChild(p2);
        tr1.appendChild(td1);
        tbody.appendChild(tr1);

        if("description" in course){
            let tr2 = document.createElement("tr");
            let td2 = document.createElement("td");
            td2.id="desc";
            td2.textContent = course.description;
            tr2.appendChild(td2);
            tbody.appendChild(tr2);
        }
            

        if("rqrmntDescr" in course){
            let tr3 = document.createElement("tr");
            let td3 = document.createElement("td");
            td3.id="req";
            td3.textContent = course.rqrmntDescr;
            tr3.appendChild(td3);
            tbody.appendChild(tr3);
        }
        
        
        table.appendChild(tbody);
        listCourse.appendChild(table);
        let hr = document.createElement("hr");
        listCourse.appendChild(hr);
    });
}

async function getTimeTable(code){
    let response = await fetch('https://api.test.auckland.ac.nz/service/classes/v1/classes?year=2020&subject=MATHS&size=500&catalogNbr='+code);
    let stream = await response.json();
    alert(JSON.stringify(stream.data));
}

async function info(){
    let response = await fetch('https://cws.auckland.ac.nz/qz20/Quiz2020ChartService.svc/g');
    let stream = await response.json();
    document.getElementById("att").innerText=JSON.stringify(stream);
}



getAllCourses();
showTab(0);