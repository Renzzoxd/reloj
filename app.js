//Botones main
const buttonReloj = document.getElementById('reloj-button');
const buttonAlarma = document.getElementById('alarma-button');
const buttonTemporizador = document.getElementById('temporizador-button');
const buttonCronometro = document.getElementById('cronometro-button');

const relojSection = document.getElementById('reloj-section');
const alarmSection = document.getElementById('alarma-section');
const tempoSection = document.getElementById('temporizador-section');
const cronoSection = document.getElementById('cronometro-section');
relojSection.style.display='none';
alarmSection.style.display='none';
tempoSection.style.display='none';
cronoSection.style.display='none';


buttonReloj.addEventListener('click', () => {
    buttonReloj.classList.add('button-menu-select');
    buttonAlarma.classList.remove('button-menu-select');
    buttonTemporizador.classList.remove('button-menu-select');
    buttonCronometro.classList.remove('button-menu-select');
    relojSection.style.display = '';
    alarmSection.style.display = 'none';
    tempoSection.style.display = 'none';
    cronoSection.style.display = 'none';
});
buttonAlarma.addEventListener('click', () => {
    buttonAlarma.classList.add('button-menu-select');
    buttonReloj.classList.remove('button-menu-select');
    buttonTemporizador.classList.remove('button-menu-select');
    buttonCronometro.classList.remove('button-menu-select');
    relojSection.style.display = 'none';
    alarmSection.style.display = '';
    tempoSection.style.display = 'none';
    cronoSection.style.display = 'none';
});
buttonTemporizador.addEventListener('click', () => {
    buttonReloj.classList.remove('button-menu-select');
    buttonAlarma.classList.remove('button-menu-select');
    buttonTemporizador.classList.add('button-menu-select');
    buttonCronometro.classList.remove('button-menu-select');
    relojSection.style.display = 'none';
    alarmSection.style.display = 'none';
    tempoSection.style.display = '';
    cronoSection.style.display = 'none';
});
buttonCronometro.addEventListener('click', () => {
    buttonReloj.classList.remove('button-menu-select');
    buttonAlarma.classList.remove('button-menu-select');
    buttonTemporizador.classList.remove('button-menu-select');
    buttonCronometro.classList.add('button-menu-select');
    relojSection.style.display = 'none';
    alarmSection.style.display = 'none';
    tempoSection.style.display = 'none';
    cronoSection.style.display = '';
});


//Funcionalidad Reloj
const displayReloj = document.getElementById('reloj-display');
function getTime() {
    const date = new Date();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    const clock = `${hh}:${mm}:${ss}`;
    const alarm = `${hh}:${mm}`;
    return { clock, alarm };
}

function reloj() {
    displayReloj.textContent = getTime().clock;
    setInterval(() => {
        displayReloj.textContent = getTime().clock;
        alarm(getTime().alarm);
    }, 1000);
}

reloj();
//Funcionalidad Alarma
const buttonAlarmAdd = document.getElementById('button-alarm-add');
const buttonAlarmDel = document.getElementById('button-alarm-del');
const inputAlarm = document.getElementById('input-alarm');
const displayAlarma = document.getElementById('alarma-display');
buttonAlarmDel.style.display = 'none';
let alarmTime = null;
buttonAlarmAdd.addEventListener('click', () => {
    if (inputAlarm.value !== '') {
        alarmTime = inputAlarm.value;
        displayAlarma.textContent = alarmTime;
        buttonAlarmAdd.style.display = 'none';
        buttonAlarmDel.style.display = '';
    } else {
        displayAlarma.textContent = 'Ingrese un hora ;)';
        setTimeout(() => {
            displayAlarma.textContent = null;
            buttonAlarmAdd.style.display = '';
            buttonAlarmDel.style.display = '';
        }, 3000);
    }
});

buttonAlarmDel.addEventListener('click', () => {
    alarmTime = null;
    displayAlarma.textContent = null;
    buttonAlarmDel.style.display = 'none';
    buttonAlarmAdd.style.display = '';
});

function alarm(timeClock) {
    if (timeClock === alarmTime) {
        displayAlarma.textContent = 'Tiempo ;)';
        setTimeout(() => {
            displayAlarma.textContent = null;
        }, 3000);
        alarmTime = null;
    }
}

//Funcionalidad Temporizador
const inputTermHours = document.getElementById('input-term-hh');
const inputTermMinut = document.getElementById('input-term-mm');
const inputTermSecon = document.getElementById('input-term-ss');
const buttonTermAdd = document.getElementById('button-term-add');
const buttonTermDel = document.getElementById('button-term-del');
const buttonTermSto = document.getElementById('button-term-sto');
const buttonTermRes = document.getElementById('button-term-res');
const displayTerm = document.getElementById('term-display');

buttonTermDel.style.display = 'none';
buttonTermRes.style.display = 'none';
buttonTermSto.style.display = 'none';


let termTime = null;
let idInterTerm = null;
let millTotal = null;

