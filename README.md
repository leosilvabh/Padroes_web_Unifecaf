# 💈 Barbearia Sport Hair – Site Responsivo com Agendamento Online

Este projeto consiste no desenvolvimento de um site responsivo para a **Barbearia Sport Hair**, com foco em experiência do usuário, integração com API externa, acessibilidade e boas práticas de desenvolvimento web.

O site foi desenvolvido com auxilido de IA utilizando **HTML5**, **CSS3** e **JavaScript**, com publicação gratuita via **GitHub Pages**.

---

## 🚀 Tecnologias Utilizadas

- **HTML5** – Estrutura semântica da página  
- **CSS3** – Estilização, layout e responsividade  
- **JavaScript (ES6)** – Interatividade e integração com API  
- **API ViaCEP** – Consulta automática de endereço a partir do CEP  
- **Git e GitHub** – Versionamento e controle do projeto  
- **GitHub Pages** – Hospedagem do site  

---

## 📌 Funcionalidades do Projeto

### ✔️ 1. Seção Inicial (Seção de Destaque)
- Apresentação da Barbearia Sport Hair  
- Logo em destaque  
- Saudação dinâmica baseada no horário do usuário  
- Botões rápidos para navegação  

---

### ✔️ 2. Seção de Serviços
Lista dos principais serviços oferecidos:

- Corte Masculino  
- Coloração  
- Manicure & Pedicure  

Os serviços são exibidos em **cards responsivos**, com animações e layout adaptável.

---

### ✔️ 3. Formulário de Agendamento Completo

O formulário coleta:

- Nome completo  
- Telefone (com máscara automática)  
- CEP  
- Cidade (preenchida automaticamente pela API)  
- Estado (preenchido automaticamente pela API)  
- Serviço desejado  
- Data e horário  
- Observações  

Também inclui:

- Mensagens de erro personalizadas  
- Validação em tempo real  
- Consulta de CEP ao **sair do input** ou ao **pressionar ENTER**  

---

### ✔️ 4. API ViaCEP integrada

Ao digitar o CEP, o sistema:

1. Chama a API ViaCEP via `fetch()`  
2. Valida o CEP  
3. Preenche os campos de **cidade** e **estado**  
4. Exibe erros caso o CEP seja inválido ou não encontrado  

Isso agiliza o preenchimento e evita erros no formulário.

---

### ✔️ 5. Página de Contato

Inclui:

- Endereço  
- Telefone  
- Botão para WhatsApp  
- Mapa interativo via Google Maps (iframe responsivo)  

---

## 🌐 Publicação

O site esta hospedado no GIT HUB, acesse aqui: 
https://leosilvabh.github.io/Padroes_web_Unifecaf/

