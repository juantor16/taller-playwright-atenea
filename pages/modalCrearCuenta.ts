import {Page, Locator} from '@playwright/test';

export class ModalCrearCuenta {
    readonly page: Page;
    readonly tipoDeCuentaDropdown: Locator;
    readonly montoInput: Locator;
    readonly botonCancelar: Locator;
    readonly botonCrearCuenta: Locator;
    
    

    constructor(page: Page) {
        this.page = page;
        this.tipoDeCuentaDropdown = page.getByRole('combobox', { name: 'Tipo de cuenta *' })
        this.montoInput = page.getByRole('spinbutton', { name: 'Monto inicial *' })
        this.botonCancelar = page.getByTestId('boton-cancelar-crear-cuenta')
        this.botonCrearCuenta = page.getByTestId('boton-crear-cuenta')
    }

    async seleccionarTipoDeCuenta(tipoDeCuenta: string) {
        await this.tipoDeCuentaDropdown.click();
        try {
            await this.page.getByRole('option', { name: tipoDeCuenta }).click();
        } catch (error) {
            console.log("No se encontro el elemnto");
        }
    }

    async completarMonto(monto: string) {
        await this.montoInput.fill(monto);
    }

}