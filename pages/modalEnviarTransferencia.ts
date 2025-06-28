import {Page, Locator} from '@playwright/test';

export class ModalEnviarTransferencia {
    readonly page: Page;
    readonly emailDestinatarioInput: Locator;
    readonly cuentaOrigenDropdown: Locator;
    readonly montoInput: Locator;
    readonly botonCancelar: Locator;
    readonly botonEnviar: Locator;
    readonly cuentaOrigenOption: Locator;
    
    

    constructor(page: Page) {
        this.page = page;
        this.emailDestinatarioInput = page.getByRole('textbox', { name: 'Email del destinatario *' })
        this.cuentaOrigenDropdown = page.getByRole('combobox', { name: 'Cuenta origen *' })
        this.montoInput = page.getByRole('spinbutton', { name: 'Monto a enviar *' })
        this.botonCancelar = page.getByRole('button', { name: 'Cancelar' })
        this.botonEnviar = page.getByRole('button', { name: 'Enviar' })
        this.cuentaOrigenOption = page.getByRole('option', { name: '••••' })
    }

    async completarYHacerClickBotonEnviar(emailDestinatario: string, monto: string) {
        await this.emailDestinatarioInput.fill(emailDestinatario);
        await this.cuentaOrigenDropdown.click();
        await this.cuentaOrigenOption.click();
        await this.montoInput.fill(monto);
        await this.botonEnviar.click();
    }
}