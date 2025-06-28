import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';
import { ModalEnviarTransferencia } from '../pages/modalEnviarTransferencia';
import TestData from '../data/testData.json';

let dashboardPage: DashboardPage;
let modalEnviarTransferencia: ModalEnviarTransferencia;

const testUsuarioEnvia = test.extend({
    storageState: require.resolve('../playwright/.auth/usuarioEnvia.json')
})

const testUsuarioRecibe = test.extend({
    storageState: require.resolve('../playwright/.auth/usuarioRecibe.json')
})

test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    modalEnviarTransferencia = new ModalEnviarTransferencia(page);
    await dashboardPage.visitarPaginaDashboard();
})

testUsuarioEnvia('TC-12 Verificar transacción exitosa', async ({ page }) => {
    testUsuarioEnvia.info().annotations.push({ 
        type: 'Informacion de usuario que recibe', 
        description: TestData.usuarioValido.email 
    });
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await dashboardPage.botonEnviarDinero.click();
    await modalEnviarTransferencia.completarYHacerClickBotonEnviar(TestData.usuarioValido.email, '100');
    await expect(page.getByText('Transferencia enviada a ' + TestData.usuarioValido.email)).toBeVisible();
})

testUsuarioRecibe('TC-13 Verificar que usuario reciba la transferencia', async ({ page }) => {
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await expect(page.getByText('Transferencia de email').first()).toBeVisible();

})
