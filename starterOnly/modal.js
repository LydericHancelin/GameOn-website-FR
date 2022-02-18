function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Contraints
const $minInputLength = 2

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

const $inputEmail = document.getElementById('input-email');
const $inputFirstName = document.getElementById('input-firstname');
const $inputLastName = document.getElementById('input-lastname');
const $inputBirthDate = document.getElementById('input-birthdate');
const $inputNbreTournament = document.getElementById('input-nbretournament');

//fonctions utiles
function isDateValid(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
const isEmailValid = email => email.validity.valid
const isPositiveInteger = num => Number.isInteger(num) && num >= 0

//Check if only one radio is check
const isChecked = ($formdataRadio) => Array.from($formdataRadio.children)
  .filter(el => el.type === "radio")
  .reduce((acc, el) => el.checked ? ++acc : acc, 0) === 1

const hasDataErrorVisible = domElement => domElement.getAttribute("data-error-visible") === "true"

const isFormValid = () => {
  return !hasDataErrorVisible($formdataRadio) && !hasDataErrorVisible($formdataCgu)
    && !hasDataErrorVisible($formdataBirthDate) && !hasDataErrorVisible($formdataEmail)
    && !hasDataErrorVisible($formdataFirstName) && !hasDataErrorVisible($formdataLastName)
    && !hasDataErrorVisible($formdataNbreTournament)
}

//Event listeners

// launch modal event
$modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
$closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// listen submit event
$subscribeForm.addEventListener("submit", handleSubmit);

$inputEmail.addEventListener("input", function () {
  setErrorValidity($inputEmail, $formdataEmail, isEmailValid)
}, false);

$inputFirstName.addEventListener("input", function () {
  $formdataFirstName.setAttribute('data-error-visible', $inputFirstName.value.length >= $minInputLength)
}, false);

$inputLastName.addEventListener("input", function () {
  $formdataLastName.setAttribute('data-error-visible', $inputLastName.value.length >= $minInputLength)
}, false);

$inputBirthDate.addEventListener("input", function () {
  const birthdate = new Date($inputBirthDate.value);
  $formdataBirthDate.setAttribute('data-error-visible', !isDateValid(birthdate))
}, false);

$inputNbreTournament.addEventListener("input",
  e => $formdataNbreTournament.setAttribute("data-error-visible", !isPositiveInteger(parseInt(e.target.value, 10))))


//Vérifications au "submit"
$form.addEventListener("submit", function (event) {
  event.preventDefault();
  $formdataRadio.setAttribute("data-error-visible", !isChecked($formdataRadio))

  const $inputCheckboxCgu = document.getElementById('input-checkboxcgu')
  $formdataCgu.setAttribute("data-error-visible", !$inputCheckboxCgu.checked)

  $formdataFirstName.setAttribute('data-error-visibility', $inputFirstName.value === "")
  $formdataLastName.setAttribute('data-error-visibility', $inputLastName.value === "")
  $formdataEmail.setAttribute('data-error-visibility', $inputEmail.value === "")
  if(isFormValid()){
    $form.style.display = "none";
    $modalThanks.style.display = "flex";
  }
}, false);

$buttonThanks.addEventListener("click", () => {
  $form.style = null;
  $modalThanks.style = null;
  closeModal();
  $form.reset();
})







