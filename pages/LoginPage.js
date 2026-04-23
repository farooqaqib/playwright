import { BasePage } from "./BasePage";
import { currentEnv } from '../config/environments.js';


export class LoginPage extends BasePage {
    constructor(page) {
        super(page);   // ✅ MUST CALL PARENT
      
    }
  

     async openLoginPage(){
     await this.goto((currentEnv.uiURL))   
     }
  
    async login(user, pass) {
      //await this.page.fill('#username', 'aqib.f2000@gmail.com');
      await this.fill('#username', 'aqib.f2000@gmail.com');
      await this.fill('#passwd', '12345');
      await this.getByRole('button', { name: 'Login' }).click();
    }
  }