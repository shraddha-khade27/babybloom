import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/")
  }

  return (
    <div className="login-page">
      <div className="login-card card">
        <div className="login-header">
          <h1 className="login-logo">BabyBloom</h1>
          <h2 className="login-subtitle">Admin Portal</h2>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              required
              placeholder="admin@babybloom.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
