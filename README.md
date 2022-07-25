<p align="center">
  <a>
    <a href="https://she-speaks.herokuapp.com/"><img alt="Deploy on Heroku" src="https://img.shields.io/badge/deploy-heroku.com-purple">
    <a href="https://www.mongodb.com/cloud/atlas"><img alt="Database MongoDB" src="https://img.shields.io/badge/database-mongodb.com-blueviolet">
    <a href="https://nodejs.org/pt-br/"><img alt="Node version" src="https://img.shields.io/badge/node-v16.15.0-AA336A">
  </a>
</p>
<br>


# <div align = 'center'> SheSpeaks! </div>
<br>

<br>
<div align = "center">
<img src='./assets/she-speaks.png' width = 500 alt = 'logo she-speaks, palavra she em roxo, speaks em branco, dois balões de conversa em branco e roxo'>
</div>
<br>

> Projeto final para o bootcamp {reprograma} back-end. Plataforma para conexão entre professoras de idioma voluntárias e alunas de baixa renda.

<br>

---

#  📑 Sumário

- [Problema](#problema)
- [Solução](#solução)
- [Tema](#tema)
- [Introdução](#introdução)
- [Objetivo](#objetivo)
- [Arquitetura](#arquitetura)
- [Descrição](#descrição)
  - [Admin](#admin)
  - [Alunas](#alunas)
  - [Professoras](#professoras)
  - [Plataforma](#plataforma)
- [Tecnologias](#tecnologias)
  - [Dependências do Projeto](#dependências-do-projeto)
  - [Dependências do Desenvolvimento](#dependências-do-desenvolvimento)
- [Instalação](#instalação)
- [Teste](#teste)
- [Implementações Futuras](#implementações-futuras)
- [Autora](#autora)
- [Referências](#referências)

---

<div align ='justify'>


 ### Problema 

Atualmente conhecer outro idioma é muito importante, seja para conseguir se conectar com pessoas de outros países, seja para conseguir uma boa posição no mercado de trabalho. Ainda sim, o Brasil tem um número muito baixo de pessoas fluentes em um segundo idioma. 

---

 
 
##  Solução 

API que conecta professoras de idioma voluntárias e alunas de baixa renda, para que possam, num espaço seguro, aprender novos idiomas, seja por interesse profissional, seja por lazer. 

</div>

---

<div align ='justify'>

##  Tema 
SheSpeaks! é uma API que reúne professoras de idiomas que gostariam de se voluntariar e mulheres de baixa renda que tenham interesse em aprender um novo idioma. Essa API será um espaço seguro, onde aceitará apenas a participação de mulheres, tanto como alunas quanto como professoras. 
<br>

---

##  Introdução
Em 2018, profissionais que conheciam um idioma estrangeiro, podiam ter um ganho salarial de até 51,89% em relação aos que não sabiam outra língua. Cargos de hierarquia superior, podiam ter uma diferença ainda maior.  De acordo com uma pesquisa realizada pela British Council, em 2021, apenas 5% dos brasileiros falavam inglês e 1% era fluente. A porcentagem de brasileiros que falam outros idiomas é ainda menor. 
Cada vez mais, seja no mercado de trabalho ou na vida social, nota-se a importância de saber mais de um idioma. Num mundo globalizado, não ter recursos para desenvolver um segundo idioma e, pela falta de suporte governamental, não ter acesso viável ao aprendizado, é uma segregação idiomática e social. 
Embora escolas públicas ofereçam aulas de idiomas, sabe-se que elas são, muitas vezes, rasas e defasadas. Mas mesmo quando não são, um aluno de escola pública, aprendendo um idioma numa sala lotada, dificilmente terá o mesmo aproveitamento que um aluno de uma escola particular, ou de pessoas que têm condições financeiras para pagar cursos particulares. 
Em nosso país, viver é caro. Contas absurdas, alimentação, aluguel, filhos, família. A cada obstáculo, o objetivo de aprender um segundo idioma fica mais longe. Muitas vezes, entre manter sua família, ou “gastar” dinheiro aprendendo, o aprendizado fica em última opção. 
<br>

---

##  Objetivo
A SheSpeaks! tem como objetivo tornar possível que mulheres que não possam dispor de investimentos, possam aprender um novo idioma. Através dessa iniciativa, espera-se que elas possam alcançar melhores oportunidades no mercado de trabalho, ou apenas desenvolver um novo hobby, afinal, com tantas demandas, elas merecem ter um momento de descompressão e lazer. 
<br>

---

##  Arquitetura 

<div align = "justify">

Esse projeto foi construído utilizando a arquitetura MVC, acrônimo para Model-View-Controller ou, em português, Arquitetura Modelo-Visão-Controle. MVC é um padrão de arquitetura de software, voltado para o reuso de códigos e onde a separação dos mesmos ocorre em três camadas interconectadas. A apresentação dos dados é separada dos métodos que interagem com o banco de dados.

</div>

O servidor, criado dentro do repositório [She-Speaks](https://github.com/BrunaCelestino/She-Speaks), conta com a seguinte estrutura:


```bash
        \--📂 she-speaks
            | 
            |    .editorconfig
            |    .env.example
            |    .eslintrs.json
            |    .gitignore
            |    LICENSE
            |    package-lock.json
            |    package.json
            |    Procfile
            |    README.md
            |    server.js
            |
            |--📂assets
            \--📂src
                    |
                    |   app.js
                    |   swagger.json
                    |
                    📂---controllers
                    |
                    |-----📂admin
                    |     |
                    |     | adminController.js
                    |     
                    |
                    |-----📂platform
                    |     |
                    |     | classroomController.js
                    |     | friendsListController.js
                    |     | messagesController.js
                    |     | platformController.js
                    |     | postsController.js
                    |     
                    |
                    |-----📂student
                    |     |
                    |     | studentController.js
                    |     | studentPreRegisterController.js
                    |     
                    |
                    |-----📂teacher
                    |     |
                    |     | teacherController.js
                    |     | teacherPreRegisterController.js
                    |
                    |
                    📂---database
                    |
                    |   mongoConfig.js
                    |   
                    |
                    📂---helpers
                    |
                    |   validationHerlpers.js
                    |
                    |
                    📂---middlewares
                    |
                    |   auth.js
                    |
                    |
                    📂---models
                    |
                    |-----📂admin
                    |     |
                    |     | adminSchema.js
                    |     
                    |
                    |-----📂platform
                    |     |
                    |     | classroomSchema.js
                    |     | messagesSchema.js
                    |     | notificationSchema.js
                    |     | postsSchema.js
                    |     
                    |
                    |-----📂student
                    |     |
                    |     | studentSchema.js
                    |     | studentPreRegisterSchema.js
                    |     
                    |
                    |-----📂teacher
                    |     |
                    |     | teacherSchema.js
                    |     | teacherPreRegisterSchema.js
                    |
                    |
                    📂---routes
                    |
                    |   indexRoutes.js
                    |
                    |-----📂admin
                    |     |
                    |     | adminRoutes.js
                    |     
                    |
                    |-----📂platform
                    |     |
                    |     | classroomRoutes.js
                    |     | friendsListRoutes.js
                    |     | messagesRoutes.js
                    |     | platformRoutes.js
                    |     | postsRoutes.js
                    |     
                    |
                    |-----📂student
                    |     |
                    |     | studentRoutes.js
                    |     | studentPreRegisterRoutes.js
                    |     
                    |
                    |-----📂teacher
                    |     |
                    |     | teacherRoutes.js
                    |     | teacherPreRegisterRoutes.js
                    |
                    |
                    📂---test
                    |
                    |   admin.test.js
                    |   student.test.js
                    |   teacher.test.js

 ```


<details open>
<summary>Descrição dos Arquivos do Projeto</summary>

**🗄️ Camada inicial do projeto:** 

- 📄[.editorconfig](https://github.com/BrunaCelestino/She-Speaks/blob/main/.editorconfig) - Configurações Eslint;
- 📄[.env.example](https://github.com/BrunaCelestino/She-Speaks/blob/main/.env.example) - Exemplo de variáveis no arquivo .env;
- 📄[.eslintrs.json](https://github.com/BrunaCelestino/She-Speaks/blob/main/.eslintrc.json) - Especificações de instalação Eslint;
- 📄[.gitignore](https://github.com/BrunaCelestino/She-Speaks/blob/main/.gitignore) - Especifica quais arquivos não devem subir para o repositório;
- 📄[LICENSE](https://github.com/BrunaCelestino/She-Speaks/blob/main/LICENSE) - Licença MIT do projeto;
- 📄[package-lock.json](https://github.com/BrunaCelestino/She-Speaks/blob/main/package-lock.json) - Especifica a versão e suas dependências;
- 📄[package.json](https://github.com/BrunaCelestino/She-Speaks/blob/main/package.json) - Arquivo de configuração utilizado para estipular e configurar dependências;
- 📄[Procfile](https://github.com/BrunaCelestino/She-Speaks/blob/main/Procfile) - Configuração para rodar projeto no Heroku;
- 📄[README.md](https://github.com/BrunaCelestino/She-Speaks/blob/main/README.md) - Documentação do projeto;
- 📄[server.js](https://github.com/BrunaCelestino/She-Speaks/blob/main/server.js) - Servidor do projeto;
- 📂[assets](https://github.com/BrunaCelestino/She-Speaks/tree/main/assets) - pasta contendo mídias do README.md;
- 📂[src](https://github.com/BrunaCelestino/She-Speaks/tree/main/src) - pasta contendo a segunda camada do projeto. 

**🗄️ Segunda camada do projeto:**  

- 📄[app.js](https://github.com/BrunaCelestino/She-Speaks/blob/main/src/app.js) - Requere as dependências necessárias para o projeto e define o padrão de cada rota;
- 📄[swagger.json](https://github.com/BrunaCelestino/She-Speaks/blob/main/src/swagger.json) - Arquivo swagger, configuração para a rota /api-docs, que contém todas documentação do projeto;
- 📂[controllers](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers) - Lógicas do projeto: 

    - 📂[admin](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/admin) - Lógicas do usuário Admin:
      - 📄[adminController.js](https://github.com/BrunaCelestino/She-Speaks/blob/main/src/controllers/admin/adminController.js) - Funções responsáveis por criar, retornar, atualizar e deletar um perfil de Admin.

    - 📂[platform](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/platform) - Lógicas da Plataforma:
      - 📄[classroomController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/platform/classroomController.js) - Funções responsáveis pela criação, atualização e remoção de salas de aula. Além disso, é por onde o aluno consegue pesquisar salas, achar seu match, se inscrever em uma turma e sair de uma sala. 
      - 📄[friendsListController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/platform/friendsListController.js) - Funções responsáveis pela criação do pedido de amizade, aceitar ou recusar o pedido, ver sua lista de amizades e excluir um amigo;
      - 📄[messagesController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/platform/messagesController.js) - Funções responsáveis por enviar mensagem, ver todas as mensagens, ver apenas as lidas ou não lidas, ler uma mensagem e exclui-las;
      - 📄[platformController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/platform/platformController.js) - Funções responsáveis pelo login dos usuários e por ver a lista de todos os usuários, baseado no seu nível de permissão (Se admin ou dono do perfil, consegue ver o perfil completo, caso contrário, somente as informações públicas);
      - 📄[postsController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/platform/postsController.js) - Funções responsáveis por criar um novo post, atualiza-lo, deleta-lo, avaliar um post, favoritar e desfavoritar um post, fazer comentários, atualizar comentários e excluí-los.

    - 📂[student](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/student) - Lógicas do Aluno: 
      - 📄[studentController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/student/studentController.js) - Funções responsáveis pela criação, leitura, atualização e remoção de perfis de alunos;
      - 📄[studentPreRegisterController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/student/studentPreRegisterController.j) - Funções responsáveis pela criação, leitura, atualização e remoção dos pré-cadastros dos alunos.

    - 📂[teacher](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/teacher) - Lógicas do Professor: 
      - 📄[teacherController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/teacher/teacherController.js) - Funções responsáveis pela criação, leitura, atualização e remoção de perfis de professores;
      - 📄[teacherPreRegisterController.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/controllers/teacher/teacherPreRegisterController.j) - Funções responsáveis pela criação, leitura, atualização e remoção dos pré-cadastros dos 
      professores. 

         <br>
- 📂[database](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/database) - Configuração do banco de dados:  
    - 📄[mongoConfig.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/database/mongoConfig.js) - Esse arquivo é responsável pela conexão com o banco de dados.

       <br>
- 📂[helpers](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/helpers) - Funções auxiliares:
    - 📄[validationHerlpers.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/helpers/validationHerlpers.js) - Funções auxiliares responsáveis por checar e validar formato de CPF, username, senha e email , além de fazer o hasheamento de senhas. 

       <br>
- 📂[middlewares](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/middlewares) - Funções de autorização:
    - 📄[auth.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/middlewares/auth.js) - Funções responsáveis por checar e validar autorização e níveis de permissão, através dos tokens.

       <br>
- 📂[models](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models) - Schemas dos usuários e funcionalidades da plataforma: 
    - 📂[admin](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/admin) - Contém o schema Admin:
      - 📄[adminSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/admin/adminSchema.js) - Define o formato do cadastro do usuário Admin, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber.

    - 📂[platform](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/platform) - Contém os schemas das funcionalidades da Plataforma:
      - 📄[classroomSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/platform/classroomSchema.js) - Define o formato do cadastro de uma sala de aula, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber;
      - 📄[messagesSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/platform/messagesSchema.js) - Define o formato da criação de uma mensagem, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber;
      - 📄[notificationSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/platform/notificationSchema.js) Define o formato da criação de uma notificação, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber;
      - 📄[postsSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/platform/postsSchema.js) - Define o formato da criação de uma postagem, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber.

    - 📂[student](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/student)  - Contém os schemas das funcionalidades do Aluno:
      - 📄[studentSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/student/studentSchema.js) - Define o formato da criação de um perfil de aluno, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber;
      - 📄[studentPreRegisterSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/student/studentPreRegisterSchema.js) - Define o formato da criação de um pré-cadastro de aluno, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber.

    - 📂[teacher](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/teacher) - Contém os schemas das funcionalidades do Professor:
      - 📄[teacherSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/teacher/teacherSchema.js) - Define o formato da criação de um perfil de professor, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber;
      - 📄[teacherPreRegisterSchema.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/models/teacher/teacherPreRegisterSchema.js) - Define o formato da criação de um pré-cadastro de professor, informando as chaves utilizadas, se são obrigatórias, e que tipo de valor cada chave deve receber.

         <br>
- 📂[routes](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes) - Rotas do projeto:            
    - 📄[indexRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/indexRoutes.js) - Rota inicial do projeto.

    - 📂[admin](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/admin) - Rotas do admin:
      - 📄[adminRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/admin/adminRoutes.js) - Rotas para executar as lógicas do admin.

    - 📂[platform](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/platform) - Rotas da plataforma:        
      - 📄[classroomRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/platform/classroomRoutes.js) - Rotas para executar as lógicas das salas de aula;
      - 📄[friendsListRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/platform/friendsListRoutes.js) - Rotas para executar as lógicas da lista de amigos;
      - 📄[messagesRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/platform/messagesRoutes.js) - Rotas para executar as lógicas das mensagens;
      - 📄[platformRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/platform/platformRoutes.j) - Rotas para executar as lógicas da plataforma;
      - 📄[postsRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/platform/postsRoutes.js]) - Rotas para executar as lógicas das postagens.

    - 📂[student](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/student) - Rotas do aluno:
      - 📄[studentRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/student/studentRoutes.js) - Rotas para executar as lógicas dos alunos;
      - 📄[studentPreRegisterRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/student/studentPreRegisterRoutes.js) - Rotas para executar as lógicas dos pré-cadastros dos alunos.

    - 📂[teacher](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/teacher) - Rotas do professor:
      - 📄[teacherRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/teacher/teacherRoutes.js) - Rotas para executar as lógicas dos professores;
      - 📄[teacherPreRegisterRoutes.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/routes/teacher/teacherPreRegisterRoutes.js) - Rotas para executar as lógicas dos pré-cadastros dos professores.

         <br>
- 📂[test](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/test) - Testes unitários:
    - 📄[admin.test.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/test/admin.test.js) - Testes com as lógicas do admin;
    - 📄[student.test.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/test/student.test.js) - Testes com as lógicas do pré-cadastro e perfil do aluno;
    - 📄[teacher.test.js](https://github.com/BrunaCelestino/She-Speaks/tree/main/src/test/teacher.test.js) - Testes com as lógicas do pré-cadastro e perfil do professor.

</details>

---


 ##  Descrição
O uso da plataforma inicia-se no pré-registro, tanto da professora quanto da estudante. Ao cumprirem os requisitos pré estabelecidos, podem criar seu perfil e começar a utilizar a plataforma. Nelas, as professoras e alunas conseguem fazer postagens, mandar mensagens, adicionar amigas, sendo alertadas por meio de notificação, curtir, comentar e favoritar posts. Além disso, as professoras criam suas salas, com o limite de alunas que desejarem. As alunas podem pesquisar as salas, baseando-se em filtros. Caso queiram encontrar a melhor sala para elas, basta entrar na rota do “match”, e uma sala que atenda todos os requisitos que a aluna cadastrou em seu perfil, aparecerá para ela. Assim, a aluna pode se juntar a uma sala e, caso não tenha gostado, deixá-la  e se juntar a outras. 
A plataforma é dividida em quatro pontos principais: , Admin, Alunas, Professoras e Plataforma.
</div>
<br>

<div align ='center'>

### Admin

</div>

<div align = 'justify'>
Identificada pelo seu “role”, e verificada através de seu token, a admin pode acessar qualquer rota, ver conteúdos na íntegra, aprovar candidatas e deletar conteúdos. O cadastro do admin é simples. Conta com nome, e-mail, senha e papel. As rotas  específicas para o controle do cadastro do admin, contam com Criar, Atualizar, Deletar e Ler, baseado em critérios. 
<br>


<div align ='center'>

**Admin: Rotas/EndPoints**

</div>

<br>

🟢**GET**

|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/admin/find-all-admins|Rota que retorna todos os admins da plataforma|
|`GET`|https://she-speaks.herokuapp.com/admin/find-admin-by-email/?email=|Rota que encontra um admin por e-mail|
|`GET`|https://she-speaks.herokuapp.com/admin/find-admin/:id|Rota que encontra um admin por ID

🟡**POST**

|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/admin/new|Cria um novo admin|

🔵**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|https://she-speaks.herokuapp.com/admin/update/:id|Atualiza o admin|


🔴**DELETE**

|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/admin/delete/:id|Deleta um admin|
</div>

<div align ='center'>

### Alunas

</div>

<div align = 'justify'>
As alunas precisam preencher um pré-cadastro, dando suas informações pessoais. Se seu pré-cadastro for aprovado, pode criar seu perfil e acessar a plataforma. Suas rotas são divididas entre pré-registro e perfil:  

<br>
</div>
<div align ='center'>

**Alunas: Rotas/EndPoints** 

</div> 

1.  **Pré-cadastro**

<br>

🟡**POST**  

|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/student/new-pre-register|Cria o pré-cadastro|

🟢**GET**

|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/student/all-pre-registers|Retorna todos os pré-cadastros, rota para admin|
|`GET`|https://she-speaks.herokuapp.com/student/pre-register/:id|Retorna pré-cadastro por Id, ver status da candidatura

🔵**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|https://she-speaks.herokuapp.com/student/update-pre-register/:id|Atualiza pré-cadastro

🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/student/delete-pre-register/:id|Deleta pré-cadastro, rota para admin


2. **Perfil**  
<br>

🟡**POST**

|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/student/new-student/id|Cria perfil do aluno com o id do pré-cadastro

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/student/profile/home/:username| Retorna perfil por username, se dono do perfil ou admin, retorna perfil completo, senão, perfil público

🔵**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|https://she-speaks.herokuapp.com/student/private-profile/update/:id|Atualiza perfil, somente o dono do token tem acesso

🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/student/private-profile/delete/:id|Deleta perfil, somente dono ou admin tem acesso
</div>

<div align ='center'>

###  Professoras

</div>
<div align = 'justify'>
As professoras precisam preencher um pré-cadastro, dando suas informações pessoais. Se seu pré-cadastro for aprovado, pode criar seu perfil e acessar a plataforma. Suas rotas são divididas entre pré-registro e perfil:
<br>
<br>
<div align ='center'>

**Professoras: Rotas/EndPoints**  

</div>

1.  **Pré-cadastro** 
<br>

🟡**POST**

|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/teacher/new-pre-register|Cria o pré-cadastro

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/teacher/all-pre-registers|Retorna todos os pré-cadastros, rota para admin
|`GET`|https://she-speaks.herokuapp.com/teacher/pre-register/:id|Retorna  pré-cadastro por Id, ver status da candidatura

🔵**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|https://she-speaks.herokuapp.com/teacher/update-pre-register/:id|Atualiza pré-cadastro


🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/teacher/delete-pre-register/:id|Deleta  pré-cadastro, rota para admin


2. **Perfil**
<br>

🟡**POST**  
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/teacher/new-student/id|Cria perfil do aluno com o id do pré-cadastro

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/teacher/profile/home/:username|Retorna perfil por username, se dono do perfil ou admin,, retorna perfil completo, senão, perfil público

🔵**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|https://she-speaks.herokuapp.com/teacher/private-profile/update/:id|Atualiza perfil, somente o dono do token tem acesso

🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/teacher/private-profile/delete/:id|Deleta perfil, somente dono ou admin tem acesso
</div>
<br>
<div align ='center'>

### Plataforma

</div>
<div align = 'justify'>

A plataforma é subdividida em: Posts, Mensagens, Login, Lista de Amigos, Sala de Aula, Notificações e Outras Funções. É aqui que o usuário conseguirá utilizar as funcionalidades da plataforma. 
<br>
<div align ='center'>

**Plataforma: Rotas/EndPoints**

</div>

1. **Posts** 
<br>

🟡**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/platform/feed/post/new|Cria uma nova postagem

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/platform/feed/post/:id|Retorna um post por Id
|`GET`|https://she-speaks.herokuapp.com/platform/feed/post/my-posts|Retorna todos os posts de um usuário
|`GET`|https://she-speaks.herokuapp.com/platform/feed|Retorna o feed da plataforma

🔵**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|https://she-speaks.herokuapp.com/platform/feed/post/update/:id|Atualiza post, somente o dono do token tem acesso
|`PUT`|https://she-speaks.herokuapp.com/platform/feed/post/likes-dislikes/:id|Dar like ou deslike em um post


🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/platform/feed/post/delete/:id|Deleta post, somente dono ou admin tem acesso
|`DELETE`|https://she-speaks.herokuapp.com/platform/feed/post/remove-from-favorite/:id|Remove  post dos favoritos

🟣**PATCH**
|Método|Rota|Descrição|
|------|----|---------|
|`PATCH`|https://she-speaks.herokuapp.com/platform/feed/post/add-to-favorite/:id|Adicionar o post aos favoritos do usuário

2. **Comentários**
<br>

🟣**PATCH**
|Método|Rota|Descrição|
|------|----|---------|
|`PATCH`|https://she-speaks.herokuapp.com/platform/feed/post/new-comment/:id|Fazer um comentário em uma publicação
|`PATCH`|https://she-speaks.herokuapp.com/platform/feed/post/commented-post/:id/update-comment/:commentId|Atualizar um comentário feito numa publicação

🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/platform/feed/post/commented-post/:id/remove-comment/:commentId|Deleta comentário, feito em uma postagem

3. **Mensagens**
<br>

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/platform/message/my-messages/all|Retorna todas as mensagens do usuário
|`GET`|https://she-speaks.herokuapp.com/platform/message/my-messages/sent|Retorna todas as mensagens enviadas
|`GET`|https://she-speaks.herokuapp.com/platform/message/my-messages/received|Retorna todas as mensagens recebidas
|`GET`|https://she-speaks.herokuapp.com/platform/message/my-messages/received/unread|Retorna todas as mensagens não lidas
|`GET`|https://she-speaks.herokuapp.com/platform/message/my-messages/received/read|Retorna todas as mensagens lidas
|`GET`|https://she-speaks.herokuapp.com/platform/message/my-messages/:id|Retorna uma mensagem por Id

🟡**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/platform/message/send|Enviar (criar) uma mensagem

🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/platform/message/my-messages/delete/:id|Deletar uma mensagem, por Id (somente do inbox do usuário logado)


4. **Login**
<br>

🟡**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/platform/student/sign-in|Login da aluna
|`POST`|https://she-speaks.herokuapp.com/platform/teacher/sign-in|Login da professora
|`POST`|https://she-speaks.herokuapp.com/platform/admin/sign-in|Login da admin

5. **Lista de Amigas**
<br>

🟡**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/platform/friends-list/request/:id|Enviar solicitação de amizade

🟣**PATCH**
|Método|Rota|Descrição|
|------|----|---------|
|`PATCH`|https://she-speaks.herokuapp.com/platform/friends-list/update/:id|Aceitar ou recusar solicitação de amizade

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/platform/friends-list|Retorna lista de amigos do usuário

🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/platform/friends-list/delete/:id|Desfazer (deletar)  amizade


6. **Sala de aula**
<br>

🟡**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|https://she-speaks.herokuapp.com/platform/classroom/new|Criar uma sala de aula, somente para professoras

🔵**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|https://she-speaks.herokuapp.com/platform/classroom/update/:id|Atualizar  uma sala de aula, somente para professoras

🟣**PATCH**
|Método|Rota|Descrição|
|------|----|---------|
|`PATCH`|https://she-speaks.herokuapp.com/platform/classroom/enroll/:id|Entrar em uma sala de aula, somente para alunas

🔴**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|https://she-speaks.herokuapp.com/platform/classroom/delete/:id|Deletar uma sala de aula, somente para professoras
|`DELETE`|https://she-speaks.herokuapp.com/platform/classroom/leave/:id|Sair de uma sala de aula, somente para alunas

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/platform/classroom/all|Retorna todas as salas de aula
|`GET`|https://she-speaks.herokuapp.com/platform/classroom/:id|Retorna uma sala de aula por Id
|`GET`|https://she-speaks.herokuapp.com/platform/classroom/filter|Retorna salas de aula baseando-se nas pesquisas
|`GET`|https://she-speaks.herokuapp.com/platform/classroom/match|Retorna a sala ideal para aluna, baseando-se no perfil dela e da sala

7. **Notificações**
<br>

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/platform/notifications|Retorna as notificações de mensagem ou solicitação de amizade, do usuário, encontrado pelo token

8. **Outras Funções**
<br>

🟢**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|https://she-speaks.herokuapp.com/platform/all-profiles|Retorna todos os perfis públicos e, se admin, privados
</div>

---


## Automação de Testes

<div align = "justify">

Através das dependências Jest e SuperTest, foi possível realizar a automação dos testes das rotas dos usuários. Jest permite que que vários testes sejam realizados de uma única vez e SuperTest faz com que seja possível testar os métodos HTTP, acessando as rotas criadas e testando as funções atribuídas a elas. Com isso, foi possível assegurar que todas as rotas estejam funcionando. 

</div>

---

##  Tecnologias
<div align = "justify">

Para que fosse possível a execução desse projeto, foi necessária a utilização de dependências, descritas a seguir:


### Dependências de projeto:

- [Express](https://www.npmjs.com/package/express) - framework para aplicativo da web do Node.js;
- [Cors](https://www.npmjs.com/package/cors) - permite que um site acesse recursos de outro site mesmo estando em domínios diferentes;
- [Dotenv-safe](https://www.npmjs.com/package/dotenv-safes) - garante que todas as variáveis de ambiente necessárias sejam definidas depois de lidas no arquivo .env;
- [Mongoose](https://www.npmjs.com/package/mongoose) - mongoose é uma ferramenta de modelagem de objetos MongoDB projetada para funcionar em um ambiente assíncrono;
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - bcrypt é uma biblioteca que auxilia na encriptação (hasheamento) de senhas;
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Jsonwebtoken implementa Json web tokens;

### Dependências de desenvolvimento:

- [Nodemon](https://www.npmjs.com/package/nodemon) - ajuda no desenvolvimento de sistemas com o Node. js reiniciando automaticamente o servidor;
- [ESLint](https://www.npmjs.com/package/eslint) - ferramenta que identifica e reporta padrões encontrados no código;
- [Prettier](https://www.npmjs.com/package/prettier) - ferramenta que auxilia na formatação do código;
- [Jest](https://www.npmjs.com/package/jest) - Jest permite que a automação de testes seja realizada;
- [Supertest](https://www.npmjs.com/package/jest) - SuperTest facilita a testagem HTTP;
- [Swagger-UI-Express](https://www.npmjs.com/package/swagger-ui-express) - módulo que permite a documentação do projeto pelo swagger-ui, utilizando as informações obtidas no arquivo swagger.json.

</div>

<br>

--- 
##  Instalação: 

1. Entre na pasta onde você deseja clonar o repositório. Abra o **git** nela e digite: 

    ```bash
    $ git clone https://github.com/BrunaCelestino/She-Speaks.git
     ```

2. Digite a linha abaixo para entrar na pasta correta: 

    ```bash
    $ cd She-Speaks/
    ```
    
3. Escreva a seguinte linha para instalar as dependências utilizadas nesse projeto: 

   ```bash
    $ npm install
    ```
4. Inicie o servidor, utilizando a frase: 

   ```bash
    $ npm start
    ```   

<br>

--- 

<div align = "justify">

## Teste: 

Opção 1: 


 - Para testar a documentação Swagger UI, clique:   
 <a>
    <a href="https://she-speaks.herokuapp.com/api-docs/"><img alt="Swagger Ui" src="https://img.shields.io/badge/Swagger.UI_Doc:_SheSpeaks!-blueviolet"> 
</a>  

<br>

Opção 2:
- Importe a coleção para teste deste servidor clicando [aqui](https://www.getpostman.com/collections/8bf6ca3490ea774a08db)!
   - Copie o link acima e, no Postman, clique em **Import** -> **Link** (cole o link) -> **Continue** -> **Import**.

<br>

Opção 3:
- Forke diretamente para o seu Postman clicando: <br> [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/20977023-ad9e3e45-03b8-4b01-a72c-5c4586fb5b5a?action=collection%2Ffork&collection-url=entityId%3D20977023-ad9e3e45-03b8-4b01-a72c-5c4586fb5b5a%26entityType%3Dcollection%26workspaceId%3D51132679-d0d9-4dec-aba4-1ccdfced55c7)


</div>

<br>

---

## Implementações Futuras
<div align = 'justify'>
Futuramente, pretendo desenvolver o front-end para consumir essa API e também, implementar o sistema de pagamentos para pessoas com rendas mais altas. Assim, as professoras seriam pagas e a plataforma contaria com um número maior de usuárias.  

---


## Autora

---

##  Referências

[Quantos brasileiros falam inglês 2020?](https://www.vivendobauru.com.br/quantos-brasileiros-falam-ingles-2020/)

[Brasileiros fluentes em inglês conseguem ganhar mais que o dobro no início da carreira](https://g1.globo.com/jornal-nacional/noticia/2022/03/14/brasileiros-fluentes-em-ingles-conseguem-ganhar-mais-que-o-dobro-no-inicio-da-carreira.ghtml)

