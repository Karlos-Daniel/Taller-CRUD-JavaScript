const formulario = document.getElementById("formulario");

var validador = 
{
  nombre:false,
  codigo:false,
  fecha_ini:false,
  fecha_fin:false,
  responsable:false,
  presupuesto:false,
};

nombre.addEventListener("change", (e) => {
  if (esalpha(e.target.value)) {
    errorNombre.classList.remove("hidden");
    validador.nombre = false;
  } else {
    errorNombre.classList.add("hidden");
    validador.nombre = true; 
  }
  toggleButton()
});

codigo.addEventListener("change", (e) => {
  if (esalphanum(e.target.value)) {
    errorId.classList.remove("hidden");
    validador.codigo = false; 
  } else {
    errorId.classList.add("hidden");
    validador.codigo = true; 
  }
  toggleButton()
});

fecha_ini.addEventListener("change",(e)=>{
  if(e.target.value && IntervaloFecha()==true){
    fecha_fin.disabled = false;
    errorFechaIni.classList.add("hidden");
    validador.fecha_ini = true; 
  }else{
    fecha_fin.disabled =true;
    errorFechaIni.classList.remove("hidden");
    validador.fecha_ini = false; 
  }
  toggleButton()
})

  fecha_fin.addEventListener("change",(e)=>{
    if(fechaIniciodelFin()==false && IntervaloFecha()==true){
      errorFechaFin.classList.remove("hidden");
      validador.fecha_fin = false; 
    }else{
      errorFechaFin.classList.add("hidden"); 
      validador.fecha_fin = true; 
   }
    toggleButton()
  });

presupuesto.addEventListener("change", (e) => {
  if(presupuestoLimit(e.target.value)==false){
    errorPresupuesto.classList.remove("hidden");
    validador.presupuesto = false; 
  } else {
    errorPresupuesto.classList.add("hidden");
    validador.presupuesto = true; 
  }
  toggleButton()
});

responsable.addEventListener("change", (e) => {
  if (esalpha(e.target.value)) {
    errorResponsable.classList.remove("hidden");
    validador.responsable = false; 
  } else {
    errorResponsable.classList.add("hidden");
    validador.responsable = true; 
 }
  toggleButton()
});

btnAgregar.addEventListener("click",(e)=>{


})



function toggleButton(){
  if(validador.nombre &&validador.codigo &&validador.fecha_fin &&validador.fecha_ini &&validador.presupuesto &&validador.responsable){
    btnAgregar.disabled=false;
  }
  else{
    btnAgregar.disabled=true;
  } 
}

function esalphanum(value) {
  if (value.match(/^[0-9a-zA-Z]+$/)) {
    return false;
  } else {
    return true;
  }
}
function esalpha(value) {
  if (value.match(/^[a-zA-Z]+$/)) {
    return false;
  } else {
    return true;
  }
}

function IntervaloFecha(isForEditModal){
  let inicio;
  
  if(isForEditModal) inicio = document.getElementById("fecha_ini2").value;
  else inicio = document.getElementById("fecha_ini").value;
  
  if(new Date(inicio)>new Date(2022, 0, 0)&& new Date(inicio)< new Date(2022, 12, 31)){
    return true; 
  }else{
    return false;
  }
}

function fechaIniciodelFin(isForEditModal){
  let inicio;
  let final;

  if(isForEditModal) {
    inicio = document.getElementById("fecha_ini2").value;
    final = document.getElementById("fecha_fin2").value;
  } else {
    inicio = document.getElementById("fecha_ini").value;
    final = document.getElementById("fecha_fin").value;
  };

  if(IntervaloFecha()==true && new Date(final)>new Date(inicio)){
    return true;
  }else{
    return false;
  }
}
function presupuestoLimit(value){
  if(parseInt(value)>10000000 && parseInt(value)<50000000){
    return true;
  }else{
    return false;
  }
}

function closeModal() {
  const divApp = document.getElementById("modal");
  divApp.className = "hidden";
}

var overflow = true;
const body = document.getElementById("cuerpo");
function ocultar() {
  if (overflow) {
    body.className="overflow-hidden";
    overflow = false;
  } else {
    body.className="";
    overflow = true;
  }
}

