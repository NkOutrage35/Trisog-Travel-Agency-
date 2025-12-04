document.addEventListener("DOMContentLoaded", () => {
  // ----- DOM Elements -----
  const loginModal = document.getElementById("login-modal");
  const openModalBtn = document.getElementById("open-login-modal-nav");
  const closeModalBtn = document.getElementById("close-modal-btn");

  const emailInput = document.querySelector("#login-modal #email");
  const passwordInput = document.querySelector("#login-modal #password");
  const signInBtn = document.getElementById("sign-in-btn");
  const togglePassword = document.getElementById("togglePassword");

  const loginLi = document.getElementById("login-link-li");
  const signupLi = document.getElementById("signup-link-li");
  const authSeparator = document.getElementById("auth-separator");
  const profileLi = document.getElementById("profile-link-li");
  const logoutLi = document.getElementById("logout-link-li");
  const logoutBtn = document.getElementById("logout-btn");

  const ERROR_CLASSES = ["border-red-500", "focus-within:ring-red-300"];
  const SUCCESS_CLASSES = ["border-green-500", "focus-within:ring-green-300"];
  const DEFAULT_CLASSES = ["border-gray-300", "focus-within:ring-blue-500"];

  // ----- Navbar Update Functions -----
  function updateNavForLoggedInUser() {
    if (loginLi) loginLi.classList.add("hidden");
    if (signupLi) signupLi.classList.add("hidden");
    if (authSeparator) authSeparator.classList.add("hidden");

    if (profileLi) profileLi.classList.remove("hidden");
    if (logoutLi) logoutLi.classList.remove("hidden");
  }

  function updateNavForLoggedOutUser() {
    if (loginLi) loginLi.classList.remove("hidden");
    if (signupLi) signupLi.classList.remove("hidden");
    if (authSeparator) authSeparator.classList.remove("hidden");

    if (profileLi) profileLi.classList.add("hidden");
    if (logoutLi) logoutLi.classList.add("hidden");
  }

  // ----- Modal Functions -----
  function openModal() {
    loginModal.classList.remove("opacity-0", "pointer-events-none");
    loginModal.querySelector("div:first-child").classList.remove("scale-95");
    loginModal.classList.add("opacity-100", "pointer-events-auto");
    loginModal.querySelector("div:first-child").classList.add("scale-100");
    emailInput.focus();
  }

  function closeModal() {
    loginModal.classList.add("opacity-0", "pointer-events-none");
    loginModal.querySelector("div:first-child").classList.add("scale-95");
    loginModal.classList.remove("opacity-100", "pointer-events-auto");
    loginModal.querySelector("div:first-child").classList.remove("scale-100");
  }

  openModalBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  closeModalBtn?.addEventListener("click", closeModal);

  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) closeModal();
  });

  // ----- Form Validation -----
  function setError(element, message) {
    const inputControl = element.closest(".input_control");
    const borderWrapper = inputControl.querySelector(".flex");
    const errorDisplay = inputControl.querySelector(".error-message");

    errorDisplay.innerText = message;
    borderWrapper.classList.remove(...SUCCESS_CLASSES, ...DEFAULT_CLASSES);
    borderWrapper.classList.add(...ERROR_CLASSES);
  }

  function setSuccess(element) {
    const inputControl = element.closest(".input_control");
    const borderWrapper = inputControl.querySelector(".flex");
    const errorDisplay = inputControl.querySelector(".error-message");

    errorDisplay.innerText = "";
    borderWrapper.classList.remove(...ERROR_CLASSES, ...DEFAULT_CLASSES);
    borderWrapper.classList.add(...SUCCESS_CLASSES);
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  }

  function validateInput() {
    let valid = true;

    if (!emailInput.value.trim()) {
      setError(emailInput, "Email is required");
      valid = false;
    } else if (!isValidEmail(emailInput.value)) {
      setError(emailInput, "Invalid email format");
      valid = false;
    } else {
      setSuccess(emailInput);
    }

    if (!passwordInput.value.trim()) {
      setError(passwordInput, "Password is required");
      valid = false;
    } else if (passwordInput.value.length < 6) {
      setError(passwordInput, "Min 6 characters");
      valid = false;
    } else {
      setSuccess(passwordInput);
    }

    return valid;
  }

  emailInput.addEventListener("input", validateInput);
  passwordInput.addEventListener("input", validateInput);

  togglePassword?.addEventListener("click", () => {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
    togglePassword.classList.toggle("fa-eye-slash");
  });

  // ----- SignIn -----
  signInBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateInput()) {
      Swal.fire({
        title: "Success!",
        text: "You have been signed in.",
        icon: "success",
      }).then(() => {
        // Change navbar links
        if (loginLi) loginLi.classList.add("hidden");
        if (signupLi) signupLi.classList.add("hidden");
        if (authSeparator) authSeparator.classList.add("hidden");

        if (logoutLi) logoutLi.classList.remove("hidden");

        closeModal();
      });
    } else {
      Swal.fire({
        title: "Login Failed",
        text: "Fix the errors",
        icon: "error",
      });
    }
  });


// Logout Functionality
  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          updateNavForLoggedOutUser();
        });
      }
    });
  });
});
