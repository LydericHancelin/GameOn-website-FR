function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const $modalbg = document.querySelector(".bground");
const $modalhero = document.querySelector(".hero-section");
const $modalBtn = document.querySelectorAll(".modal-btn");
const $form = document.getElementById("subscribe-form");
const $closeBtn = document.querySelectorAll(".close");
const $modalThanks = document.getElementById("thanks-modal");
const $buttonThanks = document.getElementById("thanks-button");

const $subscribeForm = document.getElementById("subscribe-form");

// initialize data error
const $formdataCgu = document.getElementById('formdata-cgu');
const $formdataRadio = document.getElementById('formdata-radio');
const $formdataNbreTournament = document.getElementById('formdata-nbretournament');
const $formdataEmail = document.getElementById('formdata-email');
const $formdataLastName = document.getElementById('formdata-lastname');
const $formdataFirstName = document.getElementById('formdata-firstname');
const $formdataBirthDate = document.getElementById('formdata-birthdate');

const $formdatas = [$formdataCgu, $formdataRadio, $formdataNbreTournament]

$formdataFirstName.setAttribute("data-error", "Le prénom doit contenir au moins 2 caractères");
$formdataLastName.setAttribute("data-error", "Le nom doit contenir au moins 2 caractères");
$formdataEmail.setAttribute("data-error", "Veuillez saisir une adresse mail correcte !");
$formdataBirthDate.setAttribute("data-error", "La réponse doit être une date valide");
$formdataCgu.setAttribute("data-error", "Vous devez d'adord valider les conditions générales d'utilisation");
$formdataRadio.setAttribute("data-error", "Au moins une valeur doit être selectionnée !");
$formdataNbreTournament.setAttribute("data-error", "La réponse doit être un nombre valide de tournois");

// launch modal form
function launchModal() {
  $modalbg.style.display = "block";
  $modalhero.style.display = "none";
}
//close modal form
function closeModal() {
  $modalbg.style.display = "none";
  $modalhero.style.display = "grid";
}

function handleSubmit(event) {
  event.preventDefault();
}

// launch modal event
$modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
$closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));


// listen submit event
$subscribeForm.addEventListener("submit", handleSubmit);

const form = document.getElementsByTagName('form')[0];

// tests verifs mail
const $inputEmail = document.getElementById('input-email');


$inputEmail.addEventListener("input", function () {
  if ($inputEmail.validity.valid) {
    $formdataEmail.setAttribute("data-error-visible", false);
  }
  else {
    $formdataEmail.setAttribute("data-error-visible", true);
  }
}, false);


// tests verif FirstName
const $inputFirstName = document.getElementById('input-firstname');

$inputFirstName.addEventListener("input", function () {
  if ($inputFirstName.value.length >= 2) {
    $formdataFirstName.setAttribute("data-error-visible", false); // On réinitialise le contenu
  }
  else {
    $formdataFirstName.setAttribute("data-error-visible", true);
  }
}, false);

// tests verif LastName
const $inputLastName = document.getElementById('input-lastname');

$inputLastName.addEventListener("input", function () {
  if ($inputLastName.value.length >= 2) {
    $formdataLastName.setAttribute("data-error-visible", false); // On réinitialise le contenu
  }
  else {
    $formdataLastName.setAttribute("data-error-visible", true);
  }
}, false);

//fonctions utiles
function isDateValid(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

//tests verif date
const $inputBirthDate = document.getElementById('input-birthdate');

$inputBirthDate.addEventListener("input", function () {
  const birthdate = new Date($inputBirthDate.value);

  if (isDateValid(birthdate)) {
    $formdataBirthDate.setAttribute("data-error-visible", false); // On réinitialise le contenu
  }
  else {
    $formdataBirthDate.setAttribute("data-error-visible", true);
  }
}, false);


//fonctions utiles
const isPositiveInteger = num => Number.isInteger(num) && num >= 0

//tests verif tournois
const $inputNbreTournament = document.getElementById('input-nbretournament');


$inputNbreTournament.addEventListener("input",
  e => $formdataNbreTournament.setAttribute("data-error-visible", !isPositiveInteger(parseInt(e.target.value,10))))


//tests verif radio /!\ peut etre remplacé par un required


const isChecked = ($formdataRadio) => Array.from($formdataRadio.children)
  .filter(el=>el.type==="radio")
  .reduce((acc,el) => el.checked ? ++acc : acc,0) === 1

const hasDataErrorVisible = domElement => domElement.getAttribute("data-error-visible") === "true"

//Vérifications au "submit"
form.addEventListener("submit", function (event) {
  event.preventDefault();
  $formdataRadio.setAttribute("data-error-visible", !isChecked($formdataRadio))

  const $inputCheckboxCgu = document.getElementById('input-checkboxcgu')
  $formdataCgu.setAttribute("data-error-visible", !$inputCheckboxCgu.checked)

  if($inputFirstName.value ===""){
    $formdataFirstName.setAttribute("data-error-visible", true);
  }
  else{
    $formdataFirstName.setAttribute("data-error-visible", false);
  }

  if($inputLastName.value ===""){
    $formdataLastName.setAttribute("data-error-visible", true);
  }
  else{
    $formdataLastName.setAttribute("data-error-visible", false);
  }
  if($inputEmail.value ===""){
    $formdataEmail.setAttribute("data-error-visible", true);
  }
  else{
    $formdataEmail.setAttribute("data-error-visible", false);
  }

  if(!hasDataErrorVisible($formdataRadio) && !hasDataErrorVisible($formdataCgu)
    && !hasDataErrorVisible($formdataBirthDate) && !hasDataErrorVisible($formdataEmail)
    && !hasDataErrorVisible($formdataFirstName) && !hasDataErrorVisible($formdataLastName)
    && !hasDataErrorVisible($formdataNbreTournament)){
    $form.style.display="none";
    $modalThanks.style.display="flex";
  }

}, false);

$buttonThanks.addEventListener("click", () => {
    $form.style= null ;
    $modalThanks.style=null;
    closeModal();
    $form.reset();
})







