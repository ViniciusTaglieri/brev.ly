# Brev.ly

Vamos desenvolver uma aplicação FullStack de encurtador de URL: o **Brev.ly**!

O objetivo é criar uma aplicação que permita o cadastro, listagem e remoção de links encurtados, geração de relatório dos acessos de cada link e também o redirecionamento correto do link encurtado para o link original.

Como esse é um projeto FullStack, você irá exercitar três áreas diferentes: Frontend, Backend e DevOps.

---

## Instruções

Estrutura, regras e requisitos do projeto

---

## Descrição e requisitos funcionais do Back-end

Nesse projeto back-end, será desenvolvido uma API para gerenciar o encurtamento de URL's.

### Funcionalidades e Regras

- Deve ser possível criar um link
  - Não deve ser possível criar um link com URL encurtada mal formatada
  - Não deve ser possível criar um link com URL encurtada já existente
- Deve ser possível deletar um link
- Deve ser possível obter a URL original por meio de uma URL encurtada
- Deve ser possível listar todas as URL's cadastradas
- Deve ser possível incrementar a quantidade de acessos de um link
- Deve ser possível exportar os links criados em um CSV
  - Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
  - Deve ser gerado um nome aleatório e único para o arquivo
  - Deve ser possível realizar a listagem de forma performática
  - O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

> ⚠️ Para esse desafio é esperado que você utilize o banco de dados Postgres.

Veja que não especificamos se nas funcionalidades de deletar ou incrementar acessos, deve ser utilizado um campo `id` ou URL encurtada para realizar tais operações. Essa é uma decisão que cabe a você, desenvolvedor, escolher. Não há certo ou errado aqui, mas o recomendado é manter um padrão, se escolher `id`, que seja em ambas. Consistência e padrão são importantes.

Lembrando que essa escolha irá impactar também no front-end.

### Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias.

```env
PORT=
DATABASE_URL=

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

### Scripts

Crie um script com a exata chave `db:migrate` responsável por executar as migrations do banco de dados.

### Docker

Para esse projeto back-end você deve construir um `Dockerfile`, seguindo as boas práticas, que deve ser responsável por gerar a imagem da aplicação.

### Boas Práticas

- Não se esqueça de habilitar o CORS na aplicação.

### Requisitos Não Funcionais

É obrigatório o uso de:

- TypeScript
- Fastify
- Drizzle
- Postgres

---

## Descrição e requisitos funcionais do Front-end

Nesse projeto front-end será desenvolvido uma aplicação React que, em conjunto com a API, permite o gerenciamento de URL's encurtadas.

### Funcionalidades e Regras

Assim como na API, temos as seguintes funcionalidades e regras:

- Deve ser possível criar um link
  - Não deve ser possível criar um link com encurtamento mal formatado
  - Não deve ser possível criar um link com encurtamento já existente
- Deve ser possível deletar um link
- Deve ser possível obter a URL original por meio do encurtamento
- Deve ser possível listar todas as URL's cadastradas
- Deve ser possível incrementar a quantidade de acessos de um link
- Deve ser possível baixar um CSV com o relatório dos links criados

Além disso, também temos algumas regras importantes específicas para o front-end:

- É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`;
- Siga o mais fielmente possível o layout do Figma;
- Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação);
- Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares.

### Páginas

Essa aplicação possui 3 páginas:

- A página raiz (`/`) que exibe o formulário de cadastro e a listagem dos links cadastrados;
- A página de redirecionamento (`/:url-encurtada`) que busca o valor dinâmico da URL e faz a pesquisa na API por aquela URL encurtada;
- A página de recurso não encontrado (qualquer página que não seguir o padrão acima) que é exibida caso o usuário digite o endereço errado ou a url encurtada informada não exista.

### Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias:

```env
VITE_FRONTEND_URL=
VITE_BACKEND_URL=
```

### Boas Práticas

- Comece o projeto pela aba `Style Guide` no Figma. Dessa forma, você prepara todo o seu tema, fontes e componentes e quando for criar as páginas vai ser bem mais tranquilo;
- Trabalhe com o desenvolvimento `mobile first`, principalmente se estiver utilizando ferramentas que se favorecem disso como Tailwind;
- Assim com a experiência do usuário é importante (UX), a sua experiência no desenvolvimento (DX) também é muito importante. Por isso, apesar de ser possível criar essa aplicação sem nenhuma biblioteca, recomendamos utilizar algumas bibliotecas que vão facilitar tanto o desenvolvimento inicial quanto a manutenção do código;

### Requisitos Não Funcionais

É obrigatório o uso de:

- Typescript
- React
- Vite sem framework

É flexível o uso de:

- TailwindCSS
- React Query
- React Hook Form
- Zod

### Quer ir além?

Se você quer se desafiar e explorar conceitos além do que foram propostos no desafio, temos algumas ideias em mente para te inspirar:

