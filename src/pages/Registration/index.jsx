import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import {
	fetchRegister,
	fetchUserData,
	selectIsAuth,
} from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: "Засранец",
			email: "zasranec@gmail.com",
			password: "1234",
		},
		mode: "onChange",
	});
	async function onSubmit(values) {
		const data = await dispatch(fetchRegister(values));
		if (!data.payload) {
			return alert("Не удалось зарегестрироваться");
		}
		if ("token" in data.payload) {
			window.localStorage.setItem("token", data.payload.token);
		}
	}

	if (isAuth) {
		return <Navigate to={"/"} />;
	}
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					fullWidth
					{...register("fullName", { required: "Укажите имя" })}
					className={styles.field}
					label="Полное имя"
				/>
				<TextField
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					fullWidth
					type="email"
					{...register("email", { required: "Укажите почту" })}
					className={styles.field}
					label="E-Mail"
				/>
				<TextField
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					fullWidth
					type="password"
					{...register("password", { required: "Укажите пароль" })}
					className={styles.field}
					label="Пароль"
				/>
				<Button
					type="submit"
					disabled={!isValid}
					size="large"
					variant="contained"
					fullWidth
				>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};
