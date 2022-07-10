const tipo_persona = document.getElementById("tipo_persona");
const tipo_persona2 = document.getElementById("tipo_persona2");
const prof_cont = document.getElementById("profesor_type_container");
const est_cont = document.getElementById("estudiante_type_container");
var isStudent = false;
var registros = [];

const inputs = () => {
    const codigo = document.getElementById("codigo");
    const nombre = document.getElementById("nombre");
    const tipo = document.getElementById("tipo");
    const fecha_ini = document.getElementById("fecha_ini");
    const fecha_fin = document.getElementById("fecha_fin");
    const responsable = document.getElementById("responsable");
    const presupuesto = document.getElementById("presupuesto");
    const tipo_profesor = document.getElementById("tipo_profesor");
    const semestre = document.getElementById("semestre");
    return isStudent
        ? [
              codigo,
              nombre,
              tipo,
              fecha_ini,
              fecha_fin,
              responsable,
              presupuesto,
              tipo_persona,
              semestre,
          ]
        : [
              codigo,
              nombre,
              tipo,
              fecha_ini,
              fecha_fin,
              responsable,
              presupuesto,
              tipo_persona2,
              tipo_profesor,
          ];
};

var objeto = () => {
    obj = {};
    inputs().map((e) => {
        obj = {
            ...obj,
            [e.id]: e.value,
        };
    });
    return obj;
};

tipo_persona.addEventListener("click", (e) => {
    isStudent = true;
    if (isStudent) {
        prof_cont.className = "hidden";
        est_cont.className = "";
    }
});

tipo_persona2.addEventListener("click", (e) => {
    isStudent = false;
    if (!isStudent) {
        prof_cont.className = "";
        est_cont.className = "hidden";
    }
});

Registrar = () => {
    registros.push(objeto());
    ListarRegistros();
};

Eliminar = (id) => {
    let item = document.getElementById(id);
    item.parentNode.removeChild(item);
    registros.splice(id, 1);
};

ListarRegistros = () => {
    const div = document.getElementById("table_container");
    div.innerHTML = ``;
    let html = ``;
    registros.forEach((obj, i) => {
        html += `
    <tr id=${i} class="odd:bg-white even:bg-slate-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">${
          obj.nombre
      }</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${
          obj.responsable
      }</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${
          obj.fecha_ini
      }</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${
          obj.fecha_fin
      }</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${
          Math.abs(
              new Date(obj.fecha_fin).getTime() -
                  new Date(obj.fecha_ini).getTime()
          ) /
          (1000 * 3600 * 24)
      }</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        <input type="button" onclick="Editar(${i})" value="Editar" class="bg-green-600 text-green-200 text-sm p-1 border border-green-800">
        <input type="button" onclick="Eliminar(${i})" value="Eliminar" class="bg-red-600 text-red-200 text-sm p-1 border border-red-800">
        <input type="button" onclick="VistaRapida(${i})" value="Vista Rápida" class="bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800">
      </td>
    </tr>
    `;
    });
    div.innerHTML = html;
};

VistaRapida = (i) => {
    const divApp = document.getElementById("modal");
    const element = document.createElement("div");
    divApp.className = "block";
    ocultar();

    let html = `<div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
  <div class="bg-white px-16 py-14 rounded-md text-center">
    <h1 class="text-xl mb-4 font-bold text-slate-500">Vista Rapida</h1>`;
    html += `
    <ul class="flex flex-col items-start">
    <li class="text-m - font-bold text-slate-600" >Codigo: ${
        registros[i]["codigo"]
    }</li>
    <li class="text-m - font-bold text-slate-600" >Nombre: ${
        registros[i]["nombre"]
    }</li>
    <li class="text-m - font-bold text-slate-600" >Tipo: ${
        registros[i]["tipo"]
    }</li>
    <li class="text-m - font-bold text-slate-600" >Fecha de Inicio: ${
        registros[i]["fecha_ini"]
    }</li>
    <li class="text-m - font-bold text-slate-600" >Fecha de Finalización: ${
        registros[i]["fecha_fin"]
    }</li>
    <li class="text-m - font-bold text-slate-600" >Dias de ejecución:${
        Math.abs(
            new Date(registros[i]["fecha_fin"]).getTime() -
                new Date(registros[i]["fecha_ini"]).getTime()
        ) /
        (1000 * 3600 * 24)
    }</li>
    <li class="text-m - font-bold text-slate-600" >Responsable: ${
        registros[i]["responsable"]
    }</li>
    <li class="text-m - font-bold text-slate-600" >Presupuesto: ${
        registros[i]["presupuesto"]
    }</li>
    <li class="text-m - font-bold text-slate-600" >Tipo de persona: ${
        registros[i]["tipo_persona"] != undefined
            ? registros[i]["tipo_persona"]
            : registros[i]["tipo_persona2"]
    }</li>
    <li class="text-m - font-bold text-slate-600" >${
        registros[i]["tipo_persona"] != undefined
            ? `Semestre: ` + registros[i]["semestre"]
            : `Tipo de profesor: ` + registros[i]["tipo_profesor"]
    }</li>
    </ul>
    `;

    html += `<button onclick="closeModal(); ocultar();" class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
</div>
</div>`;

    element.innerHTML = html;
    if (divApp.childElementCount > 0) {
        divApp.innerHTML = "";
    }
    divApp.appendChild(element);
};