> ⚠️ A correção do seu desafio é apenas levando em conta as regras e funcionalidades obrigatórias mencionadas nas etapas anteriores. Portanto, envie o seu código para correção antes de implementar novas funcionalidades (ou crie uma nova `branch` com o seu código alterado)

- **SPA → SSR:** Em vez de criar sua aplicação utilizando o Vite, que tal explorar o poder da renderização do lado do servidor e utilizar o SSR? Você pode tanto trabalhar com o Next.js quanto simplesmente utilizar o React Router como um framework (Remix) em vez de um simples router.
- **Metadados:** Esse tipo de aplicação se favorece muito de alguns metadados, e um bem interessante que não exploramos foram os relacionados ao protocolo OpenGraph. Seria interessante que no formulário de cadastro, também fossem informados dados como descrição do link e imagem de preview que pudessem ser utilizadas nesses metadados.
- **Upload de imagem:** Utilizando o ponto anterior como base, o upload de imagens para o protocolo OpenGraph pode ser bem interessante.
- **Interface otimista:** Um ponto que pode trazer uma boa experiência nesse tipo de aplicação é trabalhar com interface otimista. Já exibir o link na interface como se tivesse ocorrido com sucesso o cadastro na API e, caso dê algum erro, fazer o `rollback`.

---

## Entrega

Esse desafio deve ser entregue na nossa plataforma. Para o envio, é necessário criar um repositório no GitHub e enviar o link do seu repositório na nossa plataforma com a sua resolução!

Porém, é importante **seguir alguns padrões** para que possamos **corrigir** corretamente o seu projeto:

- O repositório deve estar público;
- O repositório deve conter a resolução dos três desafios;
- O repositório deve ter duas subpastas
  - `web` vai conter a resolução completa do desafio Front-end;
  - `server` vai conter a resolução completa dos desafios Back-end e DevOps.
- O repositório deve conter o código referente as regras e funcionalidades obrigatórias. Caso queira se desafiar com funcionalidades extras (ex.: React SSR em vez de SPA), crie o código com essas alterações em uma nova `branch`, preservando o código original do desafio.

Após concluir o desafio, se você se sentir confortável, o que acha de postar no LinkedIn contando como foi a sua experiência compartilhando o seu projeto e o seu aprendizado? É uma excelente forma de demonstrar seus conhecimentos e atrair novas oportunidades!

E pode marcar a gente, viu? Vai ser incrível acompanhar toda a sua evolução!

---

## Em caso de dúvidas

Esse projeto tem como forte inspiração as funcionalidades e tecnologias vistas no projeto `Upload Widget`. Então caso tenha dúvidas, vale a pena revisitar as aulas (frontend e backend) ou o código do projeto (frontend e backend) pois podem te ajudar bastante na resolução desse desafio.

## Considerações finais

Lembre-se que o intuito de um desafio é te impulsionar, por isso, dependendo do desafio, pode ser que você precise ir além do que foi discutido em sala de aula. Mas isso não é algo ruim: ter autonomia para buscar informações extras é uma habilidade muito valiosa e vai ser ótimo pra você treinar ela aqui com a gente!

E lembre-se: **tenha calma!** Enfrentar desafios faz parte do seu processo de aprendizado!

Se precisar de alguma orientação ou suporte, estamos aqui com você! Bons estudos e boa prática!

---

## Tarefas

Use este checklist para ajudar a organizar a sua entrega

### [Back-end]

- [ ] Deve ser possível criar um link
- [ ] Não deve ser possível criar um link com URL encurtada mal formatada
- [ ] Não deve ser possível criar um link com URL encurtada já existente
- [ ] Deve ser possível deletar um link
- [ ] Deve ser possível obter a URL original por meio de uma URL encurtada
- [ ] Deve ser possível listar todas as URL's cadastradas
- [ ] Deve ser possível incrementar a quantidade de acessos de um link
- [ ] Deve ser possível exportar os links criados em um CSV
- [ ] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
- [ ] Deve ser gerado um nome aleatório e único para o arquivo
- [ ] Deve ser possível realizar a listagem de forma performática
- [ ] O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

### [Front-end]

- [ ] Deve ser possível criar um link
- [ ] Não deve ser possível criar um link com encurtamento mal formatado
- [ ] Não deve ser possível criar um link com encurtamento já existente
- [ ] Deve ser possível deletar um link
- [ ] Deve ser possível obter a URL original por meio do encurtamento
- [ ] Deve ser possível listar todas as URL's cadastradas
- [ ] Deve ser possível incrementar a quantidade de acessos de um link
- [ ] Deve ser possível baixar um CSV com o relatório dos links criados
- [ ] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`;
- [ ] Siga o mais fielmente possível o layout do Figma;
- [ ] Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação);
- [ ] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares.
