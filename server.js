//pacotes  necessários
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const MongoClient = require("mongodb").MongoClient;

const uri = `mongodb+srv://Vini:estacionamento123@cluster0bd.gqsyx7y.mongodb.net/?appName=Cluster0bd`;

const client = new MongoClient(uri, { useNewUrlParser: true });
var dbo = client.db("Vini");
var usuarios = dbo.collection("Client");

var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(80, () => {
  console.log('server started');
});

app.get('/', (req, res) => {
  res.redirect("public/index.html");
});


async function conectarMongoDB() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB");
    dbo = client.db("Vini");
    usuarios = dbo.collection("Client");
  } catch (error) {
    console.error("Erro ao conectar MongoDB:", error);
  }
}

conectarMongoDB();

app.get("/cadastrar_usuario", async (req, res) => {
  
  const { nome, email, senha } = req.query;

  let data = {
            nome: nome,
            email: email, 
            senha: senha,
        };

      if (!nome || !email || !senha) {
        return res.render('resposta_usuario', { 
        resposta: "Todos os campos são obrigatórios!" 
    });
  }

      try {
        await usuarios.insertOne(data);

        return res.redirect('/login.html');

        // console.log("deu certo")
        
      } catch (err) {
        console.error("Erro ao cadastrar:", err);
        res.render('resposta_usuario', {resposta: "Erro ao cadastrar usuário!"});
      }
});


app.post("/logar_usuario", async (req, res) => {
  
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.render('resposta_usuario', {resposta: "Email e senha são obrigatórios!"});
  };

  try{
          
    const user = await usuarios.findOne({email: email});

    if(!user || user === null){
      console.log("Usuário não encontrado");
      res.render('resposta_usuario', {resposta: "Usuário não encontrado!"});
      return;
    };
    if(user.email === email ||user.senha === senha) {
      console.log("Login bem-sucedido");
      return res.redirect('/estacionamento.html');
    }else {
      console.log("Credenciais incorretas");
      return res.render('resposta_usuario', {resposta: "Credenciais incorretas!" });
    };
    }catch(err){
      console.log("Erro ao logar:", err);
      return res.render('resposta_usuario', {resposta: "Erro ao logar usuário!"});
    };
});



