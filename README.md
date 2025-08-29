# Projetos Condor — App de Busca de Projetos (Mobile + API + DB)

Aplicativo Android em **React Native** para **consulta rápida** a projetos mecânicos e elétricos da empresa Máquinas Condor S.A., integrado a uma **API REST em Node.js** e **MySQL** para armazenamento dos metadados (código, título, tipo, ano, responsável e caminho do arquivo digitalizado).

> Este repositório base contém três partes: **Database** (script SQL), **API** (Node.js/Express) e **App** (React Native). É simples, didático e funcional para ser evoluído em aula.

---

## Estrutura do projeto

```
/database
  └── create_database.sql      # Cria o BD `projetos_condor` e a tabela `projeto`
/api
  └── server.js                # API REST com rotas de consulta
/react_native_app
  └── App.js                   # App React Native com busca por código e listagem
```

---

## Pré‑requisitos

- **Node.js** >= 16 e **npm**
- **MySQL Server** (ou MariaDB compatível)
- **Android Studio** (SDK + Emulador) e **JDK**
- **React Native CLI** configurado (`npx react-native --version`)

---

##  Banco de Dados (MySQL)

1) Abra seu cliente (MySQL Workbench, DBeaver ou terminal) e execute o script:

```sql
-- arquivo: database/create_database.sql
CREATE DATABASE IF NOT EXISTS projetos_condor;
USE projetos_condor;

CREATE TABLE IF NOT EXISTS projeto (
    CodigoProjeto INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(150),
    Tipo VARCHAR(50), -- 'Mecânico' ou 'Elétrico'
    Ano INT,
    Responsavel VARCHAR(100),
    CaminhoArquivo VARCHAR(255) -- Caminho local ou URL do arquivo digitalizado
);
```

2) **(Opcional) Dados de exemplo**

```sql
INSERT INTO projeto (Titulo, Tipo, Ano, Responsavel, CaminhoArquivo) VALUES
('Transportador TC-120 Revisão', 'Mecânico', 2008, 'Eng. Marcos Lima', 'Z:/Projetos/2008/TC120/idw/TC120.idw'),
('Painel CCM Linha 3', 'Elétrico', 2012, 'Eng. Paula Souza', 'Z:/Projetos/2012/CCM_L3/pdf/CCM_L3.pdf'),
('Redimensionamento Mancal 450mm', 'Mecânico', 2016, 'Tec. Renato Alves', 'Z:/Projetos/2016/MANCAL_450/dwg/MANCAL_450.dwg');
```

---

## API (Node.js + Express + MySQL)

1) Entre na pasta `api/` e instale as dependências:

```bash
cd api
npm init -y
npm install express mysql cors
```

2) **Edite as credenciais** de banco em `server.js` se necessário:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projetos_condor'
});
```

3) Inicie a API:

```bash
node server.js
# A API sobe em http://localhost:3000
```

### Endpoints disponíveis

- `GET /projetos` — lista todos os projetos
- `GET /projetos/:codigo` — busca por **CodigoProjeto**

**Testes rápidos (curl):**

```bash
curl http://localhost:3000/projetos
curl http://localhost:3000/projetos/1
```

---

## App (React Native — Android)

1) Crie um projeto RN e substitua o `App.js`:

```bash
npx react-native init ProjetosCondorApp
cd ProjetosCondorApp
# substitua o conteúdo de App.js pelo arquivo em react_native_app/App.js
```

2) Garanta que o app consegue falar com a API:

- Em **emulador Android Studio**, `http://10.0.2.2:3000` é o loopback do host.
- Em **dispositivo físico via USB**, rode:
  ```bash
  adb reverse tcp:3000 tcp:3000
  ```
  e mantenha a URL como `http://localhost:3000` no `App.js`.
- Sem `adb reverse`, use o **IP da sua máquina** (ex.: `http://192.168.0.10:3000`).

> No `App.js` existe uma URL base simples. Ajuste para `10.0.2.2` se usar emulador.

3) Rode o app:

```bash
npx react-native run-android
```

---

##  Roteiro de teste sugerido

1. Insira 2–3 registros de projeto no MySQL (script acima).  
2. Suba a API (`node server.js`) e verifique `GET /projetos`.  
3. Abra o app:
   - Deve listar os projetos (Tela Inicial).
   - Busque por um código existente (Tela Resultado).
   - Busque por um código inexistente (mensagem “não encontrado”).

---

##  Evoluções recomendadas

- Filtros por **Tipo** e **Ano** (query params na API, campos no app).  
- Campo **Cliente** e **Área/Planta** no BD.  
- **Upload** e armazenamento dos arquivos digitalizados (S3/Drive/servidor interno).  
- **Autenticação** (JWT) e trilhas de auditoria.  
- Paginação e ordenação no endpoint `/projetos`.

---

##  Ajuda / Troubleshooting

- **“ECONNREFUSED”** ao chamar a API: confirme porta 3000 e o host correto (`10.0.2.2`, `localhost` + `adb reverse`, ou IP).  
- **Tabela vazia**: rode os INSERTs de exemplo.  
- **Build Android falha**: abra o Android Studio, atualize SDKs e aceite licenças (`sdkmanager --licenses`).

---
