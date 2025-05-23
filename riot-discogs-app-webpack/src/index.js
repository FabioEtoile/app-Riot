import { component } from 'riot'
import App from './components/app.riot'


const appRoot = document.getElementById('app')
console.log("📦 Mounting app in:", appRoot)

component(App)(appRoot)
