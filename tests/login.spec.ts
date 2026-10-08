import {expect, test} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { MenuOptions, SidePanel } from '../components/SidePanel';
    
//page = fixture

test('login orangehrm', async ({ page }) => {
/*
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
 */   

    await page.goto('/web/index.php/dashboard/index');

    const Sidepanel = new SidePanel(page);

    await Sidepanel.searchInput.fill(MenuOptions.Admin);
    await Sidepanel.clickMenuOption(MenuOptions.Admin);
    await expect(page.getByRole('link', { name: MenuOptions.Admin })).toBeVisible();

});

test('Incorrect login orangehrm', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
   
    await expect(page.locator('xpath=//p[@class="oxd-text oxd-text--p oxd-alert-content-text"]')).toBeVisible();
});

test('login employee orangehrm', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const Sidepanel = new SidePanel(page);

    await loginPage.doLoginAsEmployee();
    await expect(page.getByRole('link', { name: MenuOptions.Admin })).not.toBeVisible();

});