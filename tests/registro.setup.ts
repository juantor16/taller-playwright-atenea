import { test as setup, expect } from '@playwright/test';
import { BackendUtils } from '../utils/backendUtils';
import TestData from '../data/testData.json';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let modalCrearCuenta: ModalCrearCuenta;

const usuarioEnviaAuthFile = 'playwright/.auth/usuarioEnvia.json';
const usuarioRecibeAuthFile = 'playwright/.auth/usuarioRecibe.json';

setup.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    modalCrearCuenta = new ModalCrearCuenta(page);
    await loginPage.visitarPaginaLogin();
})

setup('Generar usuario que envía dinero', async ({ page, request }) => {
    const nuevoUsuario = await BackendUtils.crearUsuarioPorAPI(request, TestData.usuarioValido);
    await loginPage.completarYHacerClickBotonLogin(nuevoUsuario);
    await dashboardPage.botonDeAgregarCuenta.click();
    await modalCrearCuenta.seleccionarTipoDeCuenta('Débito');
    await modalCrearCuenta.completarMonto('1000');
    await modalCrearCuenta.botonCrearCuenta.click();
    await expect(page.getByText('Cuenta creada exitosamente')).toBeVisible();
    await page.context().storageState({ path: usuarioEnviaAuthFile });
})


setup('Crear, Loguearse y agregar cuenta usuario Valido', async ({ page, request }) => {
    const nuevoUsuario = await BackendUtils.crearUsuarioPorAPI(request, TestData.usuarioValido, false);
    await loginPage.completarYHacerClickBotonLogin(nuevoUsuario);
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await dashboardPage.botonDeAgregarCuenta.click();
    await modalCrearCuenta.seleccionarTipoDeCuenta('Débito');
    await modalCrearCuenta.completarMonto('1000');
    await modalCrearCuenta.botonCrearCuenta.click();
    await expect(page.getByText('Cuenta creada exitosamente')).toBeVisible();
    await page.context().storageState({ path: usuarioRecibeAuthFile })
})