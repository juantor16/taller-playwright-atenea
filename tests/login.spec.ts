import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import TestData from '../data/testData.json';
import { DashboardPage } from '../pages/dashboardPage';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  await loginPage.visitarPaginaLogin();
});

test('TC-7 Verificar inicio de sesión exitoso con credenciales válidas', async ({ page }) => {
  await loginPage.completarYHacerClickBotonLogin(TestData.usuarioValido);
  await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
  await expect(dashboardPage.dashboardTitle).toBeVisible();
});
