# <div align = 'center'> SheSpeaks! </div>
<br>

<div align ='justify'>

## Tema 
SheSpeaks! é uma API que reúne professoras de idiomas que gostariam de se voluntariar e mulheres de baixa renda que tenham interesse em aprender um novo idioma. Essa API será um espaço seguro, onde aceitará apenas a participação de mulheres, tanto como alunas quanto como professoras. 
<br>

## Introdução
Em 2018, profissionais que conheciam um idioma estrangeiro, podiam ter um ganho salarial de até 51,89% em relação aos que não sabiam outra língua. Cargos de hierarquia superior, podiam ter uma diferença ainda maior.  De acordo com uma pesquisa realizada pela British Council, em 2021, apenas 5% dos brasileiros falavam inglês e 1% era fluente. A porcentagem de brasileiros que falam outros idiomas é ainda menor. 
Cada vez mais, seja no mercado de trabalho ou na vida social, nota-se a importância de saber mais de um idioma. Num mundo globalizado, não ter recursos para desenvolver um segundo idioma e, pela falta de suporte governamental, não ter acesso viável ao aprendizado, é uma segregação idiomática e social. 
Embora escolas públicas ofereçam aulas de idiomas, sabe-se que elas são, muitas vezes, rasas e defasadas. Mas mesmo quando não são, um aluno de escola pública, aprendendo um idioma numa sala lotada, dificilmente terá o mesmo aproveitamento que um aluno de uma escola particular, ou de pessoas que têm condições financeiras para pagar cursos particulares. 
Em nosso país, viver é caro. Contas absurdas, alimentação, aluguel, filhos, família. A cada obstáculo, o objetivo de aprender um segundo idioma fica mais longe. Muitas vezes, entre manter sua família, ou “gastar” dinheiro aprendendo, o aprendizado fica em última opção. 
<br>

## Objetivo
A SheSpeaks! tem como objetivo tornar possível que mulheres que não possam dispor de investimentos, possam aprender um novo idioma. Através dessa iniciativa, espera-se que elas possam alcançar melhores oportunidades no mercado de trabalho, ou apenas desenvolver um novo hobby, afinal, com tantas demandas, elas merecem ter um momento de descompressão e lazer. 
<br>

## Descrição
O uso da plataforma inicia-se no pré-registro, tanto da professora quanto da estudante. Ao cumprirem os requisitos pré estabelecidos, podem criar seu perfil e começar a utilizar a plataforma. Nelas, as professoras e alunas conseguem fazer postagens, mandar mensagens, adicionar amigas, sendo alertadas por meio de notificação, curtir, comentar e favoritar posts. Além disso, as professoras criam suas salas, com o limite de alunas que desejarem. As alunas podem pesquisar as salas, baseando-se em filtros. Caso queiram encontrar a melhor sala para elas, basta entrar na rota do “match”, e uma sala que atenda todos os requisitos que a aluna cadastrou em seu perfil, aparecerá para ela. Assim, a aluna pode se juntar a uma sala e, caso não tenha gostado, deixá-la  e se juntar a outras. 
A plataforma é dividida em quatro pontos principais: , Admin, Alunas, Professoras e Plataforma.
</div>
<br>

### <div align ='center'>Admin</div>

<div align = 'justify'>
Identificada pelo seu “role”, e verificada através de seu token, a admin pode acessar qualquer rota, ver conteúdos na íntegra, aprovar candidatas e deletar conteúdos. O cadastro do admin é simples. Conta com nome, e-mail, senha e papel. As rotas  específicas para o controle do cadastro do admin, contam com Criar, Atualizar, Deletar e Ler, baseado em critérios. 
<br>

**Admin: Rotas/EndPoints**
<br>

**GET**

|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/admin/find-all-admins|Rota que retorna todos os admins da plataforma|
|`GET`|localhost:PORT/admin/find-admin-by-email/?email=|Rota que encontra um admin por e-mail|
|`GET`|localhost:PORT/admin/find-admin/:id|Rota que encontra um admin por ID

**POST**

|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/admin/new|Cria um novo admin|

**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|localhost:PORT/admin/update/:id|Atualiza o admin|



**DELETE**

