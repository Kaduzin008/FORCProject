const usuarios = [
  { email: "admin@site.com", senha: "admin123", tipo: "admin" },
  { email: "usuario@site.com", senha: "usuario123", tipo: "usuario" }
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value.trim();
  const mensagem = document.getElementById("mensagem");

  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    if (usuario.tipo === "admin") {
      mensagem.textContent = "Login realizado como ADMINISTRADOR.";
      mensagem.style.color = "gold";
    } else {
      mensagem.textContent = "Login realizado como USUÁRIO.";
      mensagem.style.color = "lightgreen";
    }
    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1000);
  } else {
    mensagem.textContent = "E-mail ou senha inválidos.";
    mensagem.style.color = "red";
  }
});