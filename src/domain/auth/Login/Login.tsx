import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "hooks";

import styles from "./Login.module.css";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const onSubmit = async (data) => {
    await login(data);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            required
            {...register("email")}
            placeholder="e-mail do Usuário"
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            required
            {...register("password")}
            placeholder="Insira sua Senha"
          />
        </label>
        {!loading && (
          <button className="btn" type="submit">
            Entrar
          </button>
        )}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
