const form = document.getElementById("register");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const errors = document.getElementById("errors");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  const checks = [
    {
      input: usernameInput,
      invalid: username.length < 3,
      message: "Потребителското име трябва да е поне 3 символа.",
    },
    {
      input: emailInput,
      invalid: !emailPattern.test(email),
      message: "Въведете валиден имейл адрес.",
    },
    {
      input: passwordInput,
      invalid: password.length < 8,
      message: "Паролата трябва да е поне 8 символа.",
    },
    {
      input: confirmInput,
      invalid: confirm === "" || confirm !== password,
      message: "Паролите не съвпадат.",
    },
  ];

  const messages = [];
  for (const check of checks) {
    check.input.style.borderColor = check.invalid ? "#c62828" : "";
    if (check.invalid) {
      messages.push(check.message);
    }
  }

  if (messages.length > 0) {
    errors.className = "error";
    errors.style.whiteSpace = "pre-line";
    errors.textContent = messages.join("\n");
    return;
  }

  errors.className = "result";
  errors.style.whiteSpace = "";
  errors.textContent = "Успешна регистрация!";
  form.reset();
  for (const check of checks) {
    check.input.style.borderColor = "";
  }
});