function formatTime(milliseconds) {
    // Obtener horas, minutos y segundos
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    // Formatear a dos dígitos
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Retornar en formato hh:mm:ss
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

buttonTermAdd.addEventListener('click', () => {
    if (inputTermHours.value && inputTermMinut.value && inputTermSecon.value !== '') {
        millTotal = inputTermHours.value * 1000 * 60 * 60 + inputTermMinut.value * 1000 * 60 + inputTermSecon.value * 1000;
        displayTerm.textContent = formatTime(millTotal);
        buttonTermAdd.style.display = 'none';
        buttonTermDel.style.display = '';
        buttonTermSto.style.display = '';
        idInterTerm = setInterval(() => {
            millTotal = millTotal - 1000;
            displayTerm.textContent = formatTime(millTotal);
            if (millTotal < 0) {
                displayTerm.textContent = 'Tiempo ;)';
                setTimeout(() => {
                    clearInterval(idInterTerm);
                    displayTerm.textContent = null;
                    millTotal = null;
                    buttonTermAdd.style.display = '';
                    buttonTermDel.style.display = 'none';
                    buttonTermSto.style.display = 'none';
                    buttonTermRes.style.display = 'none';
                }, 3000);
            }
        }, 1000);
    }
});

buttonTermDel.addEventListener('click', () => {
    if (millTotal !== null) {
        clearInterval(idInterTerm);
        displayTerm.textContent = null;
        millTotal = null;
        buttonTermAdd.style.display = '';
        buttonTermDel.style.display = 'none';
        buttonTermSto.style.display = 'none';
        buttonTermRes.style.display = 'none';
    }
});

buttonTermRes.addEventListener('click', () => {
    if (millTotal !== null) {
        buttonTermRes.style.display = 'none';
        buttonTermSto.style.display = '';
        idInterTerm = setInterval(() => {
            millTotal = millTotal - 1000;
            displayTerm.textContent = formatTime(millTotal);
            if (millTotal < 0) {
                displayTerm.textContent = 'Tiempo ;)';
                setTimeout(() => {
                    clearInterval(idInterTerm);
                    displayTerm.textContent = null;
                    millTotal = null;
                    buttonTermAdd.style.display = '';
                    buttonTermDel.style.display = 'none';
                    buttonTermSto.style.display = 'none';
                    buttonTermRes.style.display = 'none';
                }, 3000);
            }
        }, 1000);
    }
});

buttonTermSto.addEventListener('click', () => {
    if (millTotal !== null) {
        clearInterval(idInterTerm);
        buttonTermRes.style.display = '';
        buttonTermSto.style.display = 'none';
    }
});

//Funcionalidad Cronometro

function formatCronoTime(milliseconds) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    // Formatear cada unidad a dos dígitos
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedCentiseconds = String(centiseconds).padStart(2, '0');

    // Retornar en formato mm:ss:ll
    return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
}

const buttonCronoStar = document.getElementById('button-crono-star');
const buttonCronoStop = document.getElementById('button-crono-stop');
const buttonCronoDele = document.getElementById('button-crono-dele');
const buttonCronoReco = document.getElementById('button-crono-reco');
const buttonCronoRest = document.getElementById('button-crono-rest');
const cronoDisplay = document.getElementById('crono-display');
const cronoListDisplay = document.getElementById('list-crono-display');
let cronoMilli = 0;
let IdCronoInterval = null;
let listCrono = [];
cronoDisplay.textContent = formatCronoTime(cronoMilli);

buttonCronoStar.style.display = '';
buttonCronoStop.style.display = 'none';
buttonCronoDele.style.display = 'none';
buttonCronoReco.style.display = 'none';
buttonCronoRest.style.display = 'none';

buttonCronoStar.addEventListener('click', () => {
    buttonCronoStar.style.display = 'none';
    buttonCronoStop.style.display = '';
    buttonCronoDele.style.display = '';
    buttonCronoReco.style.display = '';
    buttonCronoRest.style.display = 'none';
    IdCronoInterval = setInterval(() => {
        cronoMilli = cronoMilli + 10;
        cronoDisplay.textContent = formatCronoTime(cronoMilli);
    }, 10);
});
buttonCronoStop.addEventListener('click', () => {
    buttonCronoStar.style.display = 'none';
    buttonCronoStop.style.display = 'none';
    buttonCronoDele.style.display = '';
    buttonCronoReco.style.display = 'none';
    buttonCronoRest.style.display = '';
    clearInterval(IdCronoInterval);
});
buttonCronoDele.addEventListener('click', () => {
    buttonCronoStar.style.display = '';
    buttonCronoStop.style.display = 'none';
    buttonCronoDele.style.display = 'none';
    buttonCronoReco.style.display = 'none';
    buttonCronoRest.style.display = 'none';
    clearInterval(IdCronoInterval);
    cronoMilli = 0;
    cronoDisplay.textContent = formatCronoTime(cronoMilli);
    cronoListDisplay.innerHTML = null;
});
buttonCronoReco.addEventListener('click', () => {
    buttonCronoStar.style.display = 'none';
    buttonCronoStop.style.display = '';
    buttonCronoDele.style.display = '';
    buttonCronoReco.style.display = '';
    buttonCronoRest.style.display = 'none';

    listCrono.push(String(formatCronoTime(cronoMilli)));

    let displayCronoList = '';
    listCrono.forEach((value) => {
        displayCronoList = displayCronoList + `<p>${value}<p>`;
    });
    cronoListDisplay.innerHTML = displayCronoList;
});
buttonCronoRest.addEventListener('click', () => {
    buttonCronoStar.style.display = 'none';
    buttonCronoStop.style.display = '';
    buttonCronoDele.style.display = '';
    buttonCronoReco.style.display = '';
    buttonCronoRest.style.display = 'none';

    IdCronoInterval = setInterval(() => {
        cronoMilli = cronoMilli + 10;
        cronoDisplay.textContent = formatCronoTime(cronoMilli);
    }, 10);
});