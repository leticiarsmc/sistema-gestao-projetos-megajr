import { useState } from "react";
import "./Login.css";
import avatar from "./assets/avatar.png";
import mascote from "./assets/mascote.png";
import { login } from "./services/authService";

const Login = ({ onLogin }) => {
  const [esqueceuLogin, setEsqueceuLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(email, senha);

      console.log("LOGIN:", response);

      localStorage.setItem(
        "user",
        JSON.stringify(response)
      );

      if (onLogin) {
        onLogin(response.role);
      }
          } catch (error) {
      setErro(
        error.response?.data?.message ||
        "Erro ao realizar login."
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="titulo-principal">
        Bem-Vindo a <span className="destaque-laranja">Mega JR</span>
      </h1>

      <div className="login-card">
        <div className="avatar-container">
          <img src={avatar} alt="Avatar" className="avatar-img" />
        </div>

        <h2 className="mega-login-titulo">Mega Login</h2>

        {esqueceuLogin ? (
          <div className="modal-aviso">
            <div className="modal-header">
              <button
                type="button"
                className="btn-fechar"
                onClick={() => setEsqueceuLogin(false)}
              ></button>
            </div>

            <div className="modal-body">
              Entre em contato com os superiores que têm acesso ao sistema!
            </div>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              className="input-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              className="input-field"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />

            {erro && <p className="login-erro">{erro}</p>}

            <p className="esqueceu-texto">
              Esqueceu o{" "}
              <span
                className="link-laranja"
                onClick={() => setEsqueceuLogin(true)}
              >
                Login
              </span>
              ?
            </p>

            <button type="submit" className="btn-entrar">
              Entrar
            </button>
          </form>
        )}

        <img src={mascote} alt="Mascote" className="mascote-img" />
      </div>

      <footer className="login-footer">
        <p>Vamos trabalhar juntos.</p>

        <div className="icones-sociais">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      </footer>
    </div>
  );
};

export default Login;