import {Page, Locator} from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly dashboardTitle: Locator;
    readonly botonDeAgregarCuenta: Locator;
    readonly botonEnviarDinero: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardTitle = page.getByTestId('titulo-dashboard')
        this.botonDeAgregarCuenta = page.getByTestId('tarjeta-agregar-cuenta')
        this.botonEnviarDinero = page.getByTestId('boton-enviar')
    }

    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/dashboard');
        await this.page.waitForLoadState('networkidle');
    }

    async visitarPaginaDashboard() {
        await this.page.goto('http://localhost:3000/dashboard');
        await this.page.waitForLoadState('networkidle');
    }

}