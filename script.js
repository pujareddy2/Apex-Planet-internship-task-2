function toggleContactField(value) {
  const container = document.getElementById("contactInputContainer");
  container.innerHTML = "";

  if (value === "email") {
    container.innerHTML = `
      <label for="preferredEmail">Preferred Email</label>
      <input type="email" id="preferredEmail" name="preferredEmail" required />
    `;
  } else if (value === "phone") {
    container.innerHTML = `
      <label for="preferredPhone">Preferred Phone</label>
      <input type="tel" id="preferredPhone" name="preferredPhone" required />
    `;
  }
}

const form = document.getElementById("contactForm");

const validators = {
  fullname: value => value.trim().length >= 3,
  email: value => /^\S+@\S+\.\S+$/.test(value),
  phone: value => /^\d{10}$/.test(value),
  password: value => value.length >= 6,
  age: value => !value || (value >= 1 && value <= 120)
};

form.addEventListener("input", e => {
  const field = e.target;
  const { name, value } = field;

  if (validators[name]) {
    field.style.borderColor = validators[name](value) ? "green" : "red";
  }
});

form.addEventListener("submit", e => {
  const fields = ["fullname", "email", "phone", "password", "age"];
  let valid = true;

  fields.forEach(name => {
    const field = form.elements[name];
    if (validators[name] && !validators[name](field.value)) {
      field.style.borderColor = "red";
      valid = false;
    }
  });

  if (!valid) {
    e.preventDefault();
    alert("Please fix errors before submitting.");
  }
});