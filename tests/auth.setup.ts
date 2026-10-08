import {test as setup, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

setup('Authentication as admin', async ({ page }) => {
   
    console.log('Admin authentication initiated.')

    //Iniciar sesión como administrador
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
    
    // Verificar que el inicio de sesión fue exitoso
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    //Guardar la sesión para su uso en otras pruebas
    await page.context().storageState({ path: '.auth/admin.json' });

    console.log('Admin authentication setup completed and session saved.');
    
});