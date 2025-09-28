document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  // 🔄 Toggle between Login & Signup
  showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // 🟢 Handle Signup
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = signupForm.querySelector("input[type='text']").value;
    const email = signupForm.querySelector("input[type='email']").value;
    const password = signupForm.querySelector("input[type='password']").value;

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  });

  // 🔵 Handle Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='text']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.success) {
        window.location.href = "phoenix.html"; // Redirect on success
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  });
});