|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:PORT/admin/delete/:id|Deleta um admin|
</div>

### <div align ='center'>Alunas</div>
<div align = 'justify'>
As alunas precisam preencher um pré-cadastro, dando suas informações pessoais. Se seu pré-cadastro for aprovado, pode criar seu perfil e acessar a plataforma. Suas rotas são divididas entre pré-registro e perfil:

**Alunas: Rotas/EndPoints**  
1.  Pré-cadastro

<br>

**POST**  

|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/student/new-pre-register|Cria o pré-cadastro|

**GET**

|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/student/all-pre-registers|Retorna todos os pré-cadastros, rota para admin|
|`GET`|localhost:PORT/student/pre-register/:id|Retorna pré-cadastro por Id, ver status da candidatura

**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|localhost:8099/student/update-pre-register/:id|Atualiza pré-cadastro

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:8099/student/delete-pre-register/:id|Deleta pré-cadastro, rota para admin


2. Perfil  
<br>

**POST**

|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/student/new-student/id|Cria perfil do aluno com o id do pré-cadastro

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/student/profile/home/:username| Retorna perfil por username, se dono do perfil ou admin, retorna perfil completo, senão, perfil público

**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|localhost:PORT/student/private-profile/update/:id|Atualiza perfil, somente o dono do token tem acesso

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:PORT/student/private-profile/delete/:id|Deleta perfil, somente dono ou admin tem acesso
</div>

### <div align ='center'>Professoras</div>
<div align = 'justify'>
As professoras precisam preencher um pré-cadastro, dando suas informações pessoais. Se seu pré-cadastro for aprovado, pode criar seu perfil e acessar a plataforma. Suas rotas são divididas entre pré-registro e perfil:

**Professoras: Rotas/EndPoints**  
1.  Pré-cadastro 
<br>

**POST**

|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/teachert/new-pre-register|Cria o pré-cadastro

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/teacher/all-pre-registers|Retorna todos os pré-cadastros, rota para admin
|`GET`|localhost:PORT/teacher/pre-register/:id|Retorna  pré-cadastro por Id, ver status da candidatura

**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|localhost:8099/teacher/update-pre-register/:id|Atualiza pré-cadastro

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:8099/teacher/delete-pre-register/:id|Deleta  pré-cadastro, rota para admin


2. Perfil
<br>

**POST**  
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/teacher/new-student/id|Cria perfil do aluno com o id do pré-cadastro

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/teacher/profile/home/:username|Retorna perfil por username, se dono do perfil ou admin,, retorna perfil completo, senão, perfil público

**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|localhost:PORT/teacher/private-profile/update/:id|Atualiza perfil, somente o dono do token tem acesso

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:PORT/teacher/private-profile/delete/:id|Deleta perfil, somente dono ou admin tem acesso
</div>

### <div align ='center'>Plataforma</div>
<div align = 'justify'>

A plataforma é subdividida em: Posts, Mensagens, Login, Lista de Amigos, Sala de Aula, Notificações e Outras Funções. É aqui que o usuário conseguirá utilizar as funcionalidades da plataforma. 
**Plataforma: Rotas/EndPoints**
1. Posts 
<br>

**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/platform/feed/post/new|Cria uma nova postagem

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/platform/feed/post/:id|Retorna um post por Id
|`GET`|localhost:PORT/platform/feed/post/my-posts|Retorna todos os posts de um usuário

**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|localhost:PORT/platform/feed/post/update/:id|Atualiza post, somente o dono do token tem acesso
|`PUT`|localhost:PORT/platform/feed/post/likes-dislikes/:id|Dar like ou deslike em um post

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:PORT/platform/feed/post/delete/:id|Deleta post, somente dono ou admin tem acesso
|`DELETE`|localhost:PORT/platform/feed/post/remove-from-favorite/:id|Remove  post dos favoritos

**PATCH**
|Método|Rota|Descrição|
|------|----|---------|
|`PATCH`|localhost:PORT/platform/feed/post/add-to-favorite/:id|Adicionar o post aos favoritos do usuário

2. Comentários
<br>

