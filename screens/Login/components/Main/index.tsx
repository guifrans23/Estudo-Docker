import { TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../css/Styles";
import { useState } from "react";

export default function Main(props) {
 
 const [usuario,setUsuario] =useState("")
 const [senha,setSenha] =useState("");
  return (
    <View>
      <TextInput
        placeholder="Usuário"
        keyboardType="default"
        style={styles.caixa}
      onChangeText={(value)=> setUsuario(value)}
      />
      <TextInput secureTextEntry placeholder="Senha" style={styles.caixa} onChangeText={(value)=> setSenha(value)}/>

      <TouchableOpacity onPress={() =>{
        
        efetuarLogin(usuario,senha);

      }} style={styles.btntllogin}>
        <Entypo name="login" size={24} color="black" />
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.acao.navigate("Cadastro")}style={styles.btntlcadastrar}>
        <Entypo name="add-user" size={24} color="black" />
        <Text>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

function efetuarLogin(usuario:any,senha:any) {
  if (usuario==""|| senha==""){
    return Alert.alert("erro","Voce deve prencher todos os campos")
  }
  fetch("http://10.26.49.38:8080/api/usuarios/cadastro",{
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },body: JSON.stringify({
      nomeusuario: usuario,
      senha: senha
    })
  })
  .then((response)=> response.json())
  .then((rs)=> console.log(rs))
  .catch((err)=>console.error(`erro -> ${err}`))
}