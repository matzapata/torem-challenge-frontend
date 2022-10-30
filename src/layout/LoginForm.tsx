import Field from '../components/Home/Field';
import React, { useState } from 'react';
import Link from 'next/link';
import { LoginData } from '../types/login';
import { useAppDispatch } from '../redux/hooks';
import { useRouter } from "next/router";
import { validateEmail } from '../utils/validations';
import apiClient from '../utils/client';
import { LoadRemove, LoadStart } from '../components/Loading';
import { AxiosDefaultHeaders } from '../types/axiosHeaders';
import { setLoginData, setUserData } from '../redux/userSlice';
import { NotificationFailure } from '../components/Notifications';
import FormData from "form-data";

function LoginForm() {
  const initialValues: LoginData = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState<LoginData>(initialValues);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const data = new FormData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    /* 
      TODO: 
      1. Check login -> Login state checked at the React.useEffect above 
      2. Handle errors (if there is at least one) 
    */
    e.preventDefault();

    if (formData.password.length === 0 || formData.email.length === 0) return alert("Missing required inputs");
    else if (!validateEmail(formData.email)) return alert("Invalid email address");

    data.append('email', formData.email);
    data.append('password', formData.password);

    LoadStart();

    apiClient.post("/login", data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        // include authorization token as default headers so that all future requests with apiClient are authorized by default 
        apiClient.defaults.headers = {
          ...apiClient.defaults.headers,
          "Authorization": `Bearer ${res.data.token}`,
        } as AxiosDefaultHeaders;

        dispatch(setLoginData({ userId: res.data.userId, authToken: res.data.token }))

        router.push("/chat").then(() => LoadRemove())
      })
      .catch((e) => {
        LoadRemove();
        NotificationFailure(`Error: ${e.response.data.message}`)
      })

  };

  return (
    <form
      onSubmit={handleLogin}
      id="login"
      className="right-side d-flex flex-column justify-content-center w-50 bg-chatter-green h-100 py-5 fs-1 fw-bold"
    >
      <Field
        title="E-MAIL"
        type="email"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        onChange={handleInputChange}
      />

      <Field
        title="CONTRASEÑA"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
        onChange={handleInputChange}
      />

      <div className="content d-flex flex-column mb-5 d-flex align-items-start" data-aos="fade">
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
      </div>

      <div className="content text d-flex flex-row gap-2 mb-5 fs-6 fst-italic" data-aos="fade">
        <span>No tienes una cuenta?</span>
        <Link href="/register" className="text-chatter-blue">
          Registrate aquí
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
