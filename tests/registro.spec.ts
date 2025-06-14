import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import TestData from '../data/testData.json';


let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  await registerPage.visitarPaginaRegistro();
});

test('TC-1 Verificación de elementos visuales en la página de registro', async ({ page }) => {
  await expect(registerPage.firstNameInput).toBeVisible();
  await expect(registerPage.lastNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();
});

test('TC-2 Verificar Boton de registro esta inhabilitado por defecto', async ({ page }) => {
  await expect(registerPage.registerButton).toBeDisabled();
});

test('TC-3 Verificar que el botón de registro se habilita al completar los campos obligatorios', async ({ page }) => {
  await registerPage.completarFormularioRegistro(TestData.usuarioValido);
  await expect(registerPage.registerButton).toBeEnabled();
});

test('TC-4 Verificar redireccionamiento a página de inicio de sesión al hacer clic en el botón de registro', async ({ page }) => {
  await registerPage.loginButton.click();
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('TC-5 Verificar Registro exitoso con datos válidos', async ({ page }) => {
  test.step('Completar el formulario de registro con datos válidos', async () => {
    const email = (TestData.usuarioValido.email.split('@')[0]) + Date.now().toString() + '@' + TestData.usuarioValido.email.split('@')[1];
    TestData.usuarioValido.email = email;
    await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido);
  }
  );
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verificar que un usuario no pueda registrarse con un correo electrónico ya existente', async ({ page }) => {
  const email = (TestData.usuarioValido.email.split('@')[0]) + Date.now().toString() + '@' + TestData.usuarioValido.email.split('@')[1];
  TestData.usuarioValido.email = email;
  await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido);
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await registerPage.visitarPaginaRegistro();
  await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido);
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});

