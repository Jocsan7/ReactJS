import { useEffect, useState } from "react";
import api from "./api";
import "./RegistrarUsuarios.css"
function RegistrarUsuarios({usuarioEditado, limpiarSeleccion, onActualizacionExitosa, onRegistroExitoso}) { 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (usuarioEditado) {
      setUsername(usuarioEditado.username ?? "");
      setEmail(usuarioEditado.email ?? "");
      setPassword(usuarioEditado.password ?? "");
    } else {
      resetForm();
    }
  },[usuarioEditado]);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoUsuario = {username,email,password}
    try {
        if (usuarioEditado) {
            const respuesta = await api.put(`/users/${usuarioEditado.id}`, nuevoUsuario);
            if (onActualizacionExitosa) onActualizacionExitosa({ ...usuarioEditado, ...nuevoUsuario, ...respuesta.data });
            alert('Usuario actualizado exitosamente');
            limpiarSeleccion();
        }else{
            const respuesta = await api.post('/users', nuevoUsuario);
            console.log('Usuario registrado:', respuesta.data);
            if (onRegistroExitoso) onRegistroExitoso(respuesta.data);
            alert('Usuario registrado exitosamente');
        }
        resetForm();

  }catch (error) {
    console.error('Error al registrar usuario:', error);
    alert('Error al registrar usuario');
  }
};

  return (
    <div>  
        <h1 className="h1">{usuarioEditado ? "Editar Usuario" : "Registrar Usuarios"}</h1>
        <div className="divForm">
        <RegistroU />
        </div>
        
    </div>
  );

  function RegistroU() {
    return(
        <form className="formularioUsuarios" onSubmit={handleSubmit}>
            
            <label>Nombre de Usuario:</label>
            <input type="text" name="nombre" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label>Password:</label> 
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit" name="registrar">{usuarioEditado ? "Actualizar" : "Registrar"}</button>
        </form>
    )
}
}
export default RegistrarUsuarios;
