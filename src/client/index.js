import './styles/main.scss'
import './styles/button.scss'
import './styles/cards.scss'
import './styles/header.scss'
import './styles/textfields.scss'
import { performAction } from './js/app'

document.getElementById('generate').addEventListener('click', performAction);

export { performAction }