Editar = (i) => {
    const divApp = document.getElementById("modal");
    const element = document.createElement("div");
    divApp.innerHTML = "";
    divApp.className = "block";
    ocultar();


    let html = `<div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
  <div class="bg-white px-16 py-14 rounded-md text-center">
    <h1 class="text-xl mb-4 font-bold text-slate-500">Vista Modificación</h1>`;
    html += `

    <ul class="flex flex-col items-start">
      <li class="text-m font-bold text-slate-600" >
        Codigo: 
        <input class="caja" type="text" name="codigo2" id="codigo2" value="${
            registros[i]["codigo"]
        }" />
        <span id="errorId2" class="hidden text-xs text-red-600">Datos no válidos en el codigo</span>
      </li>

      <li class="text-m - font-bold text-slate-600" >
        Nombre: 
        <input class="caja" type="text" name="nombre2" id="nombre2" value="${
            registros[i]["nombre"]
        }">
        <span id="errorNombre2" class="hidden text-xs text-red-600">Datos no válidos en el codigo</span>
      </li>

      <li class="text-m - font-bold text-slate-600" >
        Tipo:  
        <select name="tipo2" id="tipo2" class="caja" >
          <option value="">Seleccione el tipo de proyecto</option>
          <option value="Investigación" ${
              registros[i]["tipo"] === "Investigación" ? `selected` : ""
          } >Investigación</option>
          <option value="Extensión"${
              registros[i]["tipo"] === "Extensión" ? `selected` : ""
          }>Extensión</option>
        </select>
      </li>        
      
      <li class="text-m - font-bold text-slate-600" >
        Fecha Inicio:
        <td>
          <input class="caja" type="date" name="fecha_ini2" id="fecha_ini2" onchange="IntervaloFecha()" value="${
              registros[i]["fecha_ini"]
          }" />
          <span id="errorFechaIni2" class="hidden text-xs text-red-600">Datos no válidos en el codigo</span>
        </td>

      <li class="text-m - font-bold text-slate-600" >
        Fecha Final: 
        <td>
          <input 
            class="caja"
            type="date" 
            name="fecha_fin2" 
            id="fecha_fin2" 
            value="${registros[i]["fecha_fin"]}"
          >
          <span 
            id="errorFechaFin2" 
            class="hidden text-xs text-red-600">Datos no válidos en el codigo
          </span>
        </td>

      <li class="text-m - font-bold text-slate-600" >
        Responsable: 
        <input class="caja" type="text" name="responsable" id="responsable2" value="${
            registros[i]["responsable"]
        }" />
        <span id="errorResponsable2" class="hidden text-xs text-red-600">Datos no válidos en el codigo</span>
      </li>

      <li class="text-m font-bold text-slate-600" >
        Presupuesto: 
        <input class="caja" type="text" name="presupuesto" id="presupuesto2" value="${
            registros[i]["presupuesto"]
        }" />
        <span id="errorPresupuesto2" class="hidden text-xs text-red-600">Datos no válidos en el codigo</span>
      </li>

      <li class="text-m - font-bold text-slate-600" >
        Tipo de person: 
        <td>
          <input class="px-10" type="radio" name="tipo_persona3" id="tipo_persona3" value="estudiante" ${
              registros[i]["tipo_persona"] ? `checked` : ""
          } >
            Estudiante
          </input>
          <input class="px-10" type="radio" name="tipo_persona3"  id="tipo_persona4" value="profesor"  ${
              registros[i]["tipo_persona2"] ? `checked` : ""
          } >
            Profesor
          </input>
        </td>
      </li>

        <li id="edit_semestre" class="text-m - font-bold text-slate-600 ${registros[i]["tipo_persona"] != undefined ? "" : "hidden"}" >
            Semestre 
            <select name="semestre" id="semestre2" class="caja">
                <option value="I" ${
                    registros[i]["semestre"] === "I" ? `selected` : ""
                }>
                    I
                </option>

                <option value="II"${
                    registros[i]["semestre"] === "II" ? `selected` : ""
                }>II</option>

                <option value="III"${
                    registros[i]["semestre"] === "III" ? `selected` : ""
                }>III</option>

                <option value="IV"${
                    registros[i]["semestre"] === "IV" ? `selected` : ""
                }>IV</option>

                    <option value="V"${
                        registros[i]["semestre"] === "V" ? `selected` : ""
                    }>V</option>

                    <option value="VI"${
                        registros[i]["semestre"] === "VI" ? `selected` : ""
                    }>VI</option>

                <option value="VII"${
                    registros[i]["semestre"] === "VII" ? `selected` : ""
                }>VII</option>

                <option value="VIII"${
                    registros[i]["semestre"] === "VIII" ? `selected` : ""
                }>VIII</option>

                <option value="IX"${
                    registros[i]["semestre"] === "IX" ? `selected` : ""
                }>IX</option>

                <option value="X"${
                    registros[i]["semestre"] === "X" ? `selected` : ""
                }>X</option>
            </select>
        </li>
        <li id="edit_tipo_profesor" class="text-m - font-bold text-slate-600 ${registros[i]["tipo_persona"] != undefined ? "hidden" : ""}" >
            Tipo profesor: 
            <select name="tipo_profesor2" id="tipo_profesor2" class="caja">
                <option value="Planta"${
                    registros[i]["tipo_profesor"] === "Planta" ? `selected` : ""
                }>Planta</option>
                <option value="Catedratico"${
                    registros[i]["tipo_profesor"] === "Catedratico" ? `selected` : ""
                }>Catedratico</option>
                <option value="Ocasional"${
                    registros[i]["tipo_profesor"] === "Ocasional" ? `selected` : ""
                }>Ocasional</option>
            </select>
        </li>

    </ul>
    `;

    html += `
  <button onclick="closeModal(); ocultar();" id="btnEditar" class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Editar</button>

  <button onclick="closeModal(); ocultar();" class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Cancelar</button>
</div>
</div>`;

    element.innerHTML = html;
    if (divApp.childElementCount > 0) {
        divApp.innerHTML = "";
    }
    divApp.appendChild(element);

    var validadorEditar = {
        nombre: false,
        codigo: false,
        fecha_ini: false,
        fecha_fin: false,
        responsable: false,
        presupuesto: false,
    };

    nombre2.addEventListener("change", (e) => {
        if (esalpha(e.target.value)) {
            errorNombre2.classList.remove("hidden");
            validadorEditar.nombre = false;
        } else {
            errorNombre2.classList.add("hidden");
            validadorEditar.nombre = true;
        }
        toggleButton();
    });

    codigo2.addEventListener("change", (e) => {
        if (esalphanum(e.target.value)) {
            errorId2.classList.remove("hidden");
            validadorEditar.codigo = false;
        } else {
            errorId2.classList.add("hidden");
            validadorEditar.codigo = true;
        }
        toggleButton();
    });

    fecha_ini2.addEventListener("change", (e) => {
        if (e.target.value && IntervaloFecha(true) == true) {
            fecha_fin.disabled = false;
            errorFechaIni2.classList.add("hidden");
            validadorEditar.fecha_ini = true;
        } else {
            fecha_fin.disabled = true;
            errorFechaIni2.classList.remove("hidden");
            validadorEditar.fecha_ini = false;
        }
        toggleButton();
    });

    fecha_fin2.addEventListener("change", (e) => {
        if (fechaIniciodelFin(true) == false && IntervaloFecha(true) == true) {
            errorFechaFin2.classList.remove("hidden");
            validadorEditar.fecha_fin = false;
        } else {
            errorFechaFin2.classList.add("hidden");
            validadorEditar.fecha_fin = true;
        }
        toggleButton();
    });

    presupuesto2.addEventListener("change", (e) => {
        if (presupuestoLimit(e.target.value) == false) {
            errorPresupuesto2.classList.remove("hidden");
            validadorEditar.presupuesto = false;
        } else {
            errorPresupuesto2.classList.add("hidden");
            validadorEditar.presupuesto = true;
        }
        toggleButton();
    });

    responsable2.addEventListener("change", (e) => {
        if (esalpha(e.target.value)) {
            errorResponsable2.classList.remove("hidden");
            validadorEditar.responsable = false;
        } else {
            errorResponsable2.classList.add("hidden");
            validadorEditar.responsable = true;
        }
        toggleButton();
    });

    tipo_persona3.addEventListener("click", (e) => {
        edit_semestre.classList.remove("hidden")
        edit_tipo_profesor.classList.add("hidden")
    });

    tipo_persona4.addEventListener("click", (e) => {
        edit_tipo_profesor.classList.remove("hidden")
        edit_semestre.classList.add("hidden")
    });


    btnEditar.addEventListener("click", (e) => {
        if(tipo_persona3.checked) {
            registros[i] = {
                codigo: codigo2.value,
                nombre: fecha_fin2.value,
                tipo: tipo2.value,
                fecha_ini: fecha_ini2.value,
                fecha_fin: fecha_fin2.value,
                responsable: responsable2.value,
                presupuesto: responsable2.value,
                tipo_persona: tipo_persona3.value,
                semestre: semestre2.value,
            }
        } else {
            registros[i] = {
                codigo: codigo2.value,
                nombre: fecha_fin2.value,
                tipo: tipo2.value,
                fecha_ini: fecha_ini2.value,
                fecha_fin: fecha_fin2.value,
                responsable: responsable2.value,
                presupuesto: responsable2.value,
                tipo_persona2: tipo_persona4.value,
                tipo_profesor: tipo_profesor2.value,
            }
        }
        ListarRegistros();
    });

    function toggleButton() {
        if (
            validadorEditar.nombre &&
            validadorEditar.codigo &&
            validadorEditar.fecha_fin &&
            validadorEditar.fecha_ini &&
            validadorEditar.presupuesto &&
            validadorEditar.responsable
        ) {
            btnAgregar.disabled = false;
        } else {
            btnAgregar.disabled = true;
        }
    }
};