**PATCH**
|Método|Rota|Descrição|
|------|----|---------|
|`PATCH`|localhost:PORT/platform/feed/post/new-comment/:id|Fazer um comentário em uma publicação
|`PATCH`|localhost:PORT/platform/feed/post/commented-post/:id/update-comment/:commentId|Atualizar um comentário feito numa publicação

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:PORT/platform/feed/post/commented-post/:id/remove-comment/:commentId|Deleta comentário, feito em uma postagem

3. Mensagens
<br>

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/platform/message/my-messages/all|Retorna todas as mensagens do usuário
|`GET`|localhost:PORT/platform/message/my-messages/sent|Retorna todas as mensagens enviadas
|`GET`|localhost:PORT/platform/message/my-messages/received|Retorna todas as mensagens recebidas
|`GET`|localhost:PORT/platform/message/my-messages/received/unread|Retorna todas as mensagens não lidas
|`GET`|localhost:PORT/platform/message/my-messages/received/read|Retorna todas as mensagens lidas
|`GET`|localhost:PORT/platform/message/my-messages/:id|Retorna uma mensagem por Id

**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/platform/message/send|Enviar (criar) uma mensagem

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:8099/platform/message/my-messages/delete/:id|Deletar uma mensagem, por Id (somente do inbox do usuário logado)


4. Login
<br>

**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/platform/student/sign-in|Login da aluna
|`POST`|localhost:PORT/platform/teacher/sign-in|Login da professora
|`POST`|localhost:PORT/platform/admin/sign-in|Login da admin

5. Lista de Amigas
<br>

**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/platform/friends-list/request/:id|Enviar solicitação de amizade

**PATCH**
|Método|Rota|Descrição|
|------|----|---------|
|`PATCH`|localhost:PORT/platform/friends-list/update/:id|Aceitar ou recusar solicitação de amizade

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/platform/friends-list|Retorna lista de amigos do usuário

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:PORT/platform/friends-list/delete/:id|Desfazer (deletar)  amizade


6. Sala de aula
<br>

**POST**
|Método|Rota|Descrição|
|------|----|---------|
|`POST`|localhost:PORT/platform/classroom/new|Criar uma sala de aula, somente para professoras

**PUT**
|Método|Rota|Descrição|
|------|----|---------|
|`PUT`|localhost:PORT/platform/classroom/update/:id|Atualizar  uma sala de aula, somente para professoras

**PATCH**
|Método|Rota|Descrição|
|------|----|---------|
|`PATCH`|localhost:PORT/platform/classroom/enroll/:id|Entrar em uma sala de aula, somente para alunas

**DELETE**
|Método|Rota|Descrição|
|------|----|---------|
|`DELETE`|localhost:PORT/platform/classroom/delete/:id|Deletar uma sala de aula, somente para professoras
|`DELETE`|localhost:PORT/platform/classroom/leave/:id|Sair de uma sala de aula, somente para alunas

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/platform/classroom/all|Retorna todas as salas de aula
|`GET`|localhost:PORT/platform/classroom/:id|Retorna uma sala de aula por Id
|`GET`|localhost:PORT/platform/classroom/filter|Retorna salas de aula baseando-se nas pesquisas
|`GET`|localhost:PORT/platform/classroom/match|Retorna a sala ideal para aluna, baseando-se no perfil dela e da sala

7. Notificações
<br>

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/platform/notifications|Retorna as notificações de mensagem ou solicitação de amizade, do usuário, encontrado pelo token

8. Outras Funções
<br>

**GET**
|Método|Rota|Descrição|
|------|----|---------|
|`GET`|localhost:PORT/platform/feed|Retorna o feed da plataforma
|`GET`|localhost:PORT/platform/all-profiles|Retorna todos os perfis públicos e, se admin, privados
</div>

## Implementações Futuras
<div align = 'justify'>
Futuramente, pretendo desenvolver o front-end para consumir essa API e também, implementar o sistema de pagamentos para pessoas com rendas mais altas. Assim, as professoras seriam pagas e a plataforma contaria com um número maior de usuárias. 

## Tecnologias Utilizadas
Dependências do Projeto: bcrypt, cors, dotenv-safe, express, jsonwebtoken, mongoose.
Dependências de Desenvolvimento: eslint, prettier, jest, nodemon, supertest.
</div>
https://she-speaks.herokuapp.com/