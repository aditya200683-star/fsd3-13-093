#   project setup
1. create two folder frontend and backend 
2. go to frontend `cd frontend`
    - type `npm create vite@latest`
    - press`y` if asked to install 
    - enter`.` in projrct name
    - select `React` as framework from arrow key 
    - select `javascript` from varient by arrow key
    - select `eslint` by arrow key 
    - select `yes`and press enter
3. setup tailwind in react project
  - install tailwind by  npm install tailwindcss @tailwindcss/vite
  - update vite config.js with 'tailwindcss()'
  - add '@import "tailwindcss"'
- In React styles can be added into htmls by classs Name because class is a Predefined Keyword in React

# Component 
- when js fuction return directly html content , called component 
* Rule of component  
   - start with capital letter
   - it must return html 
   - must be close at the calling time `</>`