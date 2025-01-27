

 
let estudiantes=[]



let editarEstudiantes=null;














document.getElementById("boton-mostrar").addEventListener("click", function () {
    const container = document.getElementById("assistance-container");
    container.classList.toggle("visible");

    if (container.classList.contains("visible")) {
        mostrarResumenGeneral(); // Llamar a la función al mostrar el resumen
    }
});



function agregarEstudiante(){
const studentForm=document.getElementById("assistanceForm-container");
studentForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const studentName=document.getElementById("studentName").value.trim();
    const typeAssistance=document.getElementById("typeAssistance").value;
    

    if(!studentName ){

        alert("Llene todos los campos por favor");
        return;
    }

    const fechaActual=new Date().toISOString().split("T")[0];


    const estudiante={

        nombreEstudiante:studentName,
        asistencia:typeAssistance,
        fecha:fechaActual,
    } 

    if(editarEstudiantes!==null){
       estudiantes[editarEstudiantes]=estudiante;
       editarEstudiantes=null;



    }else{
        estudiantes.push(estudiante);
    }

    
    guardarLocal();

    mostrarResumen();


    document.getElementById("assistance").reset();


});
}



function mostrarResumen(){

    const tableBody=document.querySelector("table tbody");
    tableBody.innerHTML="";

    estudiantes.forEach((estudiante,index)=>{
       const row=document.createElement("tr");

       row.innerHTML=`
                    <td>${estudiante.nombreEstudiante}</td>
                    <td>${estudiante.asistencia}</td>
                    <td>${estudiante.fecha}</td>
                    <td>
                        <button onclick="editarEstudiante(${index})">Editar</button>
                        <button onclick="eliminarEstudiante(${index})">Eliminar</button>
                    </td>
       
       
       
       `;



       tableBody.appendChild(row);



    });
}








function editarEstudiante(index){
    const estudiante=estudiantes[index];

    document.getElementById("studentName").value=estudiante.nombreEstudiante;
    document.getElementById("typeAssistance").value=estudiante.asistencia;
    

    editarEstudiantes=index;

}

function eliminarEstudiante(index){

    estudiantes.splice(index,1);

    guardarLocal();
    mostrarResumen();

}






function mostrarResumenGeneral() {
    const resumenList = document.getElementById("assistance-list");
    resumenList.innerHTML = "";

    const resumen = estudiantes.reduce((acc, estudiante) => {
        acc[estudiante.asistencia] = (acc[estudiante.asistencia] || 0) + 1;
        return acc;
    }, {});

    for (const [key, value] of Object.entries(resumen)) {
        const li = document.createElement("li");
        li.textContent = `${key}: ${value}`;
        resumenList.appendChild(li);
    }
}





function guardarLocal() {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}





function cargarLocal() {
    const datosGuardados = localStorage.getItem("estudiantes");
    if (datosGuardados) {
        estudiantes = JSON.parse(datosGuardados);
        mostrarResumen(); // Actualiza la tabla al cargar los datos
    }
}



cargarLocal();
agregarEstudiante();