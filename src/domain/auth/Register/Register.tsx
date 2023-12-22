import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { useAuthentication } from "hooks";

import styles from "./Register.module.css";

export const Register = () => {
  const { register, handleSubmit, watch } = useForm();

  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    await createUser(data);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            required
            {...register("displayName")}
            placeholder="Nome do Usuário"
          />
        </label>
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
            {...register("password")}
            required
            placeholder="Insira sua Senha"
          />
        </label>
        <label>
          <span>Confirmação de Senha:</span>
          <input
            type="password"
            required
            {...register("confirmPassword")}
            placeholder="Confirme a sua senha"
          />
        </label>
        {!loading && (
          <button className="btn" type="submit">
            Cadastrar
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
