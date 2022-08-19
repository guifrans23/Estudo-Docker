import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, Text, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { styles } from "../../css/Styles";

export default function Main() {
  
  const [nome,setNome] =useState("");
  const [email,setEmail] =useState("");
  const [cpf,setCpf] =useState("");
  const [usuario,setUsuario] =useState("");
  const [senha,setSenha] =useState("");


  return (
    <ScrollView  horizontal={false} style={{flex: 1}} >
    <View>
      <TextInput placeholder="Nome" style={styles.caixa} value={nome} onChangeText={(value) =>setNome(value)}/>
      <TextInput placeholder="E-Mail" keyboardType="email-address" style={styles.caixa} value={email} onChangeText={(value) =>setEmail(value)}/>
      <TextInput placeholder="CPF" keyboardType="number-pad" style={styles.caixa} value={cpf} onChangeText={(value) =>setCpf(value)}/>
      <TextInput placeholder="Usuário" style={styles.caixa} value={usuario} onChangeText={(value) =>setUsuario(value)}/>
      <TextInput placeholder="Senha" secureTextEntry style={styles.caixa} value={senha} onChangeText={(value) =>setSenha(value)}/>

      <TouchableOpacity onPress={() => {
        efetuarCadastro(nome,email,cpf,usuario,senha)
      }} style={styles.btntccadastrar}>
        <Entypo name="save" size={24} color="black" />
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

function efetuarCadastro(nome:any,email:any,cpf:any,usuario:any,senha:any){
  if(nome == ""||
  email == ""||
  cpf == ""||
  usuario == ""||
  senha==""){
    return Alert.alert("Erro","voce deve prencher todos os campos")
  }

  fetch("http://10.26.49.38:8080/api/usuarios/cadastro",{
    method:"POST",
    headers:{
      accept: "application/json",
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      nomeusuario:usuario,
      email:email,
      cpf:cpf,
      nomeCompleto:nome,
      senha:senha

    })
  })
.then((response) => response.json())
.then((rs)=>console.log(rs))
.catch((erro) => console.error(`erro -> ${erro}`))
}
