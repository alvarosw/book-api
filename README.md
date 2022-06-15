# softdesign
## Technical Test by SoftDesign

### Pacotes
Instale as dependências
```bash
  npm i
```


### Banco de dados
Abra o arquivo database.ts e coloque as credenciais para seu banco de dados (...sem env por enquanto)

Esse projeto não conta com migrations, então rode o seguinte comando sql no seu banco para criar as tabelas do projeto:

```sql
drop table if exists users;

drop table if exists livros;

create table users (
  id serial,
  nome varchar(255),
  email varchar(255) not null,
  password varchar(255) not null,
  primary key (id)
);

create table livros (
  id serial,
  titulo varchar(255) not null,
  autor varchar(255) not null,
  sinopse varchar(255),
  user_id int,
  primary key (id),
  constraint fk_user
  	foreign key (user_id)
  		references users(id)
);
```


### Rodando o projeto
No seu terminal, digite o seguinte comando:
```bash
npm run serve
```


### Rodando os testes
Ainda no terminal, digite o comando:
```bash
npm run test
```

