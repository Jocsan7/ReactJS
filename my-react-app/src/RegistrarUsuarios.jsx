import {useState} from 'react';
import api from './Services/api';

function RegistrarUsusarios(){
    const [usuarios, setUsusarios] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handlechange = (e) => {
        setUsusarios({
            ...usuarios,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            const response = await api.post('/users', usuarios);
            setUsusarios(response.data);
            alert('Usuarios registrado exitosamente');
            console.log(usuarios);
            setUsusarios({
                name: '',
                email: '',
                password: ''
            })
        }catch(error){
            console.error('Error al registrar el usuario', error);
        }
    }


    return (
        <div>
            <h1>Registrar Usuarios</h1>
            <form onSubmit={handleSubmit}>

            </form>
        </div>
    )
}