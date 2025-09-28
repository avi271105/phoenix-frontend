document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  // 🔗 Backend API base URL (Render pe deployed backend ka URL daalo)
  const API_BASE = "https://phoenix-backend-1.onrender.com";

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
      const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      alert(result.message);

      if (result.success) {
        // redirect to login page after signup
        signupForm.reset();
        signupForm.style.display = "none";
        loginForm.style.display = "block";
      }
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
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Login successful! Redirecting...");
        window.location.href = "phoenix.html"; // redirect to phoenix page
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  });
});
