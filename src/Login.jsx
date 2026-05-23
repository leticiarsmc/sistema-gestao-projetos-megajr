import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1>BEM-VINDO</h1>
        <div className="logo-placeholder">
          <span>M</span>
        </div>
      </div>

      <div className="login-right">
        <h2>FAÇA LOGIN</h2>
        <form>
          <div className="input-group">
            <input type="text" />
          </div>

          <div className="input-group">
            <input type="password" />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> LEMBRAR
            </label>
            <a href="#">ESQUECI A SENHA</a>
          </div>

          <button type="submit" className="login-btn">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